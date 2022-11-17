import { ObjectType, Field } from "type-graphql";
import { EvaluationButton } from "./EvaluationButton";
import { EvaluationStructure } from "./EvaluationStructure";

@ObjectType({ description: "Pantalla de evaluación" })
export class Evaluation {
  @Field((type) => String, {
    nullable: true,
    description: "Usuario",
  })
  usr!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador CIA",
  })
  id_cia!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Corredor",
  })
  corredor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título",
  })
  title!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción",
  })
  description!: String;
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
    description: "Texto botón llamado de ayuda",
  })
  btn_help_call_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón llamado de ayuda",
  })
  btn_help_call_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón llamado de ayuda",
  })
  btn_help_call_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón llamado de ayuda",
  })
  btn_help_call_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón llamado de ayuda",
  })
  btn_help_call_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón llamado de ayuda",
  })
  btn_help_call_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón llamado de ayuda",
  })
  btn_help_call_IconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón whatsapp de ayuda",
  })
  btn_help_wsp_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón whatsapp de ayuda",
  })
  btn_help_wsp_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón whatsapp de ayuda",
  })
  btn_help_wsp_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón whatsapp de ayuda",
  })
  btn_help_wsp_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón whatsapp de ayuda",
  })
  btn_help_wsp_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón whatsapp de ayuda",
  })
  btn_help_wsp_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón whatsapp de ayuda",
  })
  btn_help_wsp_IconColor!: String;
  @Field((type) => Boolean, {
    nullable: true,
    description: "¿Está desabilitado el botón llamado de ayuda?",
  })
  btn_help_call_disable!: Boolean;
  @Field((type) => Boolean, {
    nullable: true,
    description: "¿Está desabilitado el botón whatsapp de ayuda?",
  })
  btn_help_wsp_disable!: Boolean;
  @Field((type) => String, {
    nullable: true,
    description: "Texto html para mesa de ayuda",
  })
  html_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto informativo",
  })
  text_info_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto informativo",
  })
  text_info_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente texto informativo",
  })
  text_info_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de texto informativo",
  })
  text_info_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón de tiendas",
  })
  btn_store_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón de tiendas",
  })
  btn_store_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón de tiendas",
  })
  btn_store_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de texto botón de tiendas",
  })
  btn_store_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón de tiendas",
  })
  @Field((type) => String, {
    nullable: true,
    description: "Color botón de tiendas",
  })
  btn_store_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón confirmar",
  })
  btn_confirm_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón confirmar",
  })
  btn_confirm_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón confirmar",
  })
  btn_confirm_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de texto botón confirmar",
  })
  btn_confirm_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón confirmar",
  })
  btn_confirm_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto informativo",
  })
  text_tip_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto tip",
  })
  text_tip_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente tip",
  })
  text_tip_TypeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño texto tip",
  })
  text_tip_Size!: Number;
  @Field((type) => [EvaluationStructure], {
    description: "Estructura de iconos para pantalla evalucación",
  })
  structure!: EvaluationStructure[];
  @Field((type) => EvaluationButton, { description: "Botón evaluación" })
  btn_evaluation!: EvaluationButton;
}
