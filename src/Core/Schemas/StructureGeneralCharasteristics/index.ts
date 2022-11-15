import { ObjectType, Field } from "type-graphql";
import { ConfigScreen } from "../ConfigScreen";
import { HelpGeneralCharacteristic } from "../HelpGeneralCharacteristic";
import { StructureGeneral } from "../StructureGeneral";

@ObjectType({ description: "Estructura de salida pantalla caracteristicas generales" })
export class StructureGeneralCharasteristics {
  @Field((type)=> Number, {
    nullable: true,
    description: "Identificador"
  })
  id!: Number;
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
  @Field((type)=> HelpGeneralCharacteristic, {
    nullable: true,
    description: "Objeto de tipo HelpGeneralCharacteristic"
  })
  help!: HelpGeneralCharacteristic;
  @Field((type)=> ConfigScreen, {
    nullable: true,
    description: "Configuración de pantalla"
  })
  config_screen!: ConfigScreen;
  @Field((type)=> [StructureGeneral], {
    nullable: true,
    description: "Array de objetos tipo StructureGeneral"
  })  
  structure!: StructureGeneral[];
}
