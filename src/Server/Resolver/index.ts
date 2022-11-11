import { NonEmptyArray } from "type-graphql";
import { Onboarding } from "./Onboarding";
import { Inspection } from "./Inspection";
import { Test } from "./Test";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Inspection,
  Test,
];
