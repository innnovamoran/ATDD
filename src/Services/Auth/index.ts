import jwt, { VerifyErrors } from "jsonwebtoken";

export type PayloadGenerateToken = {
  ID_INSPECTION: Number;
  TIME_INSPECTION: Number;
  START_DATE: Number;
  END_DATE: Number;
};

const factoryErrors = () => ({
  TokenExpiredError: () => {
    throw new Error("Tiempo de inspección finalizado");
  },
  JsonWebTokenError: () => {
    throw new Error("Token incorrecto");
  },
});

const validateError = (err: VerifyErrors | null) => {
  if (err) {
    const isError =
      factoryErrors()[err.name as "TokenExpiredError" | "JsonWebTokenError"];

    if (typeof isError === "undefined") {
      throw new Error("Token incorrecto");
    }
    isError();
  }
  return;
};

export const GenerateToken = async (
  payload: PayloadGenerateToken,
  expiresIn: number
) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn,
  });

export const VerifyToken = (
  token: string | undefined,
  callback: (payload: PayloadGenerateToken) => void
) => {
  if (typeof token === "undefined") {
    throw new Error("Token incorrecto");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    validateError(err);
    callback(decoded as PayloadGenerateToken);
  });
};
