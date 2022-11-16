import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { Accesories as AccesoriesSchema } from "../../../Core/Schemas/Screen/Accesories";
import { AccesoriesStructure as AccesoriesStructureSchema } from "../../../Core/Schemas/Screen/Accesories/AccesoriesStructure";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

const db_instance = new ORM();

@Resolver()
export class Accesories {
  async CALL_PA_STEP_TWO<T>(ID_INSPECTION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query("EXEC PA_STEP_TWO :ID_INSPECTION", {
      replacements: { ID_INSPECTION },
    }) as any;
  }
  async PA_STRUCTURE_STEP_2<T>(
    ID_INSPECTION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_STRUCTURE_STEP_2 :ID_INSPECTION",
      {
        replacements: { ID_INSPECTION },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => AccesoriesSchema, { name: "Accesories" })
  async Accesories(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }

    return {
      ...ResponseSP2D(
        await this.CALL_PA_STEP_TWO<AccesoriesSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
      structure: ResponseSP(
        await this.PA_STRUCTURE_STEP_2<AccesoriesStructureSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
    };
  }
}
