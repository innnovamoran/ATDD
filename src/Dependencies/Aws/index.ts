import {
  ListObjectsCommand,
  GetObjectCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";

import HandleAws from "../../Server/Config/Aws";
const s3ClientAws = new HandleAws();

import { LOG_ERROR } from "../../Core/Schemas/HandleLogError";
import { Readable } from "stream";

const getMimeTypes = (Key: string): string => {
  const type = Key.split(".")[1];
  if (type === "svg") {
    return "data:image/svg+xml;base64,";
  } else {
    return `data:image/${type};base64,`;
  }
};

type ParamsUploadFileToBucket = {
  name: string;
  buffer: Buffer | undefined;
  ID_INSPECTION: number;
};
const uploadFileToBucket = async ({
  name,
  buffer,
  ID_INSPECTION,
}: ParamsUploadFileToBucket): Promise<string | undefined> => {
  console.log({ name });
  const folder =
    process.env.NODE_ENV === "develop"
      ? process.env.AWS_FOLDER_DEV + "/i" + ID_INSPECTION
      : "i" + ID_INSPECTION;

  const FileName = folder + "/" + name;

  const Bucket =
    process.env.NODE_ENV === "develop"
      ? process.env.AWS_BUCKET_ASSETS_DEV
      : process.env.AWS_BUCKET_ASSETS_PROD;

  const upload = await s3ClientAws.awsAdmin.send(
    new UploadPartCommand({
      Bucket,
      Key: FileName,
      Body: buffer,
      PartNumber: undefined,
      UploadId: undefined,
    })
  );

  const resource = await s3ClientAws.awsAdmin.send(
    new ListObjectsCommand({
      Bucket,
    })
  );
  const file = resource.Contents?.find((e) => e.Key === `${FileName}`);
  return file?.Key;
};

const getFileStream = (Key: string): Promise<String> => {
  return new Promise(async (res, rej) => {
    try {
      const Bucket =
        process.env.NODE_ENV === "develop"
          ? process.env.AWS_BUCKET_ASSETS_DEV
          : process.env.AWS_BUCKET_ASSETS_PROD;

      const resource = await s3ClientAws.awsAdmin.send(
        new GetObjectCommand({
          Bucket,
          Key,
        })
      );
      let responseDataChunks: any = [];
      if (resource.Body instanceof Readable) {
        resource.Body.once("error", (err) => rej(err));
        resource.Body.on("data", (chunk) => {
          responseDataChunks.push(chunk);
        });
        resource.Body.once("end", () => {
          const join =
            Key.split(".")[1] === "svg"
              ? responseDataChunks.join("")
              : Buffer.concat(responseDataChunks);
          const buf = Buffer.from(
            join,
            Key.split(".")[1] === "svg" ? "utf8" : "binary"
          );
          res(getMimeTypes(Key) + buf.toString("base64"));
        });
      } else {
        throw new Error("Error en obtener archivo");
      }
    } catch (error: any) {
      LOG_ERROR({
        function_name: "[getFileStream]",
        message: error.message,
      });
      rej(error);
    }
  });
};

export { uploadFileToBucket, getFileStream };
