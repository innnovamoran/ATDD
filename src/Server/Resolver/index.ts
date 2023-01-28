import { NonEmptyArray } from "type-graphql";
import { ProductResolver } from "./Product";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  ProductResolver,
];
