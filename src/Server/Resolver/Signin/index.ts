import { Args, Query, Resolver } from "type-graphql";
import { SigninArgs } from "../../../Core/Schemas/SigninArgs";
import { Signin as SigninSchema } from "../../../Core/Schemas/Signin";
import ORM from "../../../Server/Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Signin {
  @Query((returns) => SigninSchema, { name: "Signin" })
  async Signin(
    @Args()
    {
      APPNAME,
      APPVERSION,
      INTERNET_PROVIDER,
      PATENTE,
      PHONE_BRAND,
      PHONE_MODEL,
      PHONE_SO,
      PLATAFORM,
      RUT,
      TOKEN_FIREBASE,
    }: SigninArgs
  ) {
    const response = await db_instance.connection.query(
      `EXEC PA_LOGIN_AI_V2 :RUT,:PATENTE,:PHONE_MODEL,:PHONE_BRAND,:PHONE_SO,:INTERNET_PROVIDER,:TOKEN_FIREBASE,:APPNAME,:APPVERSION,:PLATAFORM`,
      {
        replacements: {
          RUT,
          PATENTE,
          PHONE_MODEL,
          PHONE_BRAND,
          PHONE_SO,
          INTERNET_PROVIDER,
          TOKEN_FIREBASE,
          APPNAME,
          APPVERSION,
          PLATAFORM,
        },
      }
    );
    // pondiente de optimización para uso de matriz.
    return response[0][0];
  }
}
