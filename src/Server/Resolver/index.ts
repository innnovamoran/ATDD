import { NonEmptyArray } from "type-graphql";
import { Instructions } from "./Instructions";
import { Onboarding } from "./Onboarding";
import { Inspection } from "./Inspection";
import { Test } from "./Test";
import { AwsS3 } from "./AwsS3";
import { Summary } from "./Summary";
import { Feature } from "./Feature";
import { Accesories } from "./Accesories";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Instructions,
  Inspection,
  AwsS3,
  Summary,
  Feature,
  Accesories,
  Test,
];
