import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura de formulario de características" })
export class FeatureStructure {
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador",
  })
  id!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Etiqueta",
  })
  label!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo",
  })
  type!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título de ayuda",
  })
  title_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción de ayuda",
  })
  description_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Html de ayuda",
  })
  help_html!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Usuario",
  })
  usr!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Corredor",
  })
  corredor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Identificador CIA",
  })
  id_cia!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón whatsapp",
  })
  btn_wsp_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón whatsapp",
  })
  btn_wsp_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón whatsapp",
  })
  btn_wsp_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón whatsapp",
  })
  btn_wsp_TypeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón whatsapp",
  })
  btn_wsp_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón whatsapp",
  })
  btn_wsp_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón whatsapp",
  })
  btn_wsp_IconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Número botón whatsapp",
  })
  btn_wsp_number!: String;
  @Field((type) => Boolean, {
    nullable: true,
    description: "¿Está desactivado el botón whatsapp?",
  })
  btn_wsp_disable!: Boolean;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón llamada",
  })
  btn_call_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón llamada",
  })
  btn_call_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón llamada",
  })
  btn_call_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón llamada",
  })
  btn_call_TypeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón llamada",
  })
  btn_call_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón llamada",
  })
  btn_call_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón llamada",
  })
  btn_call_IconColor!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Número botón llamada",
  })
  btn_call_number!: Number;
  @Field((type) => Boolean, {
    nullable: true,
    description: "Validador botón visible",
  })
  btn_call_disable!: Boolean;
  @Field((type) => String, {
    nullable: true,
    description: "Mensaje de validación",
  })
  message_validation!: String;
}
