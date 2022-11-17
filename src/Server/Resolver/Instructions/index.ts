import { Query, Resolver, Args } from "type-graphql";
import { InstructionsSchema } from "../../../Core/Schemas/Screen/Instructions";

import ORM from "../../../Server/Config/DataSource";
import { ResponseSP } from "../../../Services/ValidateSP";
import { InstructionsArg } from "../../../Core/Schemas/Inputs/InstructionsArgs";
import { ValidateIDInspection } from "../../../Services/ValidateArgs";
const db_instance = new ORM();

@Resolver()
export class Instructions {
  CALL_PA_INSTRUCTIONS_APP_AI<T>({
    ID_INSPECCION,
  }: {
    ID_INSPECCION: Number | undefined;
  }): Promise<Array<Array<T>>> {
    return db_instance.connection.query(
      `EXEC PA_INSTRUCTIONS_APP_AI :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      }
    ) as any;
  }

  @Query((returns) => [InstructionsSchema], { name: "Instructions" })
  async Instructions(@Args() { ID_INSPECCION }: InstructionsArg) {
    ValidateIDInspection(ID_INSPECCION);
    return ResponseSP<InstructionsSchema>(
      await this.CALL_PA_INSTRUCTIONS_APP_AI({
        ID_INSPECCION,
      })
    );
  }
}
