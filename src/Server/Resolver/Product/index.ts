import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ErrorMongoose } from "../../../Core/GraphSchemas/ErrorMongoose";
import { ProductGraphSchema } from "../../../Core/GraphSchemas/Product";
import { ProductArgs } from "../../../Core/GraphSchemas/Product/Args";
import { CreateProduct } from "../../../Core/Repositories/Product/index";
@Resolver()
export class ProductResolver {
  @Mutation((returns) => ProductGraphSchema || ErrorMongoose, {
    name: "addNewProduct",
    description: "Create new product to store",
  })
  async addNewProduct(@Args() args: ProductArgs) {
    return await CreateProduct(args);
  }
}
