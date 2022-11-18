import { ObjectType, Field } from "type-graphql";
@ObjectType({ description: "Estructura de iconos para pantalla evaluación" })
export class EvaluationStructure {
  @Field((type) => String, {
    description: "Icono de tips evaluación",
    nullable: true,
  })
  icon!: String;
  @Field((type) => String, {
    description: "Texto de tips evaluación",
    nullable: true,
  })
  text!: String;
}
