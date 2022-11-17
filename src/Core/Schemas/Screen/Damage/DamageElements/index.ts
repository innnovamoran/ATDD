import { ObjectType, Field } from "type-graphql";

@ObjectType({
  description:
    "Estructura de elementos de un daño en especifico",
})
export class DamageElementsSchema {
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador",
  })
  id!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Título",
  })
  title!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título de galería",
  })
  title_gallery!: String;
}