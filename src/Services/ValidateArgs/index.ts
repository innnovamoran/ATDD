import { isNotEmpty, isEmail } from "class-validator";
import { accesoriesArgs } from "../../Core/Schemas/Inputs/accesoriesArgs";
import {
  DamageArgs,
  DocsArgs,
  PhotoArgs,
  VideoArgs,
} from "../../Core/Schemas/Inputs/PhotoArgs";
import { featureArgs } from "../../Core/Schemas/Inputs/setFeaturesArgs";

const messageRequire = "es requerido";
const messageTypeString = "debe ser tipo string";
const messageTypeNumber = "debe ser tipo numérico";
const messageTypeEmail = "debe tener formato correcto";
interface GenerticObject {
  [key: string]: string | number | boolean | undefined;
}
const isTypeString = (value: unknown): Boolean => typeof value === "string";
const isTypeNumber = (value: unknown): Boolean => typeof value === "number";
const isTypeBoolean = (value: unknown): Boolean => typeof value === "boolean";

const RejectQuery = (isValidate: Boolean, message: string) => {
  if (!isValidate) {
    throw new Error(message);
  }
  return;
};

const ValidateArgsTypeString = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    RejectQuery(isTypeString(Obj[key]), `${key} ${messageTypeString}`);
  });
};
const ValidateArgsTypeNumber = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    if (key !== "EMAIL") {
      RejectQuery(isTypeNumber(Obj[key]), `${key} ${messageTypeNumber}`);
    }
  });
};

const ValidateArgsRequired = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    RejectQuery(isNotEmpty(Obj[key]), `${key} ${messageRequire}`);
  });
};

const ValidateArgEMAIL = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    if (key === "EMAIL") {
      RejectQuery(isEmail(Obj[key]), `${key} ${messageTypeEmail}`);
    }
  });
};

const ValidateFildsForms = ({
  ID_CAMPO,
  VALUE,
}: accesoriesArgs | featureArgs) => {
  if (!isTypeNumber(ID_CAMPO)) {
    throw new Error("ID de accesorio debe ser numérico");
  }
  if (typeof VALUE == "boolean")
  {
    if (!isTypeBoolean(VALUE)) {
      throw new Error("Valor de selección debe ser boolean");
    }
  } else {
    if (!isTypeString(VALUE)) {
      throw new Error("Valor de selección debe ser string");
    }
  }
  
  return;
};

const ValidateUploadPhotoArgs = (args: unknown) => {
  const r = args as PhotoArgs;
  if (
    (!isNotEmpty(r.ID_STRUCTURE_STEP_3) &&
      !isTypeNumber(r.ID_STRUCTURE_STEP_3)) ||
    (!isNotEmpty(r.LATITUE) && !isTypeNumber(r.LATITUE)) ||
    (!isNotEmpty(r.LONGITUDE) && !isTypeNumber(r.LONGITUDE)) ||
    (!isNotEmpty(r.TYPE) && !isTypeString(r.TYPE))
  ) {
    throw new Error("Uno o más argumentos faltan en la solicitud");
  }
  return;
};
const ValidateUploadDocumentsArgs = (args: unknown) => {
  const r = args as DocsArgs;
  if (
    (!isNotEmpty(r.ID_STRUCTURE_STEP_3) &&
      !isTypeNumber(r.ID_STRUCTURE_STEP_3)) ||
    (!isNotEmpty(r.LATITUE) && !isTypeNumber(r.LATITUE)) ||
    (!isNotEmpty(r.LONGITUDE) && !isTypeNumber(r.LONGITUDE)) ||
    (!isNotEmpty(r.TYPE) && !isTypeString(r.TYPE))
  ) {
    throw new Error("Uno o más argumentos faltan en la solicitud");
  }
  return;
};
const ValidateUploadVideoArgs = (args: unknown) => {
  const r = args as VideoArgs;
  if (
    (!isNotEmpty(r.ID_STRUCTURE_STEP_3) &&
      !isTypeNumber(r.ID_STRUCTURE_STEP_3)) ||
    (!isNotEmpty(r.LONGITUDE) && !isTypeNumber(r.LONGITUDE)) ||
    (!isNotEmpty(r.MIME) && !isTypeString(r.MIME))
  ) {
    throw new Error("Uno o más argumentos faltan en la solicitud");
  }
  return;
};
const ValidateUploadAccesoriesArgs = (args: unknown) => {
  const r = args as PhotoArgs;
  if (
    (!isNotEmpty(r.ID_STRUCTURE_STEP_3) &&
      !isTypeNumber(r.ID_STRUCTURE_STEP_3)) ||
    (!isNotEmpty(r.LONGITUDE) && !isTypeNumber(r.LONGITUDE)) ||
    (!isNotEmpty(r.TYPE) && !isTypeString(r.TYPE)) ||
    (!isNotEmpty(r.DESCRIPTION) && !isTypeString(r.DESCRIPTION))
  ) {
    throw new Error("Uno o más argumentos faltan en la solicitud");
  }
  return;
};
const ValidateUploadDamageArgs = (args: unknown) => {
  const r = args as DamageArgs;
  if (
    (!isNotEmpty(r.ID_STRUCTURE_STEP_4) &&
      !isTypeNumber(r.ID_STRUCTURE_STEP_4)) ||
    (!isNotEmpty(r.LONGITUDE) && !isTypeNumber(r.LONGITUDE)) ||
    (!isNotEmpty(r.TYPE) && !isTypeString(r.TYPE)) ||
    (!isNotEmpty(r.ID_PIEZA) && !isTypeString(r.ID_PIEZA)) ||
    (!isNotEmpty(r.DESCRIPTION) && !isTypeString(r.DESCRIPTION))
  ) {
    throw new Error("Uno o más argumentos faltan en la solicitud");
  }
  return;
};

