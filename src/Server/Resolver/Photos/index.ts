import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

import { Photos as PhotosSchema } from "../../../Core/Schemas/Screen/Photos";
import { PhotosStructure as PhotosStructureSchema } from "../../../Core/Schemas/Screen/Photos/PhotosStructure";
import { PhotosValidations as PhotosValidationsSchema } from "../../../Core/Schemas/Screen/Photos/PhotosValidations";
import { PhotosWarning as PhotosWarningSchema } from "../../../Core/Schemas/Screen/Photos/PhotosWarning";
import { PhotosHelpDesk as PhotosHelpDeskSchema } from "../../../Core/Schemas/Screen/Photos/PhotosHelpDesk";
import {
  ValidateIDInspection,
  ValidateIDNumber,
} from "../../../Services/ValidateArgs";
import {
  CALL_PA_CONFIG_SCREEEN_HELP_STEP_3,
  CALL_PA_STEP_THREE,
  CALL_PA_STRUCTURE_STEP_3,
  CALL_PA_VALIDATIONS_STEP_3,
  CALL_PA_WARNING_STEP_3,
} from "../../../Services/StoreProcedure";
@Resolver()
export class Photos {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => PhotosSchema, { name: "Photos" })
  async Photos(@Ctx() ctx: ContextLET) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return {
      ...ResponseSP2D(await CALL_PA_STEP_THREE<PhotosSchema>(ID_INSPECTION)),
      structure: ResponseSP(
        await CALL_PA_STRUCTURE_STEP_3<PhotosStructureSchema>(ID_INSPECTION)
      ),
    };
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => PhotosValidationsSchema, { name: "ValidationPhoto" })
  async ValidationPhoto(
    @Arg("ID_STRUCTURE_STEP_3") ID_STRUCTURE_STEP_3: Number,
    @Ctx() ctx: ContextLET
  ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP2D(
      await CALL_PA_VALIDATIONS_STEP_3<PhotosValidationsSchema>(
        ValidateIDNumber(ID_STRUCTURE_STEP_3),
        ID_INSPECTION
      )
    );
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => PhotosWarningSchema, { name: "WarningPhoto" })
  async WarningPhoto(
    @Arg("ID_STRUCTURE_STEP_3") ID_STRUCTURE_STEP_3: Number,
    @Ctx() ctx: ContextLET
  ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP2D(
      await CALL_PA_WARNING_STEP_3<PhotosWarningSchema>(
        ValidateIDNumber(ID_STRUCTURE_STEP_3),
        ID_INSPECTION
      )
    );
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => PhotosHelpDeskSchema, { name: "HelpDeskPhoto" })
  async HelpDeskPhoto(
    @Arg("ID_STRUCTURE_STEP_3") ID_STRUCTURE_STEP_3: Number,
    @Ctx() ctx: ContextLET
  ) {
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    return ResponseSP2D(
      await CALL_PA_CONFIG_SCREEEN_HELP_STEP_3<PhotosHelpDeskSchema>(
        ValidateIDNumber(ID_STRUCTURE_STEP_3),
        ID_INSPECTION
      )
    );
  }
}
