import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "Advertencias por fotos iteradas",
})
export class PhotosWarning {
  @Field((type) => Number, {
    nullable: false,
    description: "ID de foto iterada",
  })
  id_structure_step!: Number;
  @Field((type) => Boolean, {
    nullable: false,
    description: "Validador que muestra o no la advertencia",
  })
  active!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description: "Título advertencia",
  })
  title!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Descripción advertencia",
  })
  description!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón siguiente advertencia",
  })
  btn_next_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color texto de botón siguiente advertencia",
  })
  btn_next_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de botón siguiente advertencia",
  })
  btn_next_background!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente botón siguiente advertencia",
  })
  btn_next_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente botón siguiente",
  })
  btn_next_FontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono de botón siguiente advertencia",
  })
  btn_next_icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de icono botón siguiente advertencia",
  })
  btn_next_iconColor!: String;
  @Field((type) => Boolean, {
    nullable: false,
    description: "Validador que muestra o no el botón cancelar de advertencia",
  })
  ActiveButtonCancel!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description: "Texto botón cancelar advertencia",
  })
  btn_cancel_text!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de texto botón cancelar advertencia",
  })
  btn_cancel_color!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Color de botón cancelar advertencia",
  })
  btn_cancel_background!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Tipo de fuente botón cancelar advertencia",
  })
  btn_cancel_typeFont!: String;
  @Field((type) => Number, {
    nullable: false,
    description: "Tamaño de fuente botón cancelar",
  })
  btn_cancel_FontSize!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Icono botón cancelar advertencia",
  })
  btn_cancel_icon!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Colo de icono cancelar advertencia",
  })
  btn_cancel_iconColor!: String;
}
