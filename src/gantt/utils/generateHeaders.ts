import {
  differenceInWeeks,
  differenceInDays,
  addDays,
  getDay,
  addWeeks,
  startOfWeek,
  endOfWeek,
  getWeek,
  daysInWeek,
} from "date-fns";
import { SHORT_DAYS, MONTHS } from "../consts/const";
import { HeaderItem, TimelineDimension, TimelineHeader } from "../types";

export function generateHeaders(
  startDate: Date,
  endDate: Date,
  mode: TimelineDimension
): TimelineHeader {
  switch (mode) {
    case "week":
      return {
        mode: "week",
        header: generateWeekHeader(
          startDate,
          differenceInWeeks(endDate, startDate) + 1
        ),
        subheader: generateDayHeader(startDate, endDate),
      };
  }
  throw new Error("Unsupported dimension");
}

function generateDayHeader(startDate: Date, endDate: Date): HeaderItem[] {
  const span = differenceInDays(endDate, startDate);

  return new Array(span).fill(0).map((_, i) => {
    const day = addDays(startDate, i);

    return {
      endDate: day,
      label: SHORT_DAYS[getDay(day)],
      startDate: day,
      width: 1,
    };
  });
}

function generateWeekHeader(startDate: Date, weeks: number): HeaderItem[] {
  return new Array(weeks).fill(0).map((_, i) => {
    const weekDate = addWeeks(startDate, i);
    return {
      startDate: startOfWeek(weekDate),
      endDate: endOfWeek(weekDate),
      label: `${weekDate.getFullYear()} ${
        MONTHS[weekDate.getMonth()]
      } ${getWeek(weekDate)}`,
      width: daysInWeek,
    };
  });
}
