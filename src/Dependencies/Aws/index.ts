import {
  ListObjectsCommand,
  GetObjectCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";

import HandleAws from "../../Server/Config/Aws";
const s3ClientAws = new HandleAws();

import { LOG_ERROR } from "../../Core/Schemas/HandleLogError";
import { Readable } from "stream";

type BucketParams = {
  name: string;
  buffer: Buffer;
  ContentType: string;
  config: string;
};
type BuckerResolve = {
  Bucket: string | undefined;
  Key: string;
  Body: Buffer | undefined;
  ContentType: string;
};
const getBucketParams = ({
  name,
  buffer,
  ContentType,
  config,
}: BucketParams): BuckerResolve | undefined => {
  if (config === "Assets") {
    return {
      Bucket: process.env.AWS_BUCKET_ASSETS,
      Key: process.env.AWS_FOLDER + "/" + name,
      Body: buffer,
      ContentType,
    };
  }
};

const getMimeTypes = (Key: string): string => {
  const type = Key.split(".")[1];
  if (type === "svg") {
    return "data:image/svg+xml;base64,";
  } else {
    return `data:image/${type};base64,`;
  }
};

const getCountFilesFromBucket = async (
  nameFile: string
): Promise<number | undefined> => {
  try {
    const bucketParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `HLSReady/${nameFile}`,
    };
    const data = await s3ClientAws.awsAdmin.send(
      new ListObjectsCommand(bucketParams)
    );
    return data.Contents?.length;
  } catch (error: any) {
    LOG_ERROR({
      function_name: "[getCountFilesFromBucket]",
      message: error.message,
    });
  }
};

type ParamsUploadFileToBucket = {
  name: string;
  buffer: Buffer | undefined;
  ContentType: string;
};
const uploadFileToBucket = async ({
  name,
  buffer,
  ContentType,
}: ParamsUploadFileToBucket): Promise<string | undefined> => {
  const FileName = process.env.AWS_FOLDER
    ? process.env.AWS_FOLDER + "/" + name
    : "";
  const upload = await s3ClientAws.awsAdmin.send(
    new UploadPartCommand({
      Bucket: process.env.AWS_BUCKET_ASSETS,
      Key: FileName,
      Body: buffer,
      PartNumber: undefined,
      UploadId: undefined,
    })
  );
  const resource = await s3ClientAws.awsAdmin.send(
    new ListObjectsCommand({
      Bucket: process.env.AWS_BUCKET_ASSET ? process.env.AWS_BUCKET_ASSET : "",
    })
  );

  const file = resource.Contents?.find((e) => e.ETag === upload.ETag);

  return file?.Key;
};

const getFileStream = (Key: string) => {
  return new Promise(async (res, rej) => {
    try {
      const resource = await s3ClientAws.awsAdmin.send(
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_ASSETS,
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
      }
    } catch (error: any) {
      LOG_ERROR({
        function_name: "[getFileStream]",
        message: error.message,
      });
      return rej(error);
    }
  });
};

export {
  getBucketParams,
  getCountFilesFromBucket,
  uploadFileToBucket,
  getFileStream,
};
