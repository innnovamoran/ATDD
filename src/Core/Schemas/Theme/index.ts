import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Tema de colores para uso de aplicación" })
export class Theme {
  @Field((type) => String, {
    description: "Color primario de tema",
    nullable: true,
  })
  primary_color!: String;
  @Field((type) => String, {
    description: "Color secundario de tema",
    nullable: true,
  })
  secundary_color!: String;
  @Field((type) => String, {
    description: "Color de textos",
    nullable: true,
  })
  description_font_color!: String;
  @Field((type) => String, {
    description: "Color de titulos",
    nullable: true,
  })
  title_font_color!: String;
  @Field((type) => String, {
    description: "Color de fondos de pantalla",
    nullable: true,
  })
  backgroundScreen!: String;
  @Field((type) => String, {
    description: "Color de fondo de tarjetas",
    nullable: true,
  })
  backgroundCard!: String;
}
