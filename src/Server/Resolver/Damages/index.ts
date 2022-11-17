import {
  Arg,
  Ctx,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { Damage } from "../../../Core/Schemas/Screen/Damage";
import { DamageElementsSchema } from "../../../Core/Schemas/Screen/Damage/DamageElements";
import { CALL_PA_ELEMENTS_STRUCTURE_STEP_4, CALL_PA_STEP_FOUR, CALL_PA_STRUCTURE_STEP_4 } from "../../../Services/StoreProcedure";
import { ValidateIDInspection, ValidateIDNumber } from "../../../Services/ValidateArgs";

@Resolver()
export class Damages {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => Damage, { 
    name: "Damages", 
    description: "Query que obtiene estructura de datos y diferentes propiedades para armar pantalla", 
  })
  async Damages(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D(await CALL_PA_STEP_FOUR<Damage>(ID_INSPECTION)),
      structure: ResponseSP(await CALL_PA_STRUCTURE_STEP_4(ID_INSPECTION))
    };
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [DamageElementsSchema], {
    name: "DamageElements",
    description: "Query que obtiene elementos de daño",
  })
  async DamageElements(
    @Arg("ID_STRUCTURE_STEP_4") ID_STRUCTURE_STEP_4: number,
    @Ctx() ctx: ContextLET
  ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const ID_STRUCTURE = ValidateIDNumber(ID_STRUCTURE_STEP_4);
    return ResponseSP<DamageElementsSchema>(
      await CALL_PA_ELEMENTS_STRUCTURE_STEP_4<DamageElementsSchema>(
        ID_INSPECTION,
        ID_STRUCTURE,
      )
    );
  }
}
