import { differenceInDays } from "date-fns";
import { GanttData } from "../types";

/**Scrolls a gantt task into view */
export function scrollItemIntoView(
  el: HTMLDivElement | null,
  item: GanttData,
  startDate: Date,
  tickSize: number
) {
  console.log(el);
  if (!el) return;
  el.scrollTo({
    left: (differenceInDays(item.startDate, startDate) + 1) * tickSize - 20,
  });
}
