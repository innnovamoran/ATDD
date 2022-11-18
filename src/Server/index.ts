import "reflect-metadata";
import express, { Express, Request } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./Resolver";
import { PayloadGenerateToken } from "../Services/Auth";
import HandleDataBase from "./Config/DataSource";
import helmet from "helmet";

import multer from "multer";
import HandleAws from "./Config/Aws";
const upload = multer();

export interface UploadFile {
  filename: string;
  mimetype: string;
  encoding: string;
}
export interface ContextLET extends Request {
  inspection?: PayloadGenerateToken;
  appname: String;
  appversion: String;
  plataform: String;
}

export default class ServerExpress {
  port: Number;
  app: Express;
  constructor(PORT: Number) {
    this.port = PORT;
    this.app = express();
  }

  static init_server(port: Number) {
    return new ServerExpress(port);
  }

  async useGraphql() {
    this.app.use(
      "/graphql",
      upload.single("photo"),
      graphqlHTTP({
        schema: await buildSchema({
          resolvers: Resolvers,
          validate: { always: true },
        }),
        graphiql: process.env.NODE_ENV === "develop",
      })
    );

    this.app.use(helmet());
  }

  start_server(callback: () => void) {
    this.useGraphql();
    new HandleDataBase().initDB();
    new HandleAws().s3ClientAws();
    this.app.listen(this.port, callback);
  }
}
