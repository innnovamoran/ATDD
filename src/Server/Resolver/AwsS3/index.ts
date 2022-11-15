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

type FileUpload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

@Resolver()
export class AwsS3 {
  @UseMiddleware(ValidatorFile)
  @Mutation((returns) => String, {
    name: "UploadPhoto",
    description: "Mutación que permite la subida de archivos a S3",
  })
  async UploadPhoto(@Ctx() ctx: ContextLET): Promise<String> {
    // console.log(ctx.file);
    const { originalname, buffer, mimetype } = ctx.file as FileUpload;
    const isUpload = await uploadFileToBucket({
      ContentType: mimetype,
      name: Date.now() + "_assets." + originalname.split(".")[1],
      buffer: buffer,
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
