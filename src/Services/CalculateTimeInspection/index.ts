import { CreateDate } from "../../Dependencies/useDate";
import { ContextLET } from "../../Server";

const transformToSeconds = (time: Number) => Number(time) / 1000;

const transformToMinutes = (time: Number) => Number(time) / 60;
export const CalculateTimeInspection = (ctx: ContextLET) => {
  if (typeof ctx.inspection === "undefined") {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  const defaultSeconds = 59;

  const { END_DATE, TIME_INSPECTION } = ctx.inspection;

  const TotalMinutesInspection = transformToMinutes(
    transformToSeconds(TIME_INSPECTION)
  );

  const currentDate = CreateDate(new Date(Date.now()));
  const ExpirationDate = CreateDate(Number(END_DATE));

  const getDiffMinutes = () =>
    ExpirationDate.getMinutes() - currentDate.getMinutes();

  const getDiffSeconds = () =>
    currentDate.getSeconds() === 0
      ? defaultSeconds
      : defaultSeconds - currentDate.getSeconds();

  return {
    minutes: TotalMinutesInspection + getDiffMinutes(),
    seconds: getDiffSeconds(),
  };
};
