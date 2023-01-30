import { Field, InputType, Int } from "type-graphql";

@InputType("ProductInput")
export class ProductInput {
  @Field((type) => String, {
    description: "Name product",
  })
  name!: string;

  @Field((type) => Int, {
    description: "Stock available",
  })
  stock!: number;

  @Field((type) => String, {
    description: "Bar Code product",
  })
  bar_code!: string;

  @Field((type) => Int, {
    nullable: true,
    description: "Percentage of discount",
  })
  discount_percentage!: number;

  @Field((type) => Int, {
    description: "Price product",
  })
  price!: number;
}
