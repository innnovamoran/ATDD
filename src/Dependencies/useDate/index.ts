export const handleGetNumberDay = (fecha_reunion: Date) =>
  new Date(fecha_reunion).getDate() >= 10
    ? new Date(fecha_reunion).getDate().toString()
    : "0" + new Date(fecha_reunion).getDate().toString();

export const handleFormatMonthAndYearMobile = (
  reunionDate: Date,
  month: Intl.DateTimeFormatOptions,
  year: Intl.DateTimeFormatOptions
) =>
  `${reunionDate
    .toLocaleDateString("es-ES", month)
    .toUpperCase()} ${reunionDate.toLocaleDateString("es-ES", year)}`;

export const CreateDate = (date: string | number | Date) => {
  const cDate = new Date(date);
  return cDate;
};

export const FormatDateDDMMYY = (fecha: string) =>
  fecha.split("-").reverse().join("-");
