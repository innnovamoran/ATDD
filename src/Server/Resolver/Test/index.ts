import { Query, Resolver, UseMiddleware, Ctx } from "type-graphql";
import { ContextLET } from "../..";
import { TimerInspection } from "../../../Core/Schemas/TimerInspection";
import { CalculateTimeInspection } from "../../../Services/CalculateTimeInspection";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

@Resolver()
export class Test {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => TimerInspection, {
    name: "CheckTest",
    description: "Query para hacer consultas de código",
  })
  async CheckTest(@Ctx() ctx: ContextLET) {
    return CalculateTimeInspection(ctx);
  }
}
