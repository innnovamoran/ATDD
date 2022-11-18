import { ObjectType, Field } from "type-graphql";
import { StructureDamage } from "./DamageStructure";

@ObjectType({ description: "Pantalla daños" })
export class Damage {
  @Field((type) => String, {
    nullable: true,
    description: "User"
  })
  usr!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Identificación CIA"
  })
  id_cia!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Corredor"
  })
  corredor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Identificador ramo"
  })
  id_ramo!: String;
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
    description: "Título de ayuda"
  })
  title_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción de ayuda"
  })
  description_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón llamada de ayuda"
  })
  btn_help_call_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón llamada de ayuda"
  })
  btn_help_call_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón llamada de ayuda"
  })
  btn_help_call_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón llamada de ayuda"
  })
  btn_help_call_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño fuente botón llamada de ayuda"
  })
  btn_help_call_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón llamada de ayuda"
  })
  btn_help_call_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón llamada de ayuda"
  })
  btn_help_call_IconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón whatsapp ayuda"
  })
  btn_help_wsp_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón whatsapp ayuda"
  })
  btn_help_wsp_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón whatsapp ayuda"
  })
  btn_help_wsp_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón whatsapp ayuda"
  })
  btn_help_wsp_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente botón whatsapp ayuda"
  })
  btn_help_wsp_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Ícono botón whatsapp ayuda"
  })
  btn_help_wsp_Icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color ícono botón whatsapp ayuda"
  })
  btn_help_wsp_IconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Html ayuda"
  })
  html_help!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título información"
  })
  title_info!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción información"
  })
  description_info!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón confirmar información"
  })
  btn_confirm_info_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón confirmar información"
  })
  btn_confirm_info_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente botón confirmar información"
  })
  btn_confirm_info_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño fuente botón confirmar información"
  })
  btn_confirm_info_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón confirmar información"
  })
  btn_confirm_info_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón confirmar información"
  })
  btn_cancel_info_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón confirmar información"
  })
  btn_cancel_info_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo fuente botón confirmar información"
  })
  btn_cancel_info_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño fuente botón confirmar información"
  })
  btn_cancel_info_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón confirmar información"
  })
  btn_cancel_info_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón cancelar"
  })
  btn_cancel_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón cancelar"
  })
  btn_cancel_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo fuente botón cancelar"
  })
  btn_cancel_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño fuente botón cancelar"
  })
  btn_cancel_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón cancelar"
  })
  btn_cancel_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón siguiente"
  })
  btn_next_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón siguiente"
  })
  btn_next_textColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo fuente botón siguiente"
  })
  btn_next_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño fuente botón siguiente"
  })
  btn_next_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón siguiente"
  })
  btn_next_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto información sobre herramientas siguiente"
  })
  text_tooltip_next!: String;
  @Field((type) => Boolean, {
    nullable: true,
    description: "Mensaje activo"
  })
  activeMessage!: Boolean;
  @Field((type) => Boolean, {
    nullable: true,
    description: "Primera información sobre herramientas"
  })
  firstTooltip!: Boolean;
  @Field((type) => String, {
    nullable: true,
    description: "Título lugar"
  })
  title_place!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Parte de título"
  })
  title_part!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título información completa"
  })
  title_info_complete!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descipción información completa"
  })
  description_info_complete!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título modal"
  })
  title_modal!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Botón confirmar modal"
  })
  button_confirm_modal!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Botón cancelar modal"
  })
  button_cancel_modal!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto información sobre herramientas"
  })
  text_tooltip!: String;
  @Field((type)=> [StructureDamage], {
    nullable:true,
    description: "Array de objetos de estructura"
  })
  structure!: StructureDamage[];
}
