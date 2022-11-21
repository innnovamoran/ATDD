import { accesoriesArgs } from "../../Core/Schemas/Inputs/accesoriesArgs";
import { appArgs } from "../../Core/Schemas/Inputs/appArgs";
import { getInspectionArgs } from "../../Core/Schemas/Inputs/getInspectionArgs";
import {
  DamageArgs,
  DocsArgs,
  PhotoArgs,
  VideoArgs,
} from "../../Core/Schemas/Inputs/PhotoArgs";
import { featureArgs } from "../../Core/Schemas/Inputs/setFeaturesArgs";
import ORM from "../../Server/Config/DataSource";
const db_instance = new ORM();
/** reintetos de petición a query */
var retry = { max: 3 };
type StoreProcedure<T> = Promise<Array<Array<T>>>;

/** ___________Pantalla onboarding____________ */

export const CALL_PA_WELCOME_CAROUSEL = <T>({
  appname,
  appversion,
  plataform,
}: appArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_WELCOME_CAROUSEL :appname,:appversion,:plataform",
    { replacements: { appname, appversion, plataform }, retry }
  ) as any;

export const CALL_PA_STRUCTURE_CAROUSEL = <T>({
  appname,
  appversion,
  plataform,
}: appArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_STRUCTURE_CAROUSEL :appname,:appversion,:plataform",
    { replacements: { appname, appversion, plataform }, retry }
  ) as any;

/** ___________Fin - Pantalla onboarding____________ */

/** ___________Pantalla accesorios____________ */

export const CALL_PA_STEP_TWO = async <T>(
  ID_INSPECTION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STEP_TWO :ID_INSPECTION", {
    replacements: { ID_INSPECTION },
  }) as any;

export const PA_STRUCTURE_STEP_2 = async <T>(
  ID_INSPECTION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STRUCTURE_STEP_2 :ID_INSPECTION", {
    replacements: { ID_INSPECTION },
  }) as any;

export const PA_ACTUALIZA_ACCESORIOS_APP = async <T>(
  { ID_CAMPO, VALUE }: accesoriesArgs,
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_ACTUALIZA_ACCESORIOS_APP :ID_INSPECCION, :ID_CAMPO, :VALUE",
    {
      replacements: { ID_INSPECCION, ID_CAMPO, VALUE },
    }
  ) as any;

/** ___________Fin - Pantalla accesorios____________ */

/** ___________SP - Ingresar fotos videos____________ */

export const CALL_PA_INGRESA_PHOTO_STEP_3 = async <T>({
  ID_INSPECCION,
  ID_STRUCTURE_STEP_3,
  TYPE,
  LATITUE,
  LONGITUDE,
  DESCRIPTION,
  ID_PIEZA,
}: PhotoArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_INGRESA_PHOTO_STEP_3_V2 :ID_INSPECCION,:ID_STRUCTURE_STEP_3,:TYPE,:LATITUE,:LONGITUDE,:DESCRIPTION,:ID_PIEZA",
    {
      replacements: {
        ID_INSPECCION,
        ID_STRUCTURE_STEP_3,
        TYPE,
        LATITUE,
        LONGITUDE,
        DESCRIPTION,
        ID_PIEZA,
      },
    }
  ) as any;

export const CALL_PA_INGRESA_VIDEO_STEP_3 = async <T>({
  OI,
  ID_STRUCTURE_STEP_3,
  MIME,
  LATITUDE,
  LONGITUDE,
}: VideoArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_INGRESA_VIDEO_STEP_3 :OI,:ID_STRUCTURE_STEP_3,:MIME,:LATITUDE,:LONGITUDE",
    {
      replacements: {
        OI,
        ID_STRUCTURE_STEP_3,
        MIME,
        LATITUDE,
        LONGITUDE,
      },
    }
  ) as any;

export const CALL_PA_INGRESA_PHOTO_STEP_4 = async <T>({
  ID_INSPECCION,
  ID_STRUCTURE_STEP_4,
  TYPE,
  LATITUE,
  LONGITUDE,
  DESCRIPTION,
  ID_PIEZA,
}: DamageArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_INGRESA_PHOTO_STEP_3_V2 :ID_INSPECCION,:ID_STRUCTURE_STEP_4,:TYPE,:LATITUE,:LONGITUDE,:DESCRIPTION,:ID_PIEZA",
    {
      replacements: {
        ID_INSPECCION,
        ID_STRUCTURE_STEP_4,
        TYPE,
        LATITUE,
        LONGITUDE,
        DESCRIPTION,
        ID_PIEZA,
      },
    }
  ) as any;

