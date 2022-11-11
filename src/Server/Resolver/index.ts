import { NonEmptyArray } from "type-graphql";
import { Instructions } from "./Instructions";
import { Onboarding } from "./Onboarding";
import { Signin } from "./Signin";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Signin,
  Instructions,
];
