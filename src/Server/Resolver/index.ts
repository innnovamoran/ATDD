import { NonEmptyArray } from "type-graphql";
import { Instructions } from "./Instructions";
import { Onboarding } from "./Onboarding";
import { Inspection } from "./Inspection";
import { Test } from "./Test";
import { AwsS3 } from "./AwsS3";
import { Summary } from "./Summary";
import { Feature } from "./Feature";
import { Accesories } from "./Accesories";
import { Photos } from "./Photos";
import { Damages } from "./Damages";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Instructions,
  Inspection,
  AwsS3,
  Summary,
  Feature,
  Accesories,
  Photos,
  Test,
  Damages,
];
