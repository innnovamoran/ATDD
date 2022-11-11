import { Args, Query, Resolver, Mutation } from "type-graphql";

import { getInspectionArgs } from "../../../Core/Schemas/Inputs/getInspectionArgs";
import { startInspectionArgs } from "../../../Core/Schemas/Inputs/startInspectionArgs";
import { Inspection as InspectionSchema } from "../../../Core/Schemas/Inspection";

import ORM from "../../Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Inspection {
  @Query((returns) => InspectionSchema, {
    name: "GetInspectionByUser",
    description:
      "Query que nos entrega la información de la inspección a realizar mediante RUT y PATENTE",
  })
  async GetInspectionByUser(
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

  @Mutation((returns) => String, {
    name: "StartInspection",
    description: "Mutación que permite el inicio del tiempo de la inspección",
  })
  async StartInspection(
    @Args()
    { ID_INSPECTION, TIME_INSPECTION }: startInspectionArgs
  ) {
    return "Hola";
  }
}
