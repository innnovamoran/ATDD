import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class PhotoArgs {
  @Field((type) => Number, {
    description: "Identificador único de inspección",
    nullable: false,
  })
  ID_INSPECCION!: Number;
  @Field((type) => Number, {
    description: "ID identificador de estructura de paso",
    nullable: false,
  })
  ID_STRUCTURE_STEP_3!: Number;
  @Field((type) => String, {
    description: "Mimetype de archivo",
    nullable: false,
  })
  TYPE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LATITUE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LONGITUDE!: String;
  @Field((type) => String, {
    description: "Descripción de fotos accesorios",
    nullable: false,
  })
  DESCRIPTION!: String;
  @Field((type) => Number, {
    description: "Identificador pieza dañanada",
    nullable: true,
  })
  ID_PIEZA!: Number;
}

@ArgsType()
export class DocsArgs {
  @Field((type) => Number, {
    description: "Identificador único de inspección",
    nullable: false,
  })
  ID_INSPECCION!: Number;
  @Field((type) => Number, {
    description: "ID identificador de estructura de paso",
    nullable: false,
  })
  ID_STRUCTURE_STEP_3!: Number;
  @Field((type) => String, {
    description: "Mimetype de archivo",
    nullable: false,
  })
  NAME!: String;
  @Field((type) => String, {
    description: "Mimetype de archivo",
    nullable: false,
  })
  TYPE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LATITUE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LONGITUDE!: String;
}

@ArgsType()
export class DamageArgs {
  @Field((type) => Number, {
    description: "Identificador único de inspección",
    nullable: false,
  })
  ID_INSPECCION!: Number;
  @Field((type) => Number, {
    description: "ID identificador de estructura de paso",
    nullable: false,
  })
  ID_STRUCTURE_STEP_4!: Number;
  @Field((type) => String, {
    description: "Mimetype de archivo",
    nullable: false,
  })
  TYPE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LATITUE!: String;
  @Field((type) => String, {
    description: "Geo-Ubicación de usuario",
    nullable: false,
  })
  LONGITUDE!: String;
  @Field((type) => String, {
    description: "Descripción de fotos accesorios",
    nullable: false,
  })
  DESCRIPTION!: String;
  @Field((type) => Number, {
    description: "Identificador pieza dañanada",
    nullable: true,
  })
  ID_PIEZA!: Number;
}
