import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Tiempo de inspección" })
export class TimerInspection {
  @Field((type) => Number, {
    description: "Minutos de inspección",
  })
  minutes!: Number;
  @Field((type) => Number, {
    description: "Segundos de inspección",
  })
  seconds!: Number;
}
