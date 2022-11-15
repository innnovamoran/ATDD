import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class GerenalCharasteristicsArgs {
  @Field((type) => Number, {
    description: "Identificador único de inspección",
    nullable: false,
  })
  ID_INSPECCION!: Number;
}
