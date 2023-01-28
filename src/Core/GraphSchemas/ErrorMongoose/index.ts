import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Error de mongoose" })
export class ErrorMongoose {
  @Field((type) => String, {
    nullable: true,
    description: "Propiedad que contiene errores",
  })
  key!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Mensaje de error",
  })
  message!: String;
}
