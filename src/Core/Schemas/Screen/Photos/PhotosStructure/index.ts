import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "Estructura pantalla fotos requeridas de inspección",
})
export class PhotosStructure {
  @Field((type) => Number, {
    nullable: false,
    description: "ID de foto requerida",
  })
  id!: Number;

  @Field((type) => Boolean, {
    nullable: false,
    description: "Identificador de pagina confirmada",
  })
  pageconfirm!: Boolean;
  @Field((type) => String, { nullable: false, description: "Título de foto" })
  title!: String;
  @Field((type) => String, {
    nullable: false,
    description: "Descripción de foto en HTML",
  })
  description!: String;
  @Field((type) => String, {
    nullable: false,
    description: "URL de foto referencia",
  })
  reference_photo!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Campo usado en front para almacenar la ultima foto asignada",
  })
  last_take!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Campo usado en front para almacenar la matriz de fotos",
  })
  photos_gallery!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Título de modal galería",
  })
  title_gallery!: String;
  @Field((type) => String, {
    nullable: true,
    description: "Mensaje de error validaciones (por definir)",
  })
  photo_wrong!: String;
  @Field((type) => Boolean, {
    nullable: true,
    description: "Valor saltar paso de foto",
  })
  saltar_foto!: Boolean;
  @Field((type) => String, { nullable: true, description: "Texto saltar foto" })
  saltar_foto_text!: String;
}
