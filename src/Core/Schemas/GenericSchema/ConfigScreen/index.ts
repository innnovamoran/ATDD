import { ObjectType, Field } from "type-graphql";
import { ButtonGeneral } from "../ButtonGeneral";

@ObjectType({ description: "Estructura de salida pantalla caracteristicas generales" })
export class ConfigScreen {
  @Field((type) => String, {
    nullable: true,
    description: "Texto",
  })
  text!: String;

  @Field((type) => ButtonGeneral, {
    nullable:true, 
    description: "Botón continuar"
  })
  button_continue!: ButtonGeneral;
}