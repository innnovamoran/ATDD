import { ObjectType, Field } from "type-graphql";

@ObjectType({
  description:
    "Estructura de pantalla opciones pantalla características generales",
})
export class FeatureOptions {
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador",
  })
  id!: Number;

  @Field((type) => String, {
    nullable: true,
    description: "Valor de opción",
  })
  value!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Mensaje de validación",
  })
  message_validation!: String;
}
