import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { ContextLET } from "../..";
import {
  StructureCarousel,
  Onboarding as OnboardingSchema,
} from "../../../Core/Schemas/Screen/Onboarding";

import {
  CALL_PA_STRUCTURE_CAROUSEL,
  CALL_PA_WELCOME_CAROUSEL,
} from "../../../Services/StoreProcedure";
import { ResponseSP, ResponseSP2D } from "../../../Services/ValidateSP";
import { ValidatorAppConfig } from "../../Middleware/ValidatorAppConfig";

@Resolver()
export class Onboarding {
  @UseMiddleware(ValidatorAppConfig)
  @Query((returns) => OnboardingSchema, {
    name: "Onboarding",
    description:
      "Query que entrega estructura de datos para pantalla de onboarding",
  })
  async Onboarding(@Ctx() ctx: ContextLET) {
    return {
      ...ResponseSP2D<OnboardingSchema>(
        await CALL_PA_WELCOME_CAROUSEL({
          appname: ctx.appname,
          appversion: ctx.appversion,
          plataform: ctx.plataform,
        })
      ),
      structure: ResponseSP<StructureCarousel>(
        await CALL_PA_STRUCTURE_CAROUSEL<StructureCarousel>({
          appname: ctx.appname,
          appversion: ctx.appversion,
          plataform: ctx.plataform,
        })
      ),
    } as OnboardingSchema;
  }
}
