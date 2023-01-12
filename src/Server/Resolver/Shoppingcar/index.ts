import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class Shoppingcar {
  @Query((returns) => String, {
    name: "test",
    description: "test",
  })
  async Test() {
    return "Test-resolver";
  }
}
