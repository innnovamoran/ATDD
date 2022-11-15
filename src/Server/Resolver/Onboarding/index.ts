import { Query, Resolver } from "type-graphql";
import {
  StructureCarousel,
  Onboarding as OnboardingSchema,
} from "../../../Core/Schemas/Screen/Onboarding";

import ORM from "../../../Server/Config/DataSource";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";

const db_instance = new ORM();

@Resolver()
export class Onboarding {
  async CALL_PA_WELCOME_CAROUSEL<T>(): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_WELCOME_CAROUSEL") as any;
  }

  async CALL_PA_STRUCTURE_CAROUSEL<T>(): Promise<Array<Array<T>>> {
    return db_instance.connection.query("PA_STRUCTURE_CAROUSEL") as any;
  }

  @Query((returns) => OnboardingSchema, { name: "Onboarding" })
  async Onboarding() {
    return {
      ...ResponseSP2D<OnboardingSchema>(await this.CALL_PA_WELCOME_CAROUSEL()),
      structure: ResponseSP<StructureCarousel>(
        await this.CALL_PA_STRUCTURE_CAROUSEL<StructureCarousel>()
      ),
    } as OnboardingSchema;
  }
}
