import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { EndInspection as EndInspectionSchema } from "../../../Core/Schemas/Screen/EndInspection";
import { TermsAndConditions as TermsAndConditionsSchema } from "../../../Core/Schemas/Screen/EndInspection/TermsAndContitions";
const db_instance = new ORM();

@Resolver()
export class EndInspection {
  async CALL_PA_STEP_FIVE<T>(ID_INSPECCION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query("EXEC PA_STEP_FIVE :ID_INSPECCION", {
      replacements: { ID_INSPECCION },
    }) as any;
  }

  async CALL_PA_CONDITIONS_STEP_5<T>(
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_CONDITIONS_STEP_5 :ID_INSPECCION",
      {
        replacements: { ID_INSPECCION },
      }
    ) as any;
  }
  async CALL_PA_STRUCTURE_STEP_5<T>(
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_STRUCTURE_STEP_5 :ID_INSPECCION",
      {
        replacements: { ID_INSPECCION },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => EndInspectionSchema, { name: "EndInspection" })
  async EndInspection(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }

    return {
      ...ResponseSP2D(
        await this.CALL_PA_STEP_FIVE<EndInspectionSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
      structure: ResponseSP(
        await this.CALL_PA_STRUCTURE_STEP_5<EndInspectionSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [TermsAndConditionsSchema], {
    name: "TermsAndConditions",
  })
  async TermsAndConditions(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }
    return ResponseSP(
      await this.CALL_PA_CONDITIONS_STEP_5<TermsAndConditionsSchema>(
        ctx.inspection?.ID_INSPECTION
      )
    );
  }
}
