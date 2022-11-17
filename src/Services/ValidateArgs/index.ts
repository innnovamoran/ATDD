import { isNotEmpty } from "class-validator";

const messageRequire = "es requerido";
const messageTypeString = "debe ser tipo string";
interface GenerticObject {
  [key: string]: string | number | boolean | undefined;
}
const isTypeString = (value: unknown): Boolean => typeof value === "string";

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

const ValidateArgsRequired = (Obj: GenerticObject) => {
  Object.keys(Obj).forEach((key) => {
    RejectQuery(isNotEmpty(Obj[key]), `${key} ${messageRequire}`);
  });
};

export const ValidateInspectionsArgs = (Args: unknown) => {
  ValidateArgsRequired(Args as GenerticObject);
  ValidateArgsTypeString(Args as GenerticObject);
};

export const ValidateIDInspection = (ID_INSPECTION: unknown): Number => {
  if (typeof ID_INSPECTION === "undefined") {
    throw new Error("Token incorrecto");
  }
  return ID_INSPECTION as Number;
};
