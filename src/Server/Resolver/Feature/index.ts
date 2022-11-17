import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { ContextLET } from "../..";
import { Feature as FeatureSchema } from "../../../Core/Schemas/Screen/Feature";
import { FeatureStructure as FeatureStructureSchema } from "../../../Core/Schemas/Screen/Feature/FeatureStructure";
import { FeatureOptions as FeatureOptionsSchema } from "../../../Core/Schemas/Screen/Feature/FeatureOptions";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";

import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { featureArgs } from "../../../Core/Schemas/Inputs/setFeaturesArgs";
import {
  ValidateFormsArgs,
  ValidateIDInspection,
} from "../../../Services/ValidateArgs";

import {
  CALL_PA_ACTUALIZA_CARACTERISTICAS_APP,
  CALL_PA_STEP_ONE,
  CALL_PA_STRUCTURE_STEP_1,
  CAL_PA_OPTIONS_STRUCTURE_STEP_1,
} from "../../../Services/StoreProcedure";

@Resolver()
export class Feature {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => FeatureSchema, {
    name: "Feature",
    description: "Query que obtiene valores de pantalla características",
  })
  async Feature(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D<FeatureSchema>(
        await CALL_PA_STEP_ONE<FeatureSchema>(ID_INSPECTION)
      ),
      structure: ResponseSP<FeatureStructureSchema>(
        await CALL_PA_STRUCTURE_STEP_1<FeatureStructureSchema>(ID_INSPECTION)
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
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP<FeatureOptionsSchema>(
      await CAL_PA_OPTIONS_STRUCTURE_STEP_1<FeatureOptionsSchema>(
        ID_STRUCTURE_STEP_1,
        ID_INSPECTION
      )
    );
  }

  @UseMiddleware(InspectionAccess)
  @Mutation((returns) => String, {
    name: "UpdateFeature",
    description: "Mutación que entrega JWT asociado a la inspección en curso",
  })
  async UpdateFeature(@Args() args: featureArgs, @Ctx() ctx: ContextLET) {
    ValidateFormsArgs(args);
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const response = ResponseSP2D(
      await CALL_PA_ACTUALIZA_CARACTERISTICAS_APP<{ MSJ: string }>(
        ID_INSPECTION,
        args
      )
    );
    if (response.MSJ === "Ok") {
      return "Actualización realizada con éxito";
    } else {
      throw new Error("Error al actualizar caracteristicas");
    }
  }
}
