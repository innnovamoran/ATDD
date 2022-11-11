import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Obtener instrucciones" })
export class InstructionsSchema {
  @Field((type) => Number, {
    nullable: true,
    description: "Id de objeto"
  })
  id!: Number;
  @Field((type) => Number, {
    nullable: true,
    description: "Id de instrucción"
  })
  id_instruction!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Parrafo"
  })
  paragraph!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono"
  })
  icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título"
  })
  title!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción"
  })
  description!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón siguiente"
  })
  btn_next_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón siguiente"
  })
  btn_next_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Fondo botón siguiente"
  })
  btn_next_background!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón siguiente"
  })
  btn_next_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón siguiente"
  })
  btn_next_FontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón siguiente"
  })
  btn_next_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón siguiente"
  })
  btn_next_iconColor!: String;
}
