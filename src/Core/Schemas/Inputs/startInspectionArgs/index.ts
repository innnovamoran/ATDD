import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class startInspectionArgs {
  @Field((type) => Number, {
    nullable: false,
    description: "ID de inspección",
  })
  ID_INSPECTION!: Number;
  @Field((type) => Number, {
    nullable: false,
    description: "Tiempo de duración de inspección",
  })
  TIME_INSPECTION!: Number;
  @Field((type) => String, {
    nullable: false,
    description: "Email usuario en inspección",
  })
  EMAIL!: String;
}
