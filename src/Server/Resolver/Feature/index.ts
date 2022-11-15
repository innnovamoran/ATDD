import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { ContextLET } from "../..";
import { Feature as FeatureSchema } from "../../../Core/Schemas/Screen/Feature";
import { FeatureStructure as FeatureStructureSchema } from "../../../Core/Schemas/Screen/Feature/FeatureStructure";
import { FeatureOptions as FeatureOptionsSchema } from "../../../Core/Schemas/Screen/Feature/FeatureOptions";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";

import ORM from "../../Config/DataSource";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
const db_instance = new ORM();

@Resolver()
export class Feature {
  CALL_PA_STEP_ONE<T>(ID_INSPECCION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query(`EXEC PA_STEP_ONE :ID_INSPECCION`, {
      replacements: {
        ID_INSPECCION,
      },
    }) as any;
  }

  CALL_PA_STRUCTURE_STEP_1<T>(ID_INSPECCION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      `EXEC PA_STRUCTURE_STEP_1 :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      }
    ) as any;
  }

  CAL_PA_OPTIONS_STRUCTURE_STEP_1<T>(
    ID_STRUCTURE_STEP_1: Number,
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      `EXEC PA_OPTIONS_STRUCTURE_STEP_1 :ID_STRUCTURE_STEP_1, :ID_INSPECCION`,
      {
        replacements: {
          ID_STRUCTURE_STEP_1,
          ID_INSPECCION,
        },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => FeatureSchema, {
    name: "Feature",
    description: "Query que obtiene valores de pantalla características",
  })
  async Feature(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }
    return {
      ...ResponseSP2D<FeatureSchema>(
        await this.CALL_PA_STEP_ONE<FeatureSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
      structure: ResponseSP<FeatureStructureSchema>(
        await this.CALL_PA_STRUCTURE_STEP_1<FeatureStructureSchema>(
          ctx.inspection.ID_INSPECTION
        )
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [FeatureOptionsSchema], {
    name: "FeatureOptions",
    description: "Query que obtiene valores de opciones características",
  })
  async FeatureOptions(
    @Arg("ID_STRUCTURE_STEP_1") ID_STRUCTURE_STEP_1: number,
    @Ctx() ctx: ContextLET
  ) {
    if (
      typeof ctx.inspection?.ID_INSPECTION === "undefined" ||
      !ID_STRUCTURE_STEP_1
    ) {
      throw new Error("Token incorrecto");
    }
    return ResponseSP<FeatureOptionsSchema>(
      await this.CAL_PA_OPTIONS_STRUCTURE_STEP_1<FeatureOptionsSchema>(
        ID_STRUCTURE_STEP_1,
        ctx.inspection.ID_INSPECTION
      )
    );
  }
}
