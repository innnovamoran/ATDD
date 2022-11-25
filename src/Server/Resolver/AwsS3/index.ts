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
import {
  ValidateIDInspection,
  ValidatorSectionFactory,
  ValidatorUploadFiles,
} from "../../../Services/ValidateArgs";
import {
  CALL_PA_INGRESA_DOCUMENTS_STEP_3,
  CALL_PA_INGRESA_PHOTO_STEP_3,
  CALL_PA_INGRESA_PHOTO_STEP_4,
  CALL_PA_INGRESA_VIDEO_STEP_3,
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
type SpGetNameVideo = {
  MSJ: string;
  NOMBRE_VIDEO: string;
};

type spGenerictNameFile = { MSJ: string; name: string };
interface factoryUpload {
  [key: string]: (ctx: ContextLET) => Promise<SpGetName>;
}

@Resolver()
export class AwsS3 {
  handleUploadPhoto = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_PHOTO_STEP_3<SpGetName>({
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
        DESCRIPTION: "", // no requerido
        ID_PIEZA: 0, // no requerido
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

  handleUploadAccesories = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_PHOTO_STEP_3<SpGetName>({
        DESCRIPTION: ctx.body.DESCRIPTION,
        ID_STRUCTURE_STEP_3: 999, // como es foto de accesorio por defecto se entrega el id es 999
        LATITUE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        TYPE: ctx.body.TYPE,
        ID_INSPECCION: ctx.inspection?.ID_INSPECTION
          ? ctx.inspection.ID_INSPECTION
          : 0,
        ID_PIEZA: 0, // no requerido
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

  handleUploadVideo = async (ctx: ContextLET) =>
    ResponseSP2D(
      await CALL_PA_INGRESA_VIDEO_STEP_3<SpGetName>({
        OI: ctx.inspection?.ID_INSPECTION ? ctx.inspection.ID_INSPECTION : 0,
        ID_STRUCTURE_STEP_3: ctx.body.ID_STRUCTURE_STEP_3,
        LATITUDE: ctx.body.LATITUE,
        LONGITUDE: ctx.body.LONGITUDE,
        MIME: ctx.body.TYPE,
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
      video: this.handleUploadVideo,
    };
    return factory[type];
  };

  handleGetName(response: SpGetName): spGenerictNameFile {
    const r = response as SpGetName;
    return { MSJ: r.MSJ, name: r.NOMBRE_IMG };
  }

  @UseMiddleware(InspectionAccess)
  @UseMiddleware(ValidatorFile)
  @Mutation((returns) => String, {
    name: "UploadPhoto",
    description: "Mutación que permite la subida de archivos a S3",
  })
  async UploadPhoto(@Ctx() ctx: ContextLET): Promise<String> {
    ValidatorSectionFactory(ctx.body.SECTION);
    ValidatorUploadFiles(ctx.body, ctx.body.SECTION);
    const { buffer } = ctx.file as FileUpload;

    const ID_INSPECTION = ValidateIDInspection(ctx.inspection?.ID_INSPECTION);
    const response: spGenerictNameFile = this.handleGetName(
      await this.factoryUploadFile(ctx.body.SECTION)(ctx)
    );

    if (response.MSJ !== "Ok") {
      throw new Error(`${response.MSJ}, ${response.name}`);
    }

    const isUpload = await uploadFileToBucket({
      name: response.name,
      buffer: buffer,
      ID_INSPECTION: Number(ID_INSPECTION),
    });

    if (typeof isUpload === "undefined") {
      throw new Error("Error en carga de archivo, intente nuevamente");
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
