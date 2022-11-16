import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Pantalla finalizar inspección" })
export class EndInspectionStructure {
  @Field((type) => String, {
    nullable: false,
    description: "Título de términos y condiciones",
  })
  description!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto informativo",
  })
  text!: String;
  @Field((type) => Boolean, {
    nullable: false,
    description: "Validador que determina si se muestra o no el campo email",
  })
  active_mail!: Boolean;
  @Field((type) => Boolean, {
    nullable: false,
    description:
      "Variable que usa frontend para abrir modal de términos y condiciones",
  })
  active_term!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description: "Link informativo",
  })
  link!: String;
  @Field((type) => Boolean, {
    nullable: false,
    description:
      "Variable que determina si el campo es requerido o no (input email o rb de términos y condiciones)",
  })
  required!: Boolean;
  @Field((type) => String, {
    nullable: false,
    description:
      "Texto de validación para campos (email input o rb términos y condiciones)",
  })
  text_validation!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Texto label de input email en rb llegara vacío",
  })
  label!: String;
  @Field((type) => String, {
    nullable: false,
    description:
      "Icono de caja input email en términos y condiciones llegara vacío",
  })
  icon!: String;
}