export const CALL_PA_INGRESA_DOCUMENTS_STEP_3 = <T>({
  ID_INSPECCION,
  ID_STRUCTURE_STEP_3,
  NAME,
  TYPE,
  LATITUE,
  LONGITUDE,
}: DocsArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_INGRESA_DOCUMENTS_STEP_3 :ID_INSPECCION,:ID_STRUCTURE_STEP_3,:NAME,:TYPE,:LATITUE,:LONGITUDE",
    {
      replacements: {
        ID_INSPECCION,
        ID_STRUCTURE_STEP_3,
        NAME,
        TYPE,
        LATITUE,
        LONGITUDE,
      },
    }
  ) as any;

/** ___________Fin - SP - Ingresar fotos videos____________ */

/** ___________SP - Pantalla finalizar inspección____________ */

export const CALL_PA_STEP_FIVE = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STEP_FIVE :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_CONDITIONS_STEP_5 = <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_CONDITIONS_STEP_5 :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_STRUCTURE_STEP_5 = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STRUCTURE_STEP_5 :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_FINISH_INSPECTION_APP_AI = async <T>(
  ID_INSPECCION: Number,
  EMAIL: String
): StoreProcedure<T> => {
  return db_instance.connection.query(
    "EXEC PA_FINISH_INSPECTION_APP_AI  :ID_INSPECCION, :EMAIL",
    {
      replacements: {
        ID_INSPECCION,
        EMAIL,
      },
    }
  ) as any;
};

/** ___________Fin - SP - Pantalla finalizar inspección____________ */

/** ___________SP - Pantalla evaluación____________ */

export const CALL_PA_STEP_SIX = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STEP_SIX :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_LIST_INFOR_STRUCTURE_STEP_6 = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_LIST_INFOR_STRUCTURE_STEP_6 :ID_INSPECCION",
    {
      replacements: { ID_INSPECCION },
    }
  ) as any;

export const CALL_PA_DESCIPTIONS_STRUCTURE_STEP_6 = <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_DESCIPTIONS_STRUCTURE_STEP_6 :ID_INSPECCION",
    {
      replacements: { ID_INSPECCION },
    }
  ) as any;

/** ___________Fin - SP - Pantalla evaluación____________ */

/** ___________SP - Pantalla caracteristicas____________ */

export const CALL_PA_STEP_ONE = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(`EXEC PA_STEP_ONE :ID_INSPECCION`, {
    replacements: {
      ID_INSPECCION,
    },
  }) as any;

export const CALL_PA_STRUCTURE_STEP_1 = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(`EXEC PA_STRUCTURE_STEP_1 :ID_INSPECCION`, {
    replacements: {
      ID_INSPECCION,
    },
  }) as any;

export const CAL_PA_OPTIONS_STRUCTURE_STEP_1 = <T>(
  ID_STRUCTURE_STEP_1: Number,
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    `EXEC PA_OPTIONS_STRUCTURE_STEP_1 :ID_STRUCTURE_STEP_1, :ID_INSPECCION`,
    {
      replacements: {
        ID_STRUCTURE_STEP_1,
        ID_INSPECCION,
      },
    }
  ) as any;

export const CALL_PA_ACTUALIZA_CARACTERISTICAS_APP = async <T>(
  ID_INSPECCION: Number,
  { ID_CAMPO, VALUE }: featureArgs
): StoreProcedure<T> =>
  db_instance.connection.query(
    `EXEC PA_ACTUALIZA_CARACTERISTICAS_APP :ID_INSPECCION, :ID_CAMPO, :VALUE`,
    {
      replacements: {
        ID_INSPECCION,
        ID_CAMPO,
        VALUE,
      },
    }
  ) as any;

/** ___________Fin - SP - Pantalla caracteristicas____________ */

/** ___________SP - Pantalla login____________ */

export const CALL_PA_LOGIN_AI_V2 = async <T>({
  APPNAME,
  APPVERSION,
  INTERNET_PROVIDER,
  PATENTE,
  PHONE_BRAND,
  PHONE_MODEL,
  PHONE_SO,
  PLATAFORM,
  RUT,
  TOKEN_FIREBASE,
}: getInspectionArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    `EXEC PA_LOGIN_AI_V2 :RUT,:PATENTE,:PHONE_MODEL,:PHONE_BRAND,:PHONE_SO,:INTERNET_PROVIDER,:TOKEN_FIREBASE,:APPNAME,:APPVERSION,:PLATAFORM`,
    {
      replacements: {
        RUT,
        PATENTE,
        PHONE_MODEL,
        PHONE_BRAND,
        PHONE_SO,
        INTERNET_PROVIDER,
        TOKEN_FIREBASE,
        APPNAME,
        APPVERSION,
        PLATAFORM,
      },
    }
  ) as any;

