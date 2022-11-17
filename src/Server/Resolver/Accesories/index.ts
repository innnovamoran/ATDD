import {
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { Accesories as AccesoriesSchema } from "../../../Core/Schemas/Screen/Accesories";
import { AccesoriesStructure as AccesoriesStructureSchema } from "../../../Core/Schemas/Screen/Accesories/AccesoriesStructure";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { accesoriesArgs } from "../../../Core/Schemas/Inputs/accesoriesArgs";
import {
  ValidateFormsArgs,
  ValidateIDInspection,
} from "../../../Services/ValidateArgs";
import {
  CALL_PA_STEP_TWO,
  PA_ACTUALIZA_ACCESORIOS_APP,
  PA_STRUCTURE_STEP_2,
} from "../../../Services/StoreProcedure";

@Resolver()
export class Accesories {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => AccesoriesSchema, {
    name: "Accesories",
    description:
      "Query que obtiene estructura de datos para pantalla accesorios",
  })
  async Accesories(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D(await CALL_PA_STEP_TWO<AccesoriesSchema>(ID_INSPECTION)),
      structure: ResponseSP(
        await PA_STRUCTURE_STEP_2<AccesoriesStructureSchema>(ID_INSPECTION)
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Mutation((returns) => String, {
    name: "UpdateAccesories",
    description:
      "Mutación que permite actualizar los accesorios de la inspección",
  })
  async UpdateAccesories(@Args() args: accesoriesArgs, @Ctx() ctx: ContextLET) {
    ValidateFormsArgs(args);
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const response = ResponseSP2D(
      await PA_ACTUALIZA_ACCESORIOS_APP<{ MSJ: string }>(args, ID_INSPECTION)
    );
    if (response.MSJ === "Ok") {
      return "Actualización realizada con éxito";
    } else {
      throw new Error("Error al actualizar accesorios");
    }
  }
}
