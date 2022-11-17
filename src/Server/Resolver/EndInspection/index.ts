import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { EndInspection as EndInspectionSchema } from "../../../Core/Schemas/Screen/EndInspection";
import { TermsAndConditions as TermsAndConditionsSchema } from "../../../Core/Schemas/Screen/EndInspection/TermsAndContitions";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";
import {
  CALL_PA_CONDITIONS_STEP_5,
  CALL_PA_STEP_FIVE,
  CALL_PA_STRUCTURE_STEP_5,
} from "../../../Services/StoreProcedure";

@Resolver()
export class EndInspection {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => EndInspectionSchema, { name: "EndInspection" })
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
  @Query((returns) => [TermsAndConditionsSchema], {
    name: "TermsAndConditions",
  })
  async TermsAndConditions(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP(
      await CALL_PA_CONDITIONS_STEP_5<TermsAndConditionsSchema>(ID_INSPECTION)
    );
  }
}
