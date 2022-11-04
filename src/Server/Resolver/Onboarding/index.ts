import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class Onboarding {
  @Query((returns) => String, { name: "Onboarding" })
  async Onboarding() {
    return "hola";
  }
}
