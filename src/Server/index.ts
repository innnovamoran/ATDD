import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { graphqlHTTP, getGraphQLParams } from "express-graphql";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./Resolver";
import helmet from "helmet";
import HandleDataBase from "./Config/DataSource";
import { PayloadGenerateToken } from "../Services/Auth";

export interface ContextLET extends Request {
  inspection?: PayloadGenerateToken;
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
    this.app.listen(this.port, callback);
  }
}
