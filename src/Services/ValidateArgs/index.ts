import { isNotEmpty, isEmail } from "class-validator";
import { accesoriesArgs } from "../../Core/Schemas/Inputs/accesoriesArgs";
import { featureArgs } from "../../Core/Schemas/Inputs/setFeaturesArgs";

const messageRequire = "es requerido";
const messageTypeString = "debe ser tipo string";
const messageTypeNumber = "debe ser tipo numérico";
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
    RejectQuery(isTypeNumber(Obj[key]), `${key} ${messageTypeNumber}`);
  });
};

const ValidateArgsRequired = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    RejectQuery(isNotEmpty(Obj[key]), `${key} ${messageRequire}`);
  });
};

const ValidateFildsForms = ({
  ID_CAMPO,
  VALUE,
}: accesoriesArgs | featureArgs) => {
  if (!isTypeNumber(ID_CAMPO)) {
    throw new Error("ID de accesorio debe ser numérico");
  }
  if (!isTypeBoolean(VALUE)) {
    throw new Error("Valor de selección debe ser boolean");
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