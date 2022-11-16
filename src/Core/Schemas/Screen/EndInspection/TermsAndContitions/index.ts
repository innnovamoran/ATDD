import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Pantalla finalizar inspección" })
export class TermsAndConditions {
  @Field((type) => String, {
    nullable: false,
    description: "Título de términos y condiciones",
  })
  title!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Descripción de términos y condiciones",
  })
  @Field((type) => String)
  description!: String;
}
