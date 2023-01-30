import { Mutation, Query, Resolver, Arg, createUnionType } from "type-graphql";
import { ProductInput } from "../../../Core/Repositories/Product/Input";
import { ProductGraphSchema } from "../../../Core/Repositories/Product/Schema";
import { CreateProduct } from "../../../Core/Repositories/Product";
import { MongooseErrorSchema } from "../../../Core/ErrorMongoose";

const ProductResponse = createUnionType({
  name: "ProductResponse",
  types: () => [MongooseErrorSchema, ProductGraphSchema] as const,
  resolveType: (value) => {
    if ("errors" in value) {
      return MongooseErrorSchema;
    }
    return ProductGraphSchema;
  },
});

@Resolver()
export class ProductResolver {
  @Query((returns) => String)
  test() {
    return "hola";
  }

  @Mutation((returns) => ProductResponse, {
    name: "addNewProduct",
    description: "Create new product to store",
  })
  async addNewProduct(
    @Arg("ProductInput") data: ProductInput
  ): Promise<typeof ProductResponse> {
    const response = await CreateProduct(data);
    if (Array.isArray(response)) {
      return { errors: response } as MongooseErrorSchema;
    }
    return response as ProductGraphSchema;
  }
}
