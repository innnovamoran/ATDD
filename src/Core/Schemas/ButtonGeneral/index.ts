import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura de salida pantalla caracteristicas generales" })
export class ButtonGeneral {
  @Field((type) => String, {
    nullable: true,
    description: "Texto",
  })
  text!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Color de texto",
  })
  text_color!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Color botón",
  })
  button_color!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente",
  })
  type_font!: String;

  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente",
  })
  font_size!: Number;

  @Field((type) => String, {
    nullable: true,
    description: "ïcono",
  })
  icon!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Color de ícono",
  })
  icon_color!: String;

  @Field((type) => Boolean, {
    nullable: true,
    description: "¿Está deshabilitado?",
  })
  disabled!: Boolean;

  @Field((type) => String, {
    nullable: true,
    description: "Número botón wsp",
  })
  btn_wsp_number!: String;

  @Field((type) => String, {
    nullable: true,
    description: "Número botón llamada",
  })
  btn_call_number!: String;
}