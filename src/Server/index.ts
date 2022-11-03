import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./Resolver";
import helmet from "helmet";

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
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
        graphiql: process.env.NODE_ENV === "develop",
      })
    );
    this.app.use(helmet());
  }

  start_server(callback: () => void) {
    this.useGraphql();
    this.app.listen(this.port, callback);
  }
}
