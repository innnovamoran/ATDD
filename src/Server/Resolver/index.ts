import { NonEmptyArray } from "type-graphql";
import { Signin } from "./Signin";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Signin,
];
