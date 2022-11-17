import {
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { Accesories as AccesoriesSchema } from "../../../Core/Schemas/Screen/Accesories";
import { AccesoriesStructure as AccesoriesStructureSchema } from "../../../Core/Schemas/Screen/Accesories/AccesoriesStructure";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { accesoriesArgs } from "../../../Core/Schemas/Inputs/accesoriesArgs";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";

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

  async PA_ACTUALIZA_ACCESORIOS_APP<T>(
    { ID_CAMPO, VALUE }: accesoriesArgs,
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_ACTUALIZA_ACCESORIOS_APP :ID_INSPECCION, :ID_CAMPO, :VALUE",
      {
        replacements: { ID_INSPECCION, ID_CAMPO, VALUE },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => AccesoriesSchema, { name: "Accesories" })
  async Accesories(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D(
        await this.CALL_PA_STEP_TWO<AccesoriesSchema>(ID_INSPECTION)
      ),
      structure: ResponseSP(
        await this.PA_STRUCTURE_STEP_2<AccesoriesStructureSchema>(ID_INSPECTION)
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Mutation((returns) => String, {
    name: "UpdateAccesories",
    description:
      "Mutación que permite actualizar los accesorios de la inspección",
  })
  async UpdateAccesories(
    @Args() { ID_CAMPO, VALUE }: accesoriesArgs,
    @Ctx() ctx: ContextLET
  ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const response = ResponseSP2D(
      await this.PA_ACTUALIZA_ACCESORIOS_APP<{ MSJ: string }>(
        {
          ID_CAMPO,
          VALUE,
        },
        ID_INSPECTION
      )
    );
    if (response.MSJ === "Ok") {
      return "Actualización realizada con éxito";
    } else {
      throw new Error("Error al actualizar accesorios");
    }
  }
}
