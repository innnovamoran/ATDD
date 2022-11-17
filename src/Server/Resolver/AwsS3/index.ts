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

import { ResponseSP2D } from "../../../Services/ValidateSP";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";
import {
  CALL_PA_INGRESA_DOCUMENTS_STEP_3,
  CALL_PA_INGRESA_PHOTO_STEP_3,
  CALL_PA_INGRESA_PHOTO_STEP_4,
} from "../../../Services/StoreProcedure";

type FileUpload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

type SpGetName = {
  MSJ: string;
  NOMBRE_IMG: string;
};

interface factoryUpload {
  [key: string]: (ctx: ContextLET) => Promise<SpGetName>;
}

@Resolver()
export class AwsS3 {
  handleUploadPhoto = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_PHOTO_STEP_3<SpGetName>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_PIEZA: ctx.body.ID_PIEZA,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
      })
    );

  handleUploadAccesories = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_PHOTO_STEP_3<SpGetName>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_INSPECCION: 999,
        ID_PIEZA: ctx.body.ID_PIEZA,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
      })
    );

  handleUploadDamage = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_PHOTO_STEP_4<SpGetName>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_PIEZA: ctx.body.ID_PIEZA,
        ID_STRUCTURE_STEP_4: ctx.body.ID_STRUCTURE_STEP_4,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
      })
    );

  handleUploadDocuments = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_DOCUMENTS_STEP_3<SpGetName>({
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
  ): ((ctx: ContextLET) => Promise<SpGetName>) => {
    const factory: factoryUpload = {
      photo: this.handleUploadPhoto,
      damage: this.handleUploadDamage,
      accesories: this.handleUploadAccesories,
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
    const { buffer } = ctx.file as FileUpload;
    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const response = await this.factoryUploadFile(ctx.body.SECTION)(ctx);

    if (response.MSJ !== "Ok") {
      throw new Error("Error en generar nombre de archivo");
    }

    const isUpload = await uploadFileToBucket({
      name: response.NOMBRE_IMG,
      buffer: buffer,
      ID_INSPECTION: Number(ID_INSPECTION),
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
