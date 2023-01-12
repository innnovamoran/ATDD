import { NonEmptyArray } from "type-graphql";
import { Shoppingcar } from "./Shoppingcar";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Shoppingcar,
];
