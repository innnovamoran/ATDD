import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { Damage } from "../../../Core/Schemas/Screen/Damage";
import { DamageElementsSchema } from "../../../Core/Schemas/Screen/Damage/DamageElements";

const db_instance = new ORM();

@Resolver()
export class Damages {
  async CALL_PA_STEP_FOUR<T>(ID_INSPECTION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query("EXEC PA_STEP_FOUR :ID_INSPECTION", {
      replacements: { ID_INSPECTION },
    }) as any;
  }

  async CALL_PA_STRUCTURE_STEP_4<T>(
    ID_INSPECTION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_STRUCTURE_STEP_4 :ID_INSPECTION",
      {
        replacements: { ID_INSPECTION },
      }
    ) as any;
  }

  async CALL_PA_ELEMENTS_STRUCTURE_STEP_4<T>(
    ID_INSPECCION: Number,
    ID_STRUCTURE_STEP_4: Number,
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_ELEMENTS_STRUCTURE_STEP_4  :ID_INSPECCION, :ID_STRUCTURE_STEP_4",
      {
        replacements: { 
          ID_INSPECCION, 
          ID_STRUCTURE_STEP_4 
        },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => Damage, { name: "Damages", description: "Query que obtiene estructura de datos y diferentes propiedades para armar pantalla", })
  async Damages(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }
    return {
      ...ResponseSP2D(await this.CALL_PA_STEP_FOUR<Damage>(ctx.inspection?.ID_INSPECTION)),
      structure: ResponseSP(await this.CALL_PA_STRUCTURE_STEP_4(ctx.inspection?.ID_INSPECTION))
    };
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [DamageElementsSchema], { // [DamageElementsSchema]
    name: "DamageElements",
    description: "Query que obtiene valores de opciones características",
  })
  async DamageElements(
    @Arg("ID_STRUCTURE_STEP_4") ID_STRUCTURE_STEP_4: number,
    @Ctx() ctx: ContextLET
  ) {
    if (
      typeof ctx.inspection?.ID_INSPECTION === "undefined" ||
      !ID_STRUCTURE_STEP_4
    ) {
      throw new Error("Token incorrecto");
    }
    return ResponseSP<DamageElementsSchema>(
      await this.CALL_PA_ELEMENTS_STRUCTURE_STEP_4<DamageElementsSchema>(
        ctx.inspection.ID_INSPECTION,
        ID_STRUCTURE_STEP_4,
      )
    );
  }
}
