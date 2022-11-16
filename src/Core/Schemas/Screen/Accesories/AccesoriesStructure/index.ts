import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura formulario pantalla accesorios" })
export class AccesoriesStructure {
  @Field((type) => Number, { nullable: false, description: "ID radio button" })
  id!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Label radio button",
  })
  label!: String;
  @Field((type) => Number, { nullable: true, description: "ID radio button" })
  value!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Clave radio button",
  })
  key!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto mesa ayuda por radio button",
  })
  help!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Mensaje de validación por cada RB",
  })
  message_validation!: "campo obligatorio";
}
