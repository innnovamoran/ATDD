import { Args, Query, Resolver, Mutation } from "type-graphql";

import { getInspectionArgs } from "../../../Core/Schemas/Inputs/getInspectionArgs";
import { startInspectionArgs } from "../../../Core/Schemas/Inputs/startInspectionArgs";
import { Inspection as InspectionSchema } from "../../../Core/Schemas/Screen/Inspection";
import { Login as LoginSchema } from "../../../Core/Schemas/Screen/Login";
import { Theme as ThemeSchema } from "../../../Core/Schemas/Theme";

import { CreateDate } from "../../../Dependencies/useDate";

import { GenerateToken } from "../../../Services/Auth";
import {
  CALL_PA_LOGIN_AI_V2,
  CALL_PA_TEXT_LOGIN_APP_AI,
  CALL_PA_THEME,
} from "../../../Services/StoreProcedure";
import {
  ValidateInspectionsArgs,
  ValidateStartInspectionArgs,
} from "../../../Services/ValidateArgs";
import { ResponseSP2D } from "../../../Services/ValidateSP";

@Resolver()
export class Inspection {
  @Query((returns) => InspectionSchema, {
    name: "Inspection",
    description:
      "Query que nos entrega la información de la inspección a realizar mediante RUT y PATENTE",
  })
  async Inspection(
    @Args()
    args: getInspectionArgs
  ) {
    ValidateInspectionsArgs(args);
    const inspection = ResponseSP2D<InspectionSchema>(
      await CALL_PA_LOGIN_AI_V2(args)
    );
    return {
      ...inspection,
      theme: ResponseSP2D<ThemeSchema>(
        await CALL_PA_THEME({ ID_INSPECCION: inspection.id })
      ),
    };
  }

  @Mutation((returns) => String, {
    name: "StartInspection",
    description: "Mutación que entrega JWT asociado a la inspección en curso",
  })
  async StartInspection(
    @Args()
    { ID_INSPECTION, TIME_INSPECTION, EMAIL }: startInspectionArgs
  ) {
    ValidateStartInspectionArgs({ ID_INSPECTION, TIME_INSPECTION, EMAIL });
    const START_DATE = CreateDate(new Date(Date.now()));
    const END_DATE = CreateDate(
      new Date(Date.now()).getTime() + Number(TIME_INSPECTION)
    );
    return await GenerateToken(
      {
        ID_INSPECTION,
        TIME_INSPECTION,
        EMAIL,
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
      await CALL_PA_TEXT_LOGIN_APP_AI<LoginSchema>()
    );
  }
}
