import { ObjectType, Field } from "type-graphql";
import { ButtonGeneral } from "../ButtonGeneral";

@ObjectType({ description: "Estructura de salida pantalla caracteristicas generales" })
export class HelpGeneralCharacteristic {
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
    description: "Html"
  })
  html!: String;
  @Field((type) => ButtonGeneral, {
    nullable: true,
    description: "Botón llamada"
  })
  button_call!: ButtonGeneral;
  @Field((type) => ButtonGeneral, {
    nullable: true,
    description: "Botón Whatsapp"
  })  
  button_whatsapp!: ButtonGeneral;
}