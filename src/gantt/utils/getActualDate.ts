import { TimelineDimension } from "../types";
import {
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfMonth,
  endOfYear,
  endOfWeek,
} from "date-fns";

export function getActualStart(date: Date, dim: TimelineDimension) {
  switch (dim) {
    case "month":
      return startOfMonth(date);

    case "week":
      return startOfWeek(date);

    case "year":
      return startOfYear(date);
  }
}
export function getActualEnd(date: Date, dim: TimelineDimension) {
  switch (dim) {
    case "month":
      return endOfMonth(date);

    case "week":
      return endOfWeek(date);

    case "year":
      return endOfYear(date);
  }
}
