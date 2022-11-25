import { ObjectType, Field } from "type-graphql";
@ObjectType({ description: "Estuctura modal resumen" })
export class Resume {
  @Field((type) => Number, {
    description: "Numero de paso ui barra de progreso",
    nullable: true,
  })
  id!: Number;
  @Field((type) => String, {
    description: "Título collapsible resumen",
    nullable: true,
  })
  title!: String;
}
