import { isNotEmpty } from "class-validator";
import { MiddlewareFn } from "type-graphql";
import { ContextLET } from "../..";

export const ValidatorAppConfig: MiddlewareFn<ContextLET> = async (
  { context },
  next
) => {
  try {
    if (
      !isNotEmpty(context.headers.appname) ||
      !isNotEmpty(context.headers.appversion) ||
      !isNotEmpty(context.headers.plataform)
    ) {
      throw new Error("Cliente no autorizado");
    }
    context.appname = context.headers.appname as String;
    context.appversion = context.headers.appversion as String;
    context.plataform = context.headers.plataform as String;
    return next();
  } catch (error: string | any) {
    throw new Error(error);
  }
};
