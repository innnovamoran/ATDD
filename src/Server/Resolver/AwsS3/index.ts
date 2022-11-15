import {
  Arg,
  Resolver,
  Mutation,
  Ctx,
  Query,
  UseMiddleware,
} from "type-graphql";

import { uploadFileToBucket, getFileStream } from "../../../Dependencies/Aws";

import { ContextLET } from "../..";
import { ValidatorFile } from "../../Middleware/ValidatorFile";
import { InspectionAccess } from "../../Middleware/InspectionAccess";

import ORM from "../../Config/DataSource";
import {
  DamageArgs,
  DocsArgs,
  PhotoArgs,
} from "../../../Core/Schemas/Inputs/PhotoArgs";
import { ResponseSP2D } from "../../../Services/ValidateSP";
const db_instance = new ORM();

type FileUpload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

interface factoryUpload {
  [key: string]: (ctx: ContextLET) => Promise<string>;
}

@Resolver()
export class AwsS3 {
  CALL_PA_INGRESA_PHOTO_STEP_3<T>({
    ID_INSPECCION,
    ID_STRUCTURE_STEP_3,
    TYPE,
    LATITUE,
    LONGITUDE,
    DESCRIPTION,
    ID_PART,
  }: PhotoArgs): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_INGRESA_PHOTO_STEP_3_V2 :ID_INSPECCION, :ID_STRUCTURE_STEP_3, :TYPE, :LATITUE, :LONGITUDE, :DESCRIPTION, :ID_PART",
      {
        replacements: {
          ID_INSPECCION,
          ID_STRUCTURE_STEP_3,
          TYPE,
          LATITUE,
          LONGITUDE,
          DESCRIPTION,
          ID_PART,
        },
      }
    ) as any;
  }

  CALL_PA_INGRESA_PHOTO_STEP_4<T>({
    ID_INSPECCION,
    ID_STRUCTURE_STEP_4,
    TYPE,
    LATITUE,
    LONGITUDE,
    DESCRIPTION,
    ID_PART,
  }: DamageArgs): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_INGRESA_PHOTO_STEP_3_V2 :ID_INSPECCION, :ID_STRUCTURE_STEP_4, :TYPE, :LATITUE, :LONGITUDE, :DESCRIPTION, :ID_PART",
      {
        replacements: {
          ID_INSPECCION,
          ID_STRUCTURE_STEP_4,
          TYPE,
          LATITUE,
          LONGITUDE,
          DESCRIPTION,
          ID_PART,
        },
      }
    ) as any;
  }

  CALL_PA_INGRESA_DOCUMENTS_STEP_3<T>({
    ID_INSPECCION,
    ID_STRUCTURE_STEP_3,
    NAME,
    TYPE,
    LATITUE,
    LONGITUDE,
  }: DocsArgs): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      "EXEC PA_INGRESA_DOCUMENTS_STEP_3 :ID_INSPECCION, :ID_STRUCTURE_STEP_3, :NAME, :TYPE, :LATITUE, :LONGITUDE",
      {
        replacements: {
          ID_INSPECCION,
          ID_STRUCTURE_STEP_3,
          NAME,
          TYPE,
          LATITUE,
          LONGITUDE,
        },
      }
    ) as any;
  }

  handleUploadPhoto = async (ctx: ContextLET) =>
    ResponseSP2D(
      await this.CALL_PA_INGRESA_PHOTO_STEP_3<string>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_PART: ctx.body.ID_PART,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
      })
    );

  handleUploadDamage = async (ctx: ContextLET) =>
    ResponseSP2D(
      await this.CALL_PA_INGRESA_PHOTO_STEP_4<string>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_PART: ctx.body.ID_PART,
        ID_STRUCTURE_STEP_4: ctx.body.ID_STRUCTURE_STEP_4,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
      })
    );

  handleUploadDocuments = async (ctx: ContextLET) =>
    ResponseSP2D(
      await this.CALL_PA_INGRESA_DOCUMENTS_STEP_3<string>({
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
        NAME: ctx.body.NAME,
      })
    );

  factoryUploadFile = (
    type: string
  ): ((ctx: ContextLET) => Promise<string>) => {
    const factory: factoryUpload = {
      photo: this.handleUploadPhoto,
      damage: this.handleUploadDamage,
      accesories: this.handleUploadPhoto,
      documents: this.handleUploadDocuments,
    };
    return factory[type];
  };

  @UseMiddleware(InspectionAccess)
  @UseMiddleware(ValidatorFile)
  @Mutation((returns) => String, {
    name: "UploadPhoto",
    description: "Mutación que permite la subida de archivos a S3",
  })
  async UploadPhoto(@Ctx() ctx: ContextLET): Promise<String> {
    // console.log(ctx.file);
    const { buffer, mimetype } = ctx.file as FileUpload;
    if (typeof ctx.inspection?.ID_INSPECTION === "undefined") {
      throw new Error("Token incorrecto");
    }
    const nameFile = await this.factoryUploadFile(ctx.body.SECTION)(ctx);

    if (typeof nameFile !== "string" || nameFile.length === 0) {
      throw new Error("Error en crear nombre de archivo");
    }

    const isUpload = await uploadFileToBucket({
      name: nameFile,
      buffer: buffer,
      ID_INSPECTION: Number(ctx.inspection?.ID_INSPECTION),
    });

    if (typeof isUpload === "undefined") {
      throw new Error("Error al subir archivo");
    }
    return isUpload;
  }

  @Query((returns) => String, {
    name: "GetBaseFile",
    description: "Query que obtiene base64 de archivo de S3",
  })
  async GetBaseFile(@Arg("fileName") fileName: String): Promise<String> {
    if (!fileName || fileName.length === 0) {
      throw new Error("Nombre de archivo es requerido");
    }
    return await getFileStream(`${fileName}`);
  }
}
