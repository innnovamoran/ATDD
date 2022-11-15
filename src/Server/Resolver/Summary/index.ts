import { Query, Resolver } from "type-graphql";

import ORM from "../../Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { Summary as SummarySchema } from "../../../Core/Schemas/Screen/Summary";

const db_instance = new ORM();

@Resolver()
export class Summary {
  async CALL_PA_TEXT_INICIO_AI<T>(): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_TEXT_INICIO_AI") as any;
  }

  @Query((returns) => SummarySchema, { name: "Summary" })
  async Summary() {
    return ResponseSP2D<SummarySchema>(await this.CALL_PA_TEXT_INICIO_AI());
  }
}
