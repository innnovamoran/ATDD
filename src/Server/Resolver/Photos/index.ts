import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";
import { Photos as PhotosSchema } from "../../../Core/Schemas/Screen/Photos";
import { PhotosStructure as PhotosStructureSchema } from "../../../Core/Schemas/Screen/Photos/PhotosStructure";

const db_instance = new ORM();

@Resolver()
export class Photos {
  async CALL_PA_STEP_THREE<T>(ID_INSPECCION: Number): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_STEP_THREE :ID_INSPECCION", {
      replacements: { ID_INSPECCION },
    }) as any;
  }

  async CALL_PA_STRUCTURE_STEP_3<T>(
    ID_INSPECCION: Number
  ): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_STRUCTURE_STEP_3 :ID_INSPECCION", {
      replacements: { ID_INSPECCION },
    }) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => PhotosSchema, { name: "Photos" })
  async Photos(@Ctx() ctx: ContextLET) {
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }

    return {
      ...ResponseSP2D(
        await this.CALL_PA_STEP_THREE<PhotosSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
      structure: ResponseSP(
        await this.CALL_PA_STRUCTURE_STEP_3<PhotosStructureSchema>(
          ctx.inspection?.ID_INSPECTION
        )
      ),
    };
  }
}
