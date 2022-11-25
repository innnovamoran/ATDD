import { isEmpty } from "class-validator";
import console from "console";
import {
  Args,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { ContextLET } from "../..";

import { getInspectionArgs } from "../../../Core/Schemas/Inputs/getInspectionArgs";
import { startInspectionArgs } from "../../../Core/Schemas/Inputs/startInspectionArgs";
import { Inspection as InspectionSchema } from "../../../Core/Schemas/Screen/Inspection";
import { Login as LoginSchema } from "../../../Core/Schemas/Screen/Login";
import { Theme as ThemeSchema } from "../../../Core/Schemas/Theme";

import { CreateDate } from "../../../Dependencies/useDate";

import { GenerateToken } from "../../../Services/Auth";
import {
  CALL_PA_LOGIN_AI_V2,
  CALL_PA_STEP_FOUR,
  CALL_PA_STEP_ONE,
  CALL_PA_STEP_THREE,
  CALL_PA_STEP_TWO,
  CALL_PA_TEXT_LOGIN_APP_AI,
  CALL_PA_THEME,
} from "../../../Services/StoreProcedure";
import {
  ValidateInspectionsArgs,
  ValidateStartInspectionArgs,
} from "../../../Services/ValidateArgs";
import { ResponseSP2D } from "../../../Services/ValidateSP";
import { ValidatorAppConfig } from "../../Middleware/ValidatorAppConfig";

import { Feature as FeatureSchema } from "../../../Core/Schemas/Screen/Feature";
import { Accesories as AccesoriesSchema } from "../../../Core/Schemas/Screen/Accesories";
import { Photos as PhotosSchema } from "../../../Core/Schemas/Screen/Photos";
import { Damage as DamageSchema } from "../../../Core/Schemas/Screen/Damage";
import { Resume as ResumeSchema } from "../../../Core/Schemas/Screen/Resume";

@Resolver()
export class Inspection {
  @UseMiddleware(ValidatorAppConfig)
  @Query((returns) => InspectionSchema, {
    name: "Inspection",
    description:
      "Query que nos entrega la información de la inspección a realizar mediante RUT y PATENTE",
  })
  async Inspection(
    @Args()
    args: getInspectionArgs,
    @Ctx()
    ctx: ContextLET
  ) {
    ValidateInspectionsArgs(args);

    const appC = {
      appname: ctx.appname,
      appversion: ctx.appversion,
      plataform: ctx.plataform,
    };

    const inspection = ResponseSP2D<InspectionSchema>(
      await CALL_PA_LOGIN_AI_V2(args, appC)
    );
    const response = await Promise.all([
      CALL_PA_STEP_ONE<FeatureSchema>(inspection.id),
      CALL_PA_STEP_TWO<AccesoriesSchema>(inspection.id),
      CALL_PA_STEP_THREE<PhotosSchema>(inspection.id),
      CALL_PA_STEP_FOUR<DamageSchema>(inspection.id),
    ]);

    const ResumenSchema: ResumeSchema[] = response
      .concat()
      .map((d) =>
        ResponseSP2D<
          FeatureSchema | AccesoriesSchema | PhotosSchema | DamageSchema
        >(d)
      )
      .map((d, i) => ({ title: d.title, id: i + 1 }));

    if (typeof inspection.to_fix === "string") {
      inspection.to_fix = [];
    }
    if (inspection.id === 0) {
      throw new Error(inspection.MSJ as string);
    }
    return {
      ...inspection,
      theme: ResponseSP2D<ThemeSchema>(
        await CALL_PA_THEME(inspection.id, appC)
      ),
      resume: ResumenSchema,
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

  @UseMiddleware(ValidatorAppConfig)
  @Query((returns) => LoginSchema, {
    name: "Login",
    description:
      "Query que obtiene la estructura para la pantalla de inicio sesión",
  })
  async Login(@Ctx() ctx: ContextLET) {
    return ResponseSP2D<LoginSchema>(
      await CALL_PA_TEXT_LOGIN_APP_AI<LoginSchema>({
        appname: ctx.appname,
        appversion: ctx.appversion,
        plataform: ctx.plataform,
      })
    );
  }
}
