import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { ContextLET } from "../..";
import { Evaluation as EvaluationSchema } from "../../../Core/Schemas/Screen/Evaluation";
import { EvaluationStructure as EvaluationStructureSchema } from "../../../Core/Schemas/Screen/Evaluation/EvaluationStructure";
import { EvaluationButton as EvaluationButtonSchema } from "../../../Core/Schemas/Screen/Evaluation/EvaluationButton";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";
import {
  CALL_PA_DESCIPTIONS_STRUCTURE_STEP_6,
  CALL_PA_LIST_INFOR_STRUCTURE_STEP_6,
  CALL_PA_STEP_SIX,
} from "../../../Services/StoreProcedure";

@Resolver()
export class Evalutation {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => EvaluationSchema, {
    name: "Evalutation",
    description:
      "Query que entrega estructura de datos para pantalla de evaluación inspección",
  })
  async Evalutation(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);

    return {
      ...ResponseSP2D(await CALL_PA_STEP_SIX<EvaluationSchema>(ID_INSPECTION)),
      structure: ResponseSP(
        await CALL_PA_LIST_INFOR_STRUCTURE_STEP_6<EvaluationStructureSchema>(
          ID_INSPECTION
        )
      ),
      btn_evaluation: ResponseSP2D(
        await CALL_PA_DESCIPTIONS_STRUCTURE_STEP_6<EvaluationButtonSchema>(
          ID_INSPECTION
        )
      ),
    };
  }
}
