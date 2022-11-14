import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Estructura de pantalla onboarding" })
export class StructureCarousel {
  @Field((type) => String, {
    description: "Titulo de onboarding",
    nullable: true,
  })
  title!: String;
  @Field((type) => String, {
    description: "Icono de onboarding",
    nullable: true,
  })
  icon!: String;
  @Field((type) => String, {
    description: "Texto descriptivo de onboarding",
    nullable: true,
  })
  text!: String;
  @Field((type) => Number, {
    description: "Orden de segmento carousel",
    nullable: true,
  })
  order!: Number;
  @Field((type) => String, {
    description: "Texto de botón por segmento carousel",
    nullable: true,
  })
  btn_text!: String;
  @Field((type) => String, {
    description: "Color Texto de botón por segmento de carousel",
    nullable: true,
  })
  btn_text_color!: String;
  @Field((type) => String, {
    description: "Color de botón por segmento de onboarding",
    nullable: true,
  })
  btn_color!: String;
}

@ObjectType({ description: "Pantalla de onboarding" })
export class Onboarding {
  @Field((type) => String, {
    description: "Titulo cabecera de onboarding",
    nullable: true,
  })
  title!: String;
  @Field((type) => String, {
    description: "Descripción de cabecera onboarding",
    nullable: true,
  })
  description!: String;
  @Field((type) => String, {
    description: "Se activo por primera vez el onboarding",
    nullable: true,
  })
  firstActive!: String;
  @Field((type) => [StructureCarousel], {
    description: "Estructura iterable de carousel",
    nullable: true,
  })
  structure!: StructureCarousel[];
}
