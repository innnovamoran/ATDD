var acceptedMime = ["jpg", "jpeg", "pdf", "mov", "mp4"];
var limit_size = 30000000;

import { MiddlewareFn } from "type-graphql";
import { ContextLET } from "../..";
export const ValidatorFile: MiddlewareFn<ContextLET> = async (
  { context },
  next
) => {
  try {
    const file = context?.file;
    if (typeof file === "undefined" || typeof file.mimetype === "undefined") {
      throw new Error("Archivo de subida es requerido");
    }
    if (!acceptedMime.includes(file.mimetype.split("/")[1])) {
      throw new Error("Formato de archivo incorrecto");
    }
    if (file.size > limit_size) {
      throw new Error("Archivo de subida superta el límite de tamaño");
    }
    return next();
  } catch (error: string | any) {
    throw new Error(error);
  }
};
