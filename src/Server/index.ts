import "reflect-metadata";
import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./Resolver";

import helmet from "helmet";
import MongooseDB from "./Config/Mongoose";

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
      graphqlHTTP({
        schema: await buildSchema({
          resolvers: Resolvers,
          validate: { always: true },
        }),
        graphiql: process.env.NODE_ENV === "develop",
        customFormatErrorFn: (error) => {
          console.log("customFormatErrorFn", error.originalError);

          return error;
        },
      })
    );
    this.app.use(helmet());
  }

  start_server(callback: () => void) {
    new MongooseDB().start_connection_db();
    this.useGraphql();
    this.app.listen(this.port, callback);
  }
}
