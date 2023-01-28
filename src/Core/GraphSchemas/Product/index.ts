import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Product" })
export class ProductGraphSchema {
  @Field((type) => String, {
    nullable: true,
    description: "Name product",
  })
  name!: String;

  @Field((type) => Number, {
    nullable: true,
    description: "Stock available",
  })
  stock!: Number;

  @Field((type) => String, {
    nullable: true,
    description: "Bar Code of product",
  })
  bar_code!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Percentage of discount",
  })
  discount_percentage!: String;

  @Field((type) => Number, {
    nullable: true,
    description: "Percentage of discount",
  })
  price!: Number;
}
