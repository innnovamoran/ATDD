import { Field, ObjectType } from "type-graphql";
import { Theme } from "../../Theme";
import { Resume } from "../Resume";

@ObjectType({ description: "Listado de fotos a corregir" })
export class ToFix {
  @Field((type) => String, {
    description: "Nombre de fotos a corregir",
    nullable: true,
  })
  name!: String;
}
@ObjectType({ description: "Obtener inspección a realizar" })
export class Inspection {
  @Field((type) => Number, {
    description: "Identificador único de inspección",
    nullable: true,
  })
  id!: Number;
  @Field((type) => String, {
    description: "Mensaje de error o éxito",
    nullable: true,
  })
  MSJ!: String;
  @Field((type) => String, {
    description: "Tipo de inspección",
    nullable: true,
  })
  type!: String;
  @Field((type) => String, {
    description: "Nombre de usuario",
    nullable: true,
  })
  name!: String;
  @Field((type) => String, {
    description: "Apellido de usuario",
    nullable: true,
  })
  lastname!: String;
  @Field((type) => String, {
    description: "Rut de usuario",
    nullable: true,
  })
  rut!: String;
  @Field((type) => String, {
    description: "Correo electrónico de usuario",
    nullable: true,
  })
  email!: String;
  @Field((type) => String, {
    description: "Patente de vehículo en inspección",
    nullable: true,
  })
  patente!: String;
  @Field((type) => String, {
    description: "Logo de aplicación",
    nullable: true,
  })
  img_logo!: String;
  @Field((type) => String, {
    description: "Tiempo de inicio inspección",
    nullable: true,
  })
  time_started!: String;
  @Field((type) => Number, {
    description: "Operador que define si ya se inicio está inspección",
    nullable: true,
  })
  isStarted!: Number;
  @Field((type) => String, {
    description: "Fecha de inicio inspección",
    nullable: true,
  })
  date_started!: String;
  @Field((type) => String, {
    description: "Tiempo en milisegundos que debe durar la inspección",
    nullable: true,
  })
  timer_inspection!: String;
  @Field((type) => String, {
    description: "Titulo",
    nullable: true,
  })
  last_step_title!: String;
  @Field((type) => String, {
    description: "Tiempo de reconexión",
    nullable: true,
  })
  time_remaining!: String;
  @Field((type) => String, {
    description: "Porcentaje de inspección completado",
    nullable: true,
  })
  porcent_finish!: String;
  @Field((type) => String, {
    description: "Numero teléfono de usuario",
    nullable: true,
  })
  phone_number!: String;
  @Field((type) => String, {
    description: "Número de ayuda whatsapp",
    nullable: true,
  })
  whatsapp_number!: String;
  @Field((type) => String, {
    description: "Texto enviado al solicitar ayuda en whatsapp",
    nullable: true,
  })
  whatsapp_text!: String;
  @Field((type) => String, {
    description: "Horario de atención",
    nullable: true,
  })
  business_hours!: String;
  @Field((type) => String, {
    description: "Días de atención",
    nullable: true,
  })
  business_week!: String;
  @Field((type) => [ToFix], {
    description: "Inspección de tipo FIX",
    nullable: true,
  })
  to_fix!: ToFix[];
  @Field((type) => Number, {
    description: "Inspección activa",
    nullable: true,
  })
  active!: Number;
  @Field((type) => Theme, {
    nullable: true,
    description: "Tema de inspección por ID",
  })
  theme!: Theme;
  @Field((type) => [Resume], {
    nullable: true,
    description: "Estructura modal resumen",
  })
  resume!: Resume[];
}
