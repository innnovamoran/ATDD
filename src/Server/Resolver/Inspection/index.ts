import { Args, Query, Resolver, Mutation } from "type-graphql";

import { getInspectionArgs } from "../../../Core/Schemas/Inputs/getInspectionArgs";
import { startInspectionArgs } from "../../../Core/Schemas/Inputs/startInspectionArgs";
import { Inspection as InspectionSchema } from "../../../Core/Schemas/Inspection";

import { CreateDate } from "../../../Dependencies/useDate";

import { GenerateToken } from "../../../Services/Auth";

import ORM from "../../Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Inspection {
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
}
