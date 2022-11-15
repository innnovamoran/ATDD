import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Estructura pantalla resumen de inspección" })
export class Summary {
  @Field((type) => String, {
    nullable: true,
    description: "Texto de botón que inicia inspección",
  })
  btn_start_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto para botón que incia inspección",
  })
  btn_start_textcolor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de botón que inicia inspección",
  })
  btn_start_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente para botón que inicia inspección",
  })
  btn_start_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que inicia inspección",
  })
  btn_start_Fontsize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de boton que inica inspección",
  })
  btn_start_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de icono que inicia inspección",
  })
  btn_start_iconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de botón fix",
  })
  btn_fix_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto que inicia inspección",
  })
  btn_fix_textcolor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de botón que inicia inspección",
  })
  btn_fix_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente de botón que inicia inspección",
  })
  btn_fix_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que inicia inspección",
  })
  btn_fix_Fontsize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Icono botón que inicia inspección",
  })
  btn_fix_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de icono de botón que inicia inspección",
  })
  btn_fix_iconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de botón que inicia inspección",
  })
  btn_resume_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto de botón que inicia inspección",
  })
  btn_resume_textcolor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de botón que inicia inspección",
  })
  btn_resume_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente de botón que inicia inspección",
  })
  btn_resume_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que inicia inspección",
  })
  btn_resume_Fontsize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de botón que inicia inspección",
  })
  btn_resume_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de icono de botón que inicia inspección",
  })
  btn_resume_iconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de botón que inicia inspección",
  })
  btn_reset_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color texto de botón que inicia inspección",
  })
  btn_reset_textcolor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de botón que inicia inspección",
  })
  btn_reset_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Fuente de botón que inicia inspección",
  })
  btn_reset_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que inicia inspección",
  })
  btn_reset_Fontsize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de botón que inicia inspección",
  })
  btn_reset_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de icono de botón que inicia inspección",
  })
  btn_reset_iconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de hipervínculo de información de inspección",
  })
  profileWebText!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Texto de hipervínculo para ingresar a la web",
  })
  profileWebLinkText!: String;
  @Field((type) => String, {
    nullable: true,
    description: "URL de consulta",
  })
  profileWebLinkUrl!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Titulo de pantalla",
  })
  title_text!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de fondo para titulo de resumen",
  })
  title_backgroundColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de texto de titulo",
  })
  title_color!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Tipo de fuente para titulo de pantalla resumen",
  })
  title_typeFont!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Tamaño de fuente para botón que inicia inspección",
  })
  title_fontSize!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "Icono de pantalla resumen",
  })
  title_icon!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Color de icono de pantalla resumen",
  })
  title_iconColor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Nombre de aplicación",
  })
  appname!: String;
}
