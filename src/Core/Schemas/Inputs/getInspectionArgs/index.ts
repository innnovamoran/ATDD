import { ArgsType, Field } from "type-graphql";
@ArgsType()
export class getInspectionArgs {
  @Field((type) => String, {
    nullable: false,
    description: "Rut de inspección",
  })
  RUT!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Patente de inspección",
  })
  PATENTE!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Modelo de teléfono que inicia inspección",
  })
  PHONE_MODEL!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Marca de teléfono (Iphone - Huawei etc...)",
  })
  PHONE_BRAND!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Tipo de sistema operativo del teléfono (IOS-ANDROID)",
  })
  PHONE_SO!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Tipo de conexión a internet del teléfono",
  })
  INTERNET_PROVIDER!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Token FCM para envio de notificaciónes push",
  })
  TOKEN_FIREBASE!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Aplicación en uso (FID-LET)",
  })
  APPNAME!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Versiónado de la aplicación movil.",
  })
  APPVERSION!: String;

  @Field((type) => String, {
    nullable: false,
    description: "Plataforma que usa el sistema.",
  })
  PLATAFORM!: String;
}
