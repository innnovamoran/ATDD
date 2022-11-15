import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { InstructionsSchema } from "../../../Core/Schemas/Instructions";
import { ContextLET } from "../..";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

import ORM from "../../../Server/Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Instructions {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => [InstructionsSchema], { name: "Instructions" })
  async Instructions(@Ctx() ctx: ContextLET) {
    const response = await db_instance.connection.query(
      `EXEC PA_INSTRUCTIONS_APP_AI :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION: ctx.inspection?.ID_INSPECTION,
        },
      }
    );
    return response[0];
  }
}
