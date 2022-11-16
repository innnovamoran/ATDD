import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "Esquema de mesa ayuda por fotos",
})
export class PhotosHelpDesk {
  @Field((type) => String, {
    nullable: false,
    description: "Título mesa de ayuda",
  })
  title_help!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Descripción mesa de ayuda",
  })
  description_help!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón llamada mesa de ayuda",
  })
  btn_help_call_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de texto botón llamada mesa de ayuda",
  })
  btn_help_call_textColor!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de botón llamada mesa de ayuda",
  })
  btn_help_call_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente texto botón llamada mesa de ayuda",
  })
  btn_help_call_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente para botón de llamada en mesa de ayuda",
  })
  btn_help_call_fontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono de botón llamada mesa de ayuda",
  })
  btn_help_call_Icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color icono botón llamada mesa de ayuda",
  })
  btn_help_call_IconColor!: String;
  @Field((type) => Boolean, {
    nullable: false,
    description:
      "Validador que determina si se muestra o no el botón de llamada",
  })
  btn_help_call_disabled!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color texto botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_textColor!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente para botón de whatsapp en mesa de ayuda",
  })
  btn_help_wsp_fontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_Icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color icono botón whatsapp mesa de ayuda",
  })
  btn_help_wsp_IconColor!: String;
  @Field((type) => String, {
    nullable: false,
    description:
      "Validador que determina si se muestra o no el botón de whatsapp",
  })
  btn_help_wsp_disabled!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description: "Descripción en html mesa de ayuda",
  })
  html_help!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón siguiente",
  })
  btn_next_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de texto botón siguiente",
  })
  btn_next_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color botón siguiente",
  })
  btn_next_background!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente botón siguiente",
  })
  btn_next_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente para botón de siguiente en mesa de ayuda",
  })
  btn_next_fontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono botón siguiente mesa de ayuda",
  })
  btn_next_icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color icono botón siguiente mesa de ayuda",
  })
  btn_next_iconColor!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón acción mesa de ayuda",
  })
  btn_action_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color texto botón acción mesa de ayuda",
  })
  btn_action_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color botón acción mesa de ayuda",
  })
  btn_action_background!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente botón acción mesa de ayuda",
  })
  btn_action_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente para botón de acción en mesa de ayuda",
  })
  btn_action_fontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono botón acción mesa de ayuda",
  })
  btn_action_icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color icono botón acción mesa de ayuda",
  })
  btn_action_iconColor!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto tooltip de foto (esto deberia estar en otro schema)",
  })
  text_tooltip!: String;
  @Field((type) => String, {
    nullable: false,
    description:
      "Texto tooltip de galería de foto (esto deberia estar en otro schema)",
  })
  text_tooltip_gallery!: String;
}
