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
      this.awsAdmin = new S3Client({
        region: REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
      });
    } catch (error: any) {
      LOG_ERROR({ message: error.message, function_name: "[s3ClientAws]" });
    }
  }
}
