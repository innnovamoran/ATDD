import { Query, Resolver, UseMiddleware } from "type-graphql";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

@Resolver()
export class Test {
  @UseMiddleware(InspectionAccess)
  @Query((returns) => String, {
    name: "CheckTest",
    description: "Query para hacer consultas de código",
  })
  async CheckTest() {
    return "Hola";
  }
}
