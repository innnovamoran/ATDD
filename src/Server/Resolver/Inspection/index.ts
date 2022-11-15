import { Args, Query, Resolver, Mutation } from "type-graphql";

import { getInspectionArgs } from "../../../Core/Schemas/Inputs/getInspectionArgs";
import { startInspectionArgs } from "../../../Core/Schemas/Inputs/startInspectionArgs";
import { Inspection as InspectionSchema } from "../../../Core/Schemas/Screen/Inspection";
import { Login as LoginSchema } from "../../../Core/Schemas/Screen/Login";
import { Theme as ThemeSchema } from "../../../Core/Schemas/Theme";

import { CreateDate } from "../../../Dependencies/useDate";

import { GenerateToken } from "../../../Services/Auth";
import { ResponseSP2D } from "../../../Services/ValidateSP";

import ORM from "../../Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Inspection {
  CALL_PA_LOGIN_AI_V2<T>({
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
  }: getInspectionArgs): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
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
    ) as any; // any aun por no tipar de forma correcta la respuesta de query
  }
  CALL_PA_THEME<T>({
    ID_INSPECCION,
  }: {
    ID_INSPECCION: Number;
  }): Promise<Array<Array<T>>> {
    return db_instance.connection.query("EXEC PA_THEME_APP_AI :ID_INSPECCION", {
      replacements: {
        ID_INSPECCION,
      },
    }) as any;
  }
  CALL_PA_TEXT_LOGIN_APP_AI<T>(): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_TEXT_LOGIN_APP_AI") as any;
  }

  @Query((returns) => InspectionSchema, {
    name: "Inspection",
    description:
      "Query que nos entrega la información de la inspección a realizar mediante RUT y PATENTE",
  })
  async Inspection(
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
    }: getInspectionArgs
  ) {
    const inspection = ResponseSP2D<InspectionSchema>(
      await this.CALL_PA_LOGIN_AI_V2({
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
      })
    );
    const theme = ResponseSP2D<ThemeSchema>(
      await this.CALL_PA_THEME({ ID_INSPECCION: inspection.id })
    );
    return { ...inspection, theme };
  }

  @Mutation((returns) => String, {
    name: "StartInspection",
    description: "Mutación que entrega JWT asociado a la inspección en curso",
  })
  async StartInspection(
    @Args()
    { ID_INSPECTION, TIME_INSPECTION }: startInspectionArgs
  ) {
    const START_DATE = CreateDate(new Date(Date.now()));

    const END_DATE = CreateDate(
      new Date(Date.now()).getTime() + Number(TIME_INSPECTION)
    );

    return await GenerateToken(
      {
        ID_INSPECTION,
        TIME_INSPECTION,
        START_DATE: START_DATE.getTime(),
        END_DATE: END_DATE.getTime(),
      },
      Number(TIME_INSPECTION) / 1000
    );
  }

  @Query((returns) => LoginSchema, {
    name: "Login",
    description:
      "Query que obtiene la estructura para la pantalla de inicio sesión",
  })
  async Login() {
    return ResponseSP2D<LoginSchema>(
      await this.CALL_PA_TEXT_LOGIN_APP_AI<LoginSchema>()
    );
  }
}
