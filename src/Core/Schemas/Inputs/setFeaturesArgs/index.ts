import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class featureArgs {
  @Field((type) => Number, {
    nullable: false,
    description: "ID de opción estructura step 1 -> ID_STRUCTURE_STEP_1",
  })
  ID_CAMPO!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Valor de alguna opción -> value",
  })
  VALUE!: String;
}
