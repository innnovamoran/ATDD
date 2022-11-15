export function ValidateResponseSP<T>(sp: Array<Array<T>>): T {
  if (sp.length > 0 && sp[0].length > 0) {
    return sp[0][0];
  } else {
    throw new Error("Error en descomponer respuesta de SP"); // mejorar mensaje de error
  }
}
