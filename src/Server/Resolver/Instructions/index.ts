import { Args, Query, Resolver } from "type-graphql";
import { InstructionsSchema } from "../../../Core/Schemas/Instructions";
import { InstructionsArg } from "../../../Core/Schemas/InstructionsArgs";
import {
  StructureCarousel,
  Onboarding as OnboardingSchema,
} from "../../../Core/Schemas/StructureCarousel";

import ORM from "../../../Server/Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Instructions {
  @Query((returns) => [InstructionsSchema], { name: "Instructions" })
  async Instructions(
    @Args()
    {
      ID_INSPECCION,
    }: InstructionsArg
  ) {
    const response = await db_instance.connection.query(
      `EXEC PA_INSTRUCTIONS_APP_AI :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      }
    );
    console.log("response", response[0]);
    return response[0];
  }
}