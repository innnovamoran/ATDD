import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class Signin {
  @Query((returns) => String, { name: "Signin" })
  async Signin() {
    return "hola";
  }
}
