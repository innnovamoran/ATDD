import { NonEmptyArray } from "type-graphql";
import { Onboarding } from "./Onboarding";
import { Inspection } from "./Inspection";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Inspection,
];
