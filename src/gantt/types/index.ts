/** Different viewmodes applicable */
export type TimelineDimension = "week" | "month" | "year";

export type GanttData = {
  label: string;
  startDate: Date;
  duration: number;
};

export type TimelineHeader = {
  mode: TimelineDimension;
  header: HeaderItem[];
  subheader: HeaderItem[];
};
export type HeaderItem = {
  label: string;
  startDate: Date;
  endDate: Date;
  width: number;
};

/**
 * Marks a milestone/flag on the gantt canvas
 */
export type EventMarker = {
  date: Date;
  label: string;
};
