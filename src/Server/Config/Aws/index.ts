import { S3Client } from "@aws-sdk/client-s3";

import { LOG_ERROR } from "../../../Core/Schemas/HandleLogError";
const REGION = "us-east-1";

export default class HandleAws {
  awsAdmin!: S3Client;
  private static instance: HandleAws;
  constructor() {
    if (!HandleAws.instance) {
      HandleAws.instance = this;
      return this;
    }
    return HandleAws.instance;
  }

  s3ClientAws() {
    try {
      const accessKeyId =
        process.env.NODE_ENV === "develop"
          ? (process.env.AWS_ACCESS_KEY_ID_DEV as string)
          : (process.env.AWS_ACCESS_KEY_ID_PROD as string);

      const secretAccessKey =
        process.env.NODE_ENV === "develop"
          ? (process.env.AWS_SECRET_ACCESS_KEY_DEV as string)
          : (process.env.AWS_SECRET_ACCESS_KEY_PROD as string);

      this.awsAdmin = new S3Client({
        region: REGION,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    } catch (error: any) {
      LOG_ERROR({ message: error.message, function_name: "[s3ClientAws]" });
    }
  }
}
