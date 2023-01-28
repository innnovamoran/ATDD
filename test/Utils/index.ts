import "reflect-metadata";

import { graphql } from "graphql";
import { buildSchema, Maybe } from "type-graphql";
import { Resolvers } from "../../src/Server/Resolver";
interface Options {
  source: string;
  variableValues: Maybe<{
    [key: string]: any;
  }>;
}

export const gCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: Resolvers,
    }),
    source,
    variableValues,
  });
};
