import { ObjectType, Field } from "type-graphql";
@ObjectType({ description: "Botón de evaluación en pantalla evaluación" })
export class EvaluationButton {
  @Field((type) => String, {
    description: "Texto de botón evaluación",
    nullable: true,
  })
  text!: String;
  @Field((type) => String, {
    description: "Texto de botón evaluación",
    nullable: true,
  })
  text_color!: String;
  @Field((type) => String, {
    description: "Tipo de fuente botón evaluación",
    nullable: true,
  })
  type_font!: String;
  @Field((type) => Boolean, {
    description: "Validador de advertencias",
    nullable: true,
  })
  warn!: Boolean;
  @Field((type) => Boolean, {
    description: "Validador de información",
    nullable: true,
  })
  info!: Boolean;
  @Field((type) => Number, {
    description: "Tamaño de fuente botón evaluación",
    nullable: true,
  })
  font_size!: Number;
}
