import excelJS from "exceljs";
import { LOG_ERROR } from "../../Core/Schemas/HandleLogError";

type Params = {
  data: any[];
  file_name: string;
  headers: any;
};
export const generateExcel = async ({ data, file_name, headers }: Params) => {
  try {
    const columns = Object.keys(headers).map((key) => {
      // ASIGNA ESTRUCTURA DE COLUMNAS
      return {
        header: headers[key],
        key: key,
        width: key.length * 2,
      };
    });

    const workbook = new excelJS.Workbook(); // CREA UN LIBRO EXCEL
    const worksheet = workbook.addWorksheet("Registros"); // AÑADE HOJA AL LIBRO EXCEL
    const path = "../../../files"; // RUTA DONDE SE CREA EXCEL
    worksheet.columns = columns; // ASIGNA COLUMNAS AL EXCEL

    data.forEach((object) => {
      worksheet.addRow(object); // AÑADE FILAS
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }; // ENNEGRECE PRIMERA FILA
    });
    await workbook.xlsx.writeFile(`${path}/${file_name}.xlsx`); // GUARDA ARCHIVO
    return `${path}/${file_name}.xlsx`;
  } catch (error: any) {
    LOG_ERROR({
      function_name: "[generateExcel]",
      message: error.message,
    });
    return new Error(error.message);
  }
};
