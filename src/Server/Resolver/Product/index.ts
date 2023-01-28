import { Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class ProductResolver {
  @Query(() => String)
  test() {
    return "hola";
  }

  @Mutation(() => String, {
    name: "addNewProduct",
    description: "Create new product to store",
  })
  addNewProduct() {
    /*     console.log(args);
    const data = await CreateProduct(args);
    console.log(data); */

    return "hola";
  }
}
