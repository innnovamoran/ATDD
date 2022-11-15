import { ObjectType, Field } from "type-graphql";
import { HelpStructureGeneral } from "../HelpStructureGeneral";
import { OptionsStructureStepOneSchema } from "../OptionsStructureStepOne";

@ObjectType({ description: "Estructura de salida pantalla caracteristicas generales" })
export class StructureGeneral {
  @Field((type)=> Number, {
    nullable: true,
    description: "Identificador"
  })
  id!: Number;
  @Field((type)=> String, {
    nullable:true,
    description: "Etiqueta"
  })
  label!: String;
  @Field((type)=> String, {
    nullable:true,
    description: "Tipo"
  })
  type!: String;
  @Field((type)=> HelpStructureGeneral, {
    nullable:true,
    description: ""
  })
  help!: HelpStructureGeneral;
  @Field((type)=> [OptionsStructureStepOneSchema], {
    nullable:true,
    description: ""
  })
  options!: OptionsStructureStepOneSchema[];
}