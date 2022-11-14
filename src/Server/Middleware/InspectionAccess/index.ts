import { MiddlewareFn } from "type-graphql";
import { ContextLET } from "../..";
import { VerifyToken } from "../../../Services/Auth";

export const InspectionAccess: MiddlewareFn<ContextLET> = async (
  { context },
  next
) => {
  try {
    VerifyToken(
      context.headers.authorization?.replace("Bearer", "").trim(),
      (payload) => {
        context.inspection = payload;
      }
    );
    return next();
  } catch (error: string | any) {
    throw new Error(error);
  }
};
