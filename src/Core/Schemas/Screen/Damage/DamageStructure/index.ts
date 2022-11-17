import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura de datos Daños" })
export class StructureDamage {
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador"
  })
  id!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Título"
  })
  title!: String;
}