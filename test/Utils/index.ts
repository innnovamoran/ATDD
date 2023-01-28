import { graphql } from "graphql";
import { NonEmptyArray, buildSchema } from "type-graphql";

interface Options {
  source: string;
  variableValues: any;
}

export const gCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: [__dirname + "/src/Server/Resolver/**/*.ts"],
    }),
    source,
    variableValues,
  });
};
