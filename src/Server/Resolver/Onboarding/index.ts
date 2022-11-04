import { Arg, Query, Resolver } from "type-graphql";
import {
  StructureCarousel,
  Onboarding as OnboardingSchema,
} from "../../../Core/Schemas/StructureCarousel";

import ORM from "../../../Server/Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class Onboarding {
  spHeadOnboarding = async (): Promise<{
    title: string;
    description: string;
    firstActive: string;
  }> => {
    const response = await db_instance.connection.query("PA_WELCOME_CAROUSEL");
    return response[0][0] as {
      title: string;
      description: string;
      firstActive: string;
    };
  };

  spStructureOnboardingasync = async (): Promise<StructureCarousel[]> => {
    const response = await db_instance.connection.query(
      "PA_STRUCTURE_CAROUSEL"
    );
    return response[0] as StructureCarousel[];
  };

  @Query((returns) => OnboardingSchema, { name: "Onboarding" })
  async Onboarding() {
    const [head, body] = await Promise.all([
      this.spHeadOnboarding(),
      this.spStructureOnboardingasync(),
    ]);
    return { ...head, structure: body } as OnboardingSchema;
  }
}
