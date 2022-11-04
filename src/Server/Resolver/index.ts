import { NonEmptyArray } from "type-graphql";
import { Onboarding } from "./Onboarding";
import { Signin } from "./Signin";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
];