export const ValidateInspectionsArgs = (Args: unknown) => {
  ValidateArgsRequired(Args as GenerticObject);
  ValidateArgsTypeString(Args as GenerticObject);
};
/** Validado para argumentos de accesorios como caracteristicas */
export const ValidateFormsArgs = (Args: unknown) => {
  ValidateArgsRequired(Args as GenerticObject);
  ValidateFildsForms(Args as accesoriesArgs);
  return;
};
export const ValidateStartInspectionArgs = (Args: unknown) => {
  ValidateArgsRequired(Args as GenerticObject);
  ValidateArgsTypeNumber(Args as GenerticObject);
  ValidateArgEMAIL(Args as GenerticObject);
};
export const ValidateIDInspection = (ID_INSPECTION: unknown): Number => {
  if (typeof ID_INSPECTION === "undefined") {
    throw new Error("Token incorrecto");
  }
  return ID_INSPECTION as Number;
};
export const ValidateIDNumber = (ID: unknown): Number => {
  if (typeof ID === "undefined" || typeof ID !== "number") {
    throw new Error("ID debe ser de tipo numerico");
  }
  return ID as Number;
};
export const ValidateEmail = (EMAIL: unknown): String => {
  if(typeof EMAIL === "undefined" || typeof EMAIL !== "string" || !isEmail(EMAIL)) {
    throw new Error("EMAIL incorrecto");
  }
  return EMAIL as String;
};

export const ValidatorUploadFiles = (
  args: accesoriesArgs | PhotoArgs | VideoArgs | DamageArgs | DocsArgs,
  SECTION: string
) => {
  if (SECTION === "video") {
    ValidateUploadVideoArgs(args);
  }
  if (SECTION === "photo") {
    ValidateUploadPhotoArgs(args);
  }
  if (SECTION === "documents") {
    ValidateUploadDocumentsArgs(args);
  }
  if (SECTION === "damage") {
    ValidateUploadDamageArgs(args);
  }
  if (SECTION === "accesories") {
    ValidateUploadAccesoriesArgs(args);
  }

  return;
};

export const ValidatorSectionFactory = (SECTION: string) => {
  if (typeof SECTION === "undefined") {
    throw new Error("Sección no pertene a fabrica de cargas de S3");
  }
  if (
    SECTION === "video" ||
    SECTION === "photo" ||
    SECTION === "damage" ||
    SECTION === "accesories" ||
    SECTION === "documents"
  ) {
    return;
  }
  throw new Error("Sección no pertene a fabrica de cargas de S3");
};
