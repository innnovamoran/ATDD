import { Query, Resolver } from "type-graphql";

import { ResponseSP2D } from "../../../Services/ValidateSP";
import { Summary as SummarySchema } from "../../../Core/Schemas/Screen/Summary";
import { CALL_PA_TEXT_INICIO_AI } from "../../../Services/StoreProcedure";

@Resolver()
export class Summary {
  @Query((returns) => SummarySchema, { name: "Summary" })
  async Summary() {
    return ResponseSP2D<SummarySchema>(await CALL_PA_TEXT_INICIO_AI());
  }
}
