import { ProductInput } from "../../../Core/GraphSchemas/Product/Input";
import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { ProductGraphSchema } from "../../../Core/GraphSchemas/Product";
import { CreateProduct } from "../../../Core/Repositories/Product";
@Resolver()
export class ProductResolver {
  @Query((returns) => String)
  test() {
    return "hola";
  }

  @Mutation((returns) => ProductGraphSchema, {
    name: "addNewProduct",
    description: "Create new product to store",
  })
  async addNewProduct(@Arg("ProductInput") data: ProductInput) {
    return await CreateProduct(data);
  }
}
