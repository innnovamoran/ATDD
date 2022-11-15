import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Estructura pantalla login de inspección" })
export class Login {
  @Field((type) => String, {
    nullable: true,
    description: "Título de pantalla",
  })
  title_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color título de pantalla",
  })
  title_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente título de pantalla",
  })
  title_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de fondo para título de pantalla",
  })
  title_backgroundColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto subtitulo de pantalla",
  })
  subtitle_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color subtitulo de pantalla",
  })
  subtitle_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente subtitulo de pantalla",
  })
  subtitle_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto descripción de pantalla",
  })
  description_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto descripción de pantalla",
  })
  description_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente descripción de pantalla",
  })
  description_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de input RUT",
  })
  rut_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto input RUT",
  })
  rut_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente para texto input RUT",
  })
  rut_text_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de input RUT",
  })
  rut_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color icono de input RUT",
  })
  rut_icon_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto input PATENTE",
  })
  patente_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto input PATENTE",
  })
  patente_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Fuente de texto input PATENTE",
  })
  patente_text_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de input PATENTE",
  })
  patente_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color icono input PATENTE",
  })
  patente_icon_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto botón obtener inspección",
  })
  btn_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto botón obtener inspección",
  })
  btn_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente texto botón obtener inspección",
  })
  btn_text_typeFont!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color botón obtener inspección",
  })
  btn_color!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que obtiene la inspección",
  })
  btn_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de link",
  })
  textLink_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto de link",
  })
  textLink_text_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Nombre de aplicación",
  })
  appname!: String;
}
