import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class ProductArgs {
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
    description: "Bar Code product",
  })
  bar_code!: String;

  @Field((type) => Number, {
    nullable: true,
    description: "Percentage of discount",
  })
  discount_percentage!: Number;

  @Field((type) => Number, {
    nullable: true,
    description: "Price product",
  })
  price!: Number;
}
