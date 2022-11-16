import { ObjectType, Field } from "type-graphql";
import { EndInspectionStructure } from "./EndInspectionStructure";

@ObjectType({ description: "Pantalla finalizar inspección" })
export class EndInspection {
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
    description: "Título términos y condiciones",
  })
  title_terms_and_conditions!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Subtitulo de términos y condiciones",
  })
  subtitle_terms_and_conditions!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón resumen",
  })
  btn_resumen_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón resumen",
  })
  btn_resumen_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente texto botón resumen",
  })
  btn_resumen_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón resumen",
  })
  btn_resumen_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color de botón resumen",
  })
  btn_resumen_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón continuar",
  })
  btn_continue_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto botón continuar",
  })
  btn_continue_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón continuar",
  })
  btn_continue_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón continuar",
  })
  btn_continue_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón continuar",
  })
  btn_continue_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto título de modal resumen",
  })
  title_resumen_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto título modal resumen",
  })
  title_resumen_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente texto título modal resumen",
  })
  title_resumen_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente título modal resumen",
  })
  title_resumen_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción resumen",
  })
  description_resumen_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto descripción resumen",
  })
  description_resumen_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente texto descripción resumen",
  })
  description_resumen_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente texto descripción resumen",
  })
  description_resumen_fontSize!: Number;
  @Field((type) => [EndInspectionStructure], {
    nullable: true,
    description: "Tamaño de fuente texto descripción resumen",
  })
  structure!: EndInspectionStructure[];
}
