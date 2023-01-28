import "reflect-metadata";

import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { Resolvers } from "../../src/Server/Resolver";
interface Options {
  source: string;
}

export const gCall = async ({ source }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: Resolvers,
    }),
    source,
  });
};
