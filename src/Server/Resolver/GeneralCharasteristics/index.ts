import { Args, Query, Resolver } from "type-graphql";
import { GerenalCharasteristicsArgs } from "../../../Core/Schemas/GerenalCharasteristicsArgs";
import { OptionsStructureStepOneSchema } from "../../../Core/Schemas/OptionsStructureStepOne";
import { StepOneSchema } from "../../../Core/Schemas/StepOne";
import { StructureGeneralCharasteristics } from "../../../Core/Schemas/StructureGeneralCharasteristics";
import { StructureStepOneSchema } from "../../../Core/Schemas/StructureStepOne";

import ORM from "../../Config/DataSource";
const db_instance = new ORM();

@Resolver()
export class GeneralCharasteristics {
  spStepOne = async (ID_INSPECCION: Number): Promise<StepOneSchema> => {
    const response = await db_instance.connection.query(
      `EXEC PA_STEP_ONE :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      });
    // console.log("response spStepOne:", response);
    return response[0][0] as StepOneSchema;
  };

  spStructureStepOne = async (ID_INSPECCION: Number): Promise<Array<StructureStepOneSchema>> => {
    const response = await db_instance.connection.query(
      `EXEC PA_STRUCTURE_STEP_1 :ID_INSPECCION`,
      {
        replacements: {
          ID_INSPECCION,
        },
      });
    // console.log("response", response);
    return response[0] as [StructureStepOneSchema];
  }

  spOptionsStructureStepOne = async (ID_STRUCTURE_STEP_1: Number, ID_INSPECCION: Number): Promise<OptionsStructureStepOneSchema[]> => { //OptionsStructrureStepOneSchema
    const response = await db_instance.connection.query(
      `EXEC PA_OPTIONS_STRUCTURE_STEP_1 :ID_STRUCTURE_STEP_1, :ID_INSPECCION`,
      {
        replacements: {
          ID_STRUCTURE_STEP_1,
          ID_INSPECCION,
        },
      }
    );
    // console.log("response", response[0]);
    return response[0] as OptionsStructureStepOneSchema[];
  }

  buildOptionsStructureStepOne = async (ID_INSPECCION: Number, spStructureStepOne: Number[]): Promise<StructureGeneralCharasteristics> => {
    const structureOptions = spStructureStepOne.map(async (id: Number) => {
      const response = await this.spOptionsStructureStepOne(id, ID_INSPECCION);
      // console.log("response", response);
      return {
        
      } as StructureGeneralCharasteristics;
    });
  }
  

  @Query((returns) => String, { name: "GeneralCharasteristics" })
  async GeneralCharasteristics(
    @Args() {
      ID_INSPECCION
    }: GerenalCharasteristicsArgs
  ) {
    const porDefinir = await Promise.all(
      await this.buildOptionsStructureStepOne(
        ID_INSPECCION, 
        (await this.spStructureStepOne(ID_INSPECCION)).map(item =>item.id)
      )
    );
    // console.log("porDefinir", porDefinir);

    // console.log("PROMESAS CUMPLIDAS___________________:", x);

    return "{ ...head, structure: body }" as String;
  }
}

