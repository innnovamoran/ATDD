import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class appArgs {
  @Field((type) => String, {
    description: "Nombre de aplicación (LET-FED)",
    nullable: false,
  })
  appname!: String;
  @Field((type) => String, {
    description: "Ultima versión en producción de app",
    nullable: false,
  })
  appversion!: String;
  @Field((type) => String, {
    description: "Plataforma en uso de aplicación (Android - IOS)",
    nullable: false,
  })
  plataform!: String;
}
