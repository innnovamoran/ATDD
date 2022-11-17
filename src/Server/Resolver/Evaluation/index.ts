import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { ContextLET } from "../..";
import { Evaluation as EvaluationSchema } from "../../../Core/Schemas/Screen/Evaluation";
import { EvaluationStructure as EvaluationStructureSchema } from "../../../Core/Schemas/Screen/Evaluation/EvaluationStructure";
import { EvaluationButton as EvaluationButtonSchema } from "../../../Core/Schemas/Screen/Evaluation/EvaluationButton";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";

const db_instance = new ORM();

@Resolver()
export class Evalutation {
  async CALL_PA_STEP_SIX<T>(ID_INSPECCION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query("EXEC PA_STEP_SIX :ID_INSPECCION", {
      replacements: { ID_INSPECCION },
    }) as any;
  }
  async CALL_PA_LIST_INFOR_STRUCTURE_STEP_6<T>(
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_LIST_INFOR_STRUCTURE_STEP_6 :ID_INSPECCION",
      {
        replacements: { ID_INSPECCION },
      }
    ) as any;
  }
  async CALL_PA_DESCIPTIONS_STRUCTURE_STEP_6<T>(
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_DESCIPTIONS_STRUCTURE_STEP_6 :ID_INSPECCION",
      {
        replacements: { ID_INSPECCION },
      }
    ) as any;
  }
  @UseMiddleware(InspectionAccess)
  @Query((returns) => EvaluationSchema, { name: "Evalutation" })
  async Evalutation(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);

    return {
      ...ResponseSP2D(
        await this.CALL_PA_STEP_SIX<EvaluationSchema>(ID_INSPECTION)
      ),
      structure: ResponseSP(
        await this.CALL_PA_LIST_INFOR_STRUCTURE_STEP_6<EvaluationStructureSchema>(
          ID_INSPECTION
        )
      ),
      btn_evaluation: ResponseSP2D(
        await this.CALL_PA_DESCIPTIONS_STRUCTURE_STEP_6<EvaluationButtonSchema>(
          ID_INSPECTION
        )
      ),
    };
  }
}
