import { Query, Resolver, Args } from "type-graphql";
import { InstructionsSchema } from "../../../Core/Schemas/Screen/Instructions";

import { ResponseSP } from "../../../Services/ValidateSP";
import { InstructionsArg } from "../../../Core/Schemas/Inputs/InstructionsArgs";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";
import { CALL_PA_INSTRUCTIONS_APP_AI } from "../../../Services/StoreProcedure";

@Resolver()
export class Instructions {
  @Query((returns) => [InstructionsSchema], {
    name: "Instructions",
    description:
      "Query que entrega las estructura de datos para pantalla de instrucciones de inspección",
  })
  async Instructions(@Args() { ID_INSPECCION }: InstructionsArg) {
    ValidateIDInspection(ID_INSPECCION);
    return ResponseSP<InstructionsSchema>(
      await CALL_PA_INSTRUCTIONS_APP_AI({
        ID_INSPECCION,
      })
    );
  }
}
