import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType({ description: "Product" })
export class ProductGraphSchema {
  @Field((type) => ID, {
    nullable: true,
    description: "ID product",
  })
  _id!: string;
  @Field((type) => String, {
    nullable: true,
    description: "Name product",
  })
  name!: string;

  @Field((type) => Int, {
    nullable: true,
    description: "Stock available",
  })
  stock!: number;

  @Field((type) => String, {
    nullable: true,
    description: "Bar Code product",
  })
  bar_code!: string;

  @Field((type) => Int, {
    nullable: true,
    description: "Percentage of discount",
  })
  discount_percentage!: number;

  @Field((type) => Int, {
    nullable: true,
    description: "Price product",
  })
  price!: number;
}
