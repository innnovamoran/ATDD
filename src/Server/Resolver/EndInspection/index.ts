import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { EndInspection as EndInspectionSchema } from "../../../Core/Schemas/Screen/EndInspection";
import { TermsAndConditions as TermsAndConditionsSchema } from "../../../Core/Schemas/Screen/EndInspection/TermsAndContitions";
import { ValidateEmail, ValidateIDInspection } from "../../../Services/ValidateArgs";
import {
  CALL_PA_CONDITIONS_STEP_5,
  CALL_PA_FINISH_INSPECTION_APP_AI,
  CALL_PA_STEP_FIVE,
  CALL_PA_STRUCTURE_STEP_5,
} from "../../../Services/StoreProcedure";

@Resolver()
export class EndInspection {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => EndInspectionSchema, {
    name: "EndInspection",
    description:
      "Query que entrega estructura de datos para pantalla de finalizar inspección",
  })
  async EndInspection(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D(
        await CALL_PA_STEP_FIVE<EndInspectionSchema>(ID_INSPECTION)
      ),
      structure: ResponseSP(
        await CALL_PA_STRUCTURE_STEP_5<EndInspectionSchema>(ID_INSPECTION)
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Mutation((returns) => String, {
    name: "FinishInspection",
    description: "Mutación que finaliza la autoinspección",
  })
  async FinishInspection(
    @Arg("EMAIL") EMAIL: String,
    @Ctx() ctx: ContextLET
    ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const EMAIL_VALIDATED = ValidateEmail(EMAIL);
    const response = ResponseSP2D(await CALL_PA_FINISH_INSPECTION_APP_AI<{ MSJ: string }>(ID_INSPECTION, EMAIL_VALIDATED));
    if (response.MSJ === "Ok") {
      return "Inspección finalizada con éxito";
    } else {
      throw new Error("Error al finalizar inspección");
    }
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [TermsAndConditionsSchema], {
    name: "TermsAndConditions",
    description: "Query que entrega el listado de términos y condiciones de AI",
  })
  async TermsAndConditions(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP(
      await CALL_PA_CONDITIONS_STEP_5<TermsAndConditionsSchema>(ID_INSPECTION)
    );
  }
}
