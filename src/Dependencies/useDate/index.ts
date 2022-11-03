import { CalendarRequest } from "../../Core/Schemas/CalendarRequest";

export const handleSelectCurrentDate = ({
  calendar,
  currentDate,
}: {
  calendar: CalendarRequest[];
  currentDate: number;
}) =>
  calendar.find((calendar) => {
    const date = CreateDate(calendar.fecha_reunion);
    const date2 = CreateDate(currentDate);
    return date.getTime() === date2.getTime() && calendar.carreras;
  });

export const handleSelectDateFuture = ({
  calendar,
  currentDate,
}: {
  calendar: CalendarRequest[];
  currentDate: number;
}) =>
  calendar.find((calendar) => {
    const date = CreateDate(calendar.fecha_reunion);
    const date2 = CreateDate(currentDate);
    return date.getTime() > date2.getTime() && calendar.carreras;
  });

export const handleSelectDatePast = ({
  calendar,
  currentDate,
}: {
  calendar: CalendarRequest[];
  currentDate: number;
}) =>
  calendar.reverse().find((calendar) => {
    const date = CreateDate(calendar.fecha_reunion);
    const date2 = CreateDate(currentDate);
    return date.getTime() < date2.getTime() && calendar.carreras;
  });

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
  cDate.setHours(0, 0, 0, 0);
  return cDate;
};

export const FormatDateDDMMYY = (fecha: string) =>
  fecha.split("-").reverse().join("-");
