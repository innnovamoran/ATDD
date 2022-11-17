import { accesoriesArgs } from "../../Core/Schemas/Inputs/accesoriesArgs";
import ORM from "../../Server/Config/DataSource";
const db_instance = new ORM();

export const CALL_PA_STEP_TWO = async <T>(
  ID_INSPECTION: Number
): Promise<Array<Array<T>>> =>
  db_instance.connection.query("EXEC PA_STEP_TWO :ID_INSPECTION", {
    replacements: { ID_INSPECTION },
  }) as any;

export const PA_STRUCTURE_STEP_2 = async <T>(
  ID_INSPECTION: Number
): Promise<Array<Array<T>>> =>
  db_instance.connection.query("EXEC PA_STRUCTURE_STEP_2 :ID_INSPECTION", {
    replacements: { ID_INSPECTION },
  }) as any;

export const PA_ACTUALIZA_ACCESORIOS_APP = async <T>(
  { ID_CAMPO, VALUE }: accesoriesArgs,
  ID_INSPECCION: Number
): Promise<Array<Array<T>>> =>
  db_instance.connection.query(
    "EXEC PA_ACTUALIZA_ACCESORIOS_APP :ID_INSPECCION, :ID_CAMPO, :VALUE",
    {
      replacements: { ID_INSPECCION, ID_CAMPO, VALUE },
    }
  ) as any;
