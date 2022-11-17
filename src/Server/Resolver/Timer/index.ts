import { Query, Resolver, UseMiddleware, Ctx } from "type-graphql";
import { ContextLET } from "../..";
import { TimerInspection } from "../../../Core/Schemas/TimerInspection";
import { CalculateTimeInspection } from "../../../Services/CalculateTimeInspection";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

@Resolver()
export class Timer {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => TimerInspection, {
    name: "CheckTimerInspection",
    description: "Consulta de tiempo transcurrido de inspección",
  })
  async CheckTimerInspection(@Ctx() ctx: ContextLET) {
    return CalculateTimeInspection(ctx);
  }
}
