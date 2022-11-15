import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura de pantalla onboarding" })
export class StepOneSchema {
  @Field((type)=> String, {
    nullable: true,
    description: "Usuario"
  })
  usr!: String;
  @Field((type)=> Number, {
    nullable: true,
    description: "Identificador CIA"
  })
  id_cia!: Number;
  @Field((type)=> String, {
    nullable: true,
    description: "Corredor"
  })
  corredor!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Título"
  })
  title!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Descripción"
  })
  description!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Título de ayuda"
  })
  title_help!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Descripción de ayuda"
  })
  description_help!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Html"
  })
  html!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Texto botón siguiente"
  })
  btn_next_text!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color botón siguiente"
  })
  btn_next_color!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color de fondo botón siguiente"
  })
  btn_next_background!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Tipo de fuente botón siguiente"
  })
  btn_next_typeFont!: String;
  @Field((type)=> Number, {
    nullable: true,
    description: "Tamaño de fuente botón siguiente"
  })
  btn_next_fontSize!: Number;
  @Field((type)=> String, {
    nullable: true,
    description: "Ícono botón siguiente"
  })
  btn_next_icon!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color Ícono botón siguiente"
  })
  btn_next_iconColor!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Texto botón llamado de ayuda"
  })
  btn_help_call_text!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color texto botón llamado de ayuda"
  })
  btn_help_call_textColor!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color botón llamado de ayuda"
  })
  btn_help_call_color!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Tipo de fuente botón llamado de ayuda"
  })
  btn_help_call_typeFont!: String;
  @Field((type)=> Number, {
    nullable: true,
    description: "Tamaño de fuente botón llamado de ayuda"
  })
  btn_help_call_fontSize!: Number;
  @Field((type)=> String, {
    nullable: true,
    description: "Ícono botón llamado de ayuda"
  })
  btn_help_call_Icon!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color ícono botón llamado de ayuda"
  })
  btn_help_call_IconColor!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Texto botón whatsapp de ayuda"
  })
  btn_help_wsp_text!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color texto botón whatsapp de ayuda"
  })
  btn_help_wsp_textColor!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color botón whatsapp de ayuda"
  })
  btn_help_wsp_color!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Tipo de fuente botón whatsapp de ayuda"
  })
  btn_help_wsp_typeFont!: String;
  @Field((type)=> Number, {
    nullable: true,
    description: "Tamaño de fuente botón whatsapp de ayuda"
  })
  btn_help_wsp_fontSize!: Number;
  @Field((type)=> String, {
    nullable: true,
    description: "Ícono botón whatsapp de ayuda"
  })
  btn_help_wsp_Icon!: String;
  @Field((type)=> String, {
    nullable: true,
    description: "Color ícono botón whatsapp de ayuda"
  })
  btn_help_wsp_IconColor!: String;
  @Field((type)=> Boolean, {
    nullable: true,
    description: "¿Está desabilitado el botón llamado de ayuda?"
  })
  btn_help_call_disable!: Boolean;
  @Field((type)=> Boolean, {
    nullable: true,
    description: "¿Está desabilitado el botón whatsapp de ayuda?"
  })
  btn_help_wsp_disable!: Boolean;
}