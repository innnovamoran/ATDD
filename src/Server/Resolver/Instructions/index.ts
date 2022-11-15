import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { InstructionsSchema } from "../../../Core/Schemas/Instructions";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

import ORM from "../../../Server/Config/DataSource";
import { ResponseSP } from "../../../Services/ValidateSP";
const db_instance = new ORM();

@Resolver()
export class Instructions {
  CALL_PA_INSTRUCTIONS_APP_AI<T>({
    ID_INSPECCION,
  }: {
    ID_INSPECCION: Number | undefined;
  }): Promise<Array<Array<T>>> {
    if (typeof ID_INSPECCION === "undefined") {
      throw new Error("ID de inspección es requerido");
    }
    return db_instance.connection.query(
      `EXEC PA_INSTRUCTIONS_APP_AI :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      }
    ) as any;
  }

  @UseMiddleware(InspectionAccess)
  @Query((returns) => [InstructionsSchema], { name: "Instructions" })
  async Instructions(@Ctx() ctx: ContextLET) {
    return ResponseSP<InstructionsSchema>(
      await this.CALL_PA_INSTRUCTIONS_APP_AI({
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION,
      })
    );
  }
}
