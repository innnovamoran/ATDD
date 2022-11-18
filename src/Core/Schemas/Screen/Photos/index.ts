import { Field, ObjectType } from "type-graphql";
import { PhotosStructure } from "./PhotosStructure";

@ObjectType({
  description: "Estructura pantalla fotos requeridas de inspección",
})
export class Photos {
  @Field((type) => String, {
    nullable: true,
    description: "Usuario",
  })
  usr!: String;
  @Field((type) => Number, {
    nullable: true,
    description: "Identificador CIA",
  })
  id_cia!: Number;
  @Field((type) => String, {
    nullable: true,
    description: "corredor",
  })
  corredor!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título Principal",
  })
  title!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Descripción Principal",
  })
  description!: String;
  @Field((type) => [PhotosStructure], {
    nullable: false,
    description: "Listado de fotos requeridas para inspección",
  })
  structure!: PhotosStructure[];
}
