import jwt from "jsonwebtoken";

import { get, getForLogin, update } from "../../Core/Repositories/User";
import { comparePassword } from "../User/useUser";

export type PayloadGenerateToken = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  active: boolean;
  firebase_token: string;
  last_conection: Date;
  user_type: string;
};

export const GenerateToken = async (payload: PayloadGenerateToken) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: 60 * 60 * 8,
  });
export const checkUniqueEmail = async (
  email: string
): Promise<string | undefined> => {
  const user = await get({ email });
  if (user) return Promise.reject("Correo Actualmente en uso");
};
export const updateInfoUser = async (user: any, firebase_token: string) =>
  await update(user.id, {
    last_conection: new Date(Date.now()),
    firebase_token,
  });

export const VerifyToken = (token: string) => {
  return new Promise<string | PayloadGenerateToken>((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            rej("Token expirado");
          case "JsonWebTokenError":
            rej("Token erroneo");
          default:
            rej("Token erroneo");
        }
      } else {
        res(decoded as PayloadGenerateToken);
      }
    });
  });
};

export const validateCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await getForLogin({
    email: email,
  });
  if (!user || !comparePassword(password, user.password)) {
    throw new Error(
      "El email y la contraseña ingresada no coinciden, vuelva a intentarlo"
    );
  }
  return user;
};

export const validatePlatform = ({
  user_type,
  platform,
}: {
  user_type: string;
  platform: string;
}) => {
  if (
    !platform ||
    (platform != "MOBILE-CLIENT" && platform != "WEB-ADMIN") ||
    (user_type != "CLIENT" && platform === "MOBILE-CLIENT") ||
    (user_type != "ADMIN" && platform === "WEB-ADMIN")
  ) {
    throw new Error("No posee acceso para ingresar");
  }
};

export const cleanInfoForLogin = (user: any) => {
  delete user.password;
  return user;
};
