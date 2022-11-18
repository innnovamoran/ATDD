import { NonEmptyArray } from "type-graphql";
import { Instructions } from "./Instructions";
import { Onboarding } from "./Onboarding";
import { Inspection } from "./Inspection";
import { AwsS3 } from "./AwsS3";
import { Summary } from "./Summary";
import { Feature } from "./Feature";
import { Accesories } from "./Accesories";
import { Photos } from "./Photos";
import { Damages } from "./Damages";
import { EndInspection } from "./EndInspection";
import { Evalutation } from "./Evaluation";
import { Timer } from "./Timer";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  Onboarding,
  Instructions,
  Inspection,
  AwsS3,
  Summary,
  Feature,
  Accesories,
  Photos,
  EndInspection,
  Evalutation,
  Damages,
  Timer,
];
