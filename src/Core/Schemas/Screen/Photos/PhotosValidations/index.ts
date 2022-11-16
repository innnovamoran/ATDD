import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "Validaciones por fotos iteradas",
})
export class PhotosValidations {
  @Field((type) => Boolean, {
    nullable: false,
    description: "Validador que muestra el timer dentro de botón continuar",
  })
  active_chronometer!: Boolean;
  @Field((type) => Number, {
    nullable: false,
    description: "Máximo de fotos a tomar",
  })
  max_photos!: Number;
  @Field((type) => Number, {
    nullable: false,
    description: "Segundos de timer en botón continuar",
  })
  timer_seconds!: Number;
  @Field((type) => Number, {
    nullable: false,
    description: "Minutos de timer en botón continuar",
  })
  timer_minutes!: Number;
  @Field((type) => Number, {
    nullable: false,
    description: "Horas de timer en botón continuar",
  })
  timer_hour!: Number;
  @Field((type) => Number, {
    nullable: false,
    description: "Máximo de archivos a seleccionar",
  })
  pick_files!: Number;
}