export const CALL_PA_THEME = async <T>(
  ID_INSPECCION: Number,
  {
    appname,
    appversion,
    plataform
  }: appArgs): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_THEME_APP_AI :ID_INSPECCION,:appname,:appversion,:plataform", {
    replacements: {
      ID_INSPECCION,
      appname,
      appversion,
      plataform
    },
  }) as any;

export const CALL_PA_TEXT_LOGIN_APP_AI = async <T>({
  appname,
  appversion,
  plataform,
}: appArgs): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_TEXT_LOGIN_APP_AI :appname,:appversion,:plataform",
    { replacements: { appname, appversion, plataform }, retry }
  ) as any;

/** ___________Fin - SP - Pantalla login____________ */

/** ___________SP - Pantalla instucciones____________ */

export const CALL_PA_INSTRUCTIONS_APP_AI = async <T>({
  ID_INSPECCION,
}: {
  ID_INSPECCION: Number;
}): StoreProcedure<T> =>
  db_instance.connection.query(`EXEC PA_INSTRUCTIONS_APP_AI :ID_INSPECCION`, {
    replacements: {
      ID_INSPECCION,
    },
  }) as any;

/** ___________Fin - SP - Pantalla instrucciones____________ */

/** ___________SP - Pantalla fotos requeridas____________ */

export const CALL_PA_STEP_THREE = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STEP_THREE :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_STRUCTURE_STEP_3 = async <T>(
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query("EXEC PA_STRUCTURE_STEP_3 :ID_INSPECCION", {
    replacements: { ID_INSPECCION },
  }) as any;

export const CALL_PA_VALIDATIONS_STEP_3 = async <T>(
  ID_STRUCTURE_STEP_3: Number,
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_VALIDATIONS_STEP_3 :ID_STRUCTURE_STEP_3, :ID_INSPECCION",
    {
      replacements: { ID_STRUCTURE_STEP_3, ID_INSPECCION },
    }
  ) as any;

export const CALL_PA_WARNING_STEP_3 = async <T>(
  ID_STRUCTURE_STEP_3: Number,
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_WARNING_STEP_3 :ID_STRUCTURE_STEP_3, :ID_INSPECCION",
    {
      replacements: { ID_STRUCTURE_STEP_3, ID_INSPECCION },
    }
  ) as any;

export const CALL_PA_CONFIG_SCREEEN_HELP_STEP_3 = async <T>(
  ID_STRUCTURE_STEP_3: Number,
  ID_INSPECCION: Number
): StoreProcedure<T> =>
  db_instance.connection.query(
    "EXEC PA_CONFIG_SCREEEN_HELP_STEP_3 :ID_INSPECCION, :ID_STRUCTURE_STEP_3",
    {
      replacements: { ID_STRUCTURE_STEP_3, ID_INSPECCION },
    }
  ) as any;

/** ___________Fin - SP - Pantalla fotos requeridas____________ */

/** ___________SP - Pantalla resumen____________ */

export const CALL_PA_TEXT_INICIO_AI = async <T>({
  appname,
  appversion,
  plataform,
}: appArgs): StoreProcedure<T> =>
  db_instance.connection.query(
    "PA_TEXT_INICIO_AI :appname,:appversion,:plataform",
    { replacements: { appname, appversion, plataform }, retry }
  ) as any;

/** ___________Fin - SP - Pantalla resumen____________ */

/** ___________SP - Pantalla daños____________ */

export const CALL_PA_STEP_FOUR = async <T>(
  ID_INSPECTION: Number
): StoreProcedure<T> => {
  return db_instance.connection.query("EXEC PA_STEP_FOUR :ID_INSPECTION", {
    replacements: { ID_INSPECTION },
  }) as any;
};

export const CALL_PA_STRUCTURE_STEP_4 = async <T>(
  ID_INSPECTION: Number
): StoreProcedure<T> => {
  return db_instance.connection.query(
    "EXEC PA_STRUCTURE_STEP_4 :ID_INSPECTION",
    {
      replacements: { ID_INSPECTION },
    }
  ) as any;
};

export const CALL_PA_ELEMENTS_STRUCTURE_STEP_4 = async <T>(
  ID_INSPECCION: Number,
  ID_STRUCTURE_STEP_4: Number
): StoreProcedure<T> => {
  return db_instance.connection.query(
    "EXEC PA_ELEMENTS_STRUCTURE_STEP_4  :ID_INSPECCION, :ID_STRUCTURE_STEP_4",
    {
      replacements: {
        ID_INSPECCION,
        ID_STRUCTURE_STEP_4,
      },
    }
  ) as any;
};

/** ___________Fin - SP - Pantalla daños____________ */