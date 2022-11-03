import ORM from "../../Server/Config/DataSource";
const db_instance = new ORM();

import { generateRandomCode, hashPassword } from "./useUser";

import {
  active,
  create,
  deleteUser,
  get,
  getAll,
  getAllAdmins,
  getAllClients,
  getAllWithLike,
  getForLogin,
  setCodeRecoveryPassword,
  update,
} from "../../Core/Repositories/User";

import { generateLink } from "../../Dependencies/DynamicLinks";
import { sendMail, createTemplate } from "../../Dependencies/Sendgrid";
import { generateExcel } from "../../Dependencies/ExcelGenerator";

const {
  recoveryPassword: TemplateMailRecoveryPass,
  welcomeMail,
  welcomeMailWithDL,
} = require("../../Dependencies/Sendgrid/MailTemplates");

const { EventEmitter } = require("events");

const userByID = async (id: number) => await get({ id });

const userByIDAdmin = async (id: number) =>
  await get({ id, user_type: "ADMIN" });

const userByIDClient = async (id: number) =>
  await get({ id, user_type: "CLIENT" });
const existUser = async (id: number) => {
  const user = await userByID(id);
  if (!user) {
    throw new Error("usuario no registrado");
  }
  return;
};

const headersXLSX = () => ({
  id: "ID",
  first_name: "NOMBRE",
  last_name: "APELLIDO",
  email: "EMAIL",
  phone: "TELEFONO",
  active: "ACTIVO",
  firebase_token: "TOKEN FIREBASE",
  last_conection: "ULTIMA CONEXIÓN",
  user_type: "TIPO DE USUARIO",
});

const handleGetSearch = (search: string) =>
  typeof search == "string" ? search.replace(/\s/g, "") : search != null;

const validateSearchParam = (search_param: string) =>
  search_param &&
  search_param != null &&
  search_param != "" &&
  search_param.length > 0;

export const getUsersAdmin = async (id: number) =>
  id ? await userByIDAdmin(id) : await getAllAdmins();

export const getUsersClient = async (id: number) =>
  id ? await userByIDClient(id) : await getAllClients();

export const createUser = async (payload: any, platform: string) => {
  const create_event = new EventEmitter();

  const transaction_response_error = () => {
    throw new Error("No se ha podido realizar la transacción");
  };

  return new Promise(async (res, rej) => {
    const transaction = await db_instance.connection.transaction();

    create_event.on("sendMail", async (cleanUser: Object) => {
      /** descomentar cuando se integren los archivos de configuración */
      /*  const { shortLink } = await generateLink(
        `?new_register_user=${cleanUser.email}`
      ); */
      /* await sendMail(
        createTemplate({
          from: "noreply@gekkozone.cl",
          subject: "Bienvenido a Gekko!!! Ya eres parte de nuestra comunidad",
          to: cleanUser.email,
          html:
            platform === "MOBILE-CLIENT"
              ? welcomeMailWithDL({
                  user_name: `${cleanUser.first_name} ${cleanUser.last_name}`,
                  dynamic_link: shortLink,
                })
              : welcomeMail({
                  user_name: `${cleanUser.first_name} ${cleanUser.last_name}`,
                }),
        })
      ); */
      res(cleanUser);
    });

    create_event.on("RegisterUser", async () => {
      try {
        const user: any = await create({
          ...payload,
          password: await hashPassword(payload.password),
        });
        if (!user) {
          transaction_response_error();
        }
        const cleanUser = user.dataValues;
        delete cleanUser.password;
        create_event.emit("sendMail", cleanUser);
      } catch (error) {
        await transaction.rollback();
        rej(error);
      }
    });
    create_event.emit("RegisterUser");
  });
};

export const updateUser = async (id: number, payload: any) => {
  await existUser(id);
  let data_update = payload;
  if (Object.keys(data_update).find((key) => key === "password")) {
    data_update.password = await hashPassword(data_update.password);
  }
  return await update(id, data_update);
};

export const deleteUsers = async (id: number) => {
  await existUser(id);
  return await deleteUser(id);
};

export const activeUser = async (id: number) => {
  await existUser(id);
  return await active(id);
};

export const recursiveGenerateCode = (email: string) => {
  recoveryPassword(email);
};
export const recoveryPassword = async (email: string) => {
  const user = await get({ email });
  if (!user || !user.active) {
    throw new Error("Usuario no encontrado");
  }

  const code_recovery_password = generateRandomCode();
  const isCodeInUser = await get({ code_recovery_password });
  if (isCodeInUser) {
    recursiveGenerateCode(email);
  }
  await setCodeRecoveryPassword({
    id: user.id,
    code_recovery_password,
  });
  const { shortLink } = await generateLink(
    `?code_recovery_password=${code_recovery_password}`
  );

  /*  await sendMail(
    createTemplate({
      to: email,
      from: "noreply@gekkozone.cl",
      subject: "Recuperar Contraseña",
      html: TemplateMailRecoveryPass({
        code: code_recovery_password,
        dynamicLink: shortLink,
        user_name: user.first_name + " " + user.last_name,
      }),
    })
  ); */
  return "Hemos enviado un código a tu correo electrónico para que puedas continuar con el proceso.";
};

export const setNewPassword = async ({
  code,
  password,
}: {
  code: string;
  password: string;
}) => {
  const found = await get({ code_recovery_password: code });
  if (!found) {
    throw new Error("no existe usuario asociado al código de verificación");
  }
  return await update(found.id, {
    password: await hashPassword(password),
    code_recovery_password: null,
  });
};

export const generateExcels = async (search: any) => {
  try {
    //TRANSFORMAR SEARCH
    const file_name = "registro_usuarios_" + Date.now().toString();
    let search_final = null;
    const search_param: any = handleGetSearch(search);
    if (validateSearchParam(search_param)) {
      search_final = typeof search != "string" ? search.toString() : search;
    }
    const data =
      search_final != null
        ? await getAllWithLike(search_final) // INYECTAR BUSQUEDA CON LIKE
        : await getAll();

    return await generateExcel({ data, file_name, headers: headersXLSX() });
  } catch (error: any) {
    throw new Error(error.error.message);
  }
};
