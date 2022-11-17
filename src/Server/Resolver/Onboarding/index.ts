import { Query, Resolver } from "type-graphql";
import {
  StructureCarousel,
  Onboarding as OnboardingSchema,
} from "../../../Core/Schemas/Screen/Onboarding";

import {
  CALL_PA_STRUCTURE_CAROUSEL,
  CALL_PA_WELCOME_CAROUSEL,
} from "../../../Services/StoreProcedure";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";

@Resolver()
export class Onboarding {
  @Query((returns) => OnboardingSchema, { name: "Onboarding" })
  async Onboarding() {
    return {
      ...ResponseSP2D<OnboardingSchema>(await CALL_PA_WELCOME_CAROUSEL()),
      structure: ResponseSP<StructureCarousel>(
        await CALL_PA_STRUCTURE_CAROUSEL<StructureCarousel>()
      ),
    } as OnboardingSchema;
  }
}
