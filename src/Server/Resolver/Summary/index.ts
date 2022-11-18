import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

import { ResponseSP2D } from "../../../Services/ValidateSP";
import { Summary as SummarySchema } from "../../../Core/Schemas/Screen/Summary";
import { CALL_PA_TEXT_INICIO_AI } from "../../../Services/StoreProcedure";
import { ValidatorAppConfig } from "../../Middleware/ValidatorAppConfig";
import { ContextLET } from "../..";

@Resolver()
export class Summary {
  @UseMiddleware(ValidatorAppConfig)
  @Query((returns) => SummarySchema, {
    name: "Summary",
    description:
      "Query que entrega estructura de pantalla resumen de inspección",
  })
  async Summary(
    @Ctx() ctx: ContextLET
  ) {
    return ResponseSP2D<SummarySchema>(await CALL_PA_TEXT_INICIO_AI({
      appname: ctx.appname,
      appversion: ctx.appversion,
      plataform: ctx.plataform,
    }));
  }
}
