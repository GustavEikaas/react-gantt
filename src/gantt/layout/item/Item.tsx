import { addDays } from "date-fns";
import { tokens } from "../../tokens/tokens";
import { GanttData } from "../../types";

type ItemProps = {
  item: GanttData;
  height: number;
};
export const GanttTask = ({ item, height }: ItemProps) => {
  return (
    <div
      title={`${item.startDate.toDateString()} - ${addDays(
        item.startDate,
        item.duration
      ).toDateString()}`}
      style={{
        background: tokens.interactive_primary,
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        borderRadius: "20px",
        height: `${height}px`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {item.label}
    </div>
  );
};
