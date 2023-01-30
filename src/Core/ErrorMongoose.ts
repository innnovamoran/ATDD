import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Error de mongoose" })
export class IerrorSchema {
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

@ObjectType({ description: "Error de mongoose" })
export class MongooseErrorSchema {
  @Field((type) => [IerrorSchema], {
    nullable: true,
    description: "Propiedad que contiene errores",
  })
  errors!: IerrorSchema[];
}
