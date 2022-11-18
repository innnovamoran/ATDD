import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class accesoriesArgs {
  @Field((type) => Number, {
    description: "Identificador único de campo RB",
    nullable: false,
  })
  ID_CAMPO!: Number;
  @Field((type) => Boolean, {
    description: "RB seleccionado",
    nullable: false,
  })
  VALUE!: Boolean;
}
