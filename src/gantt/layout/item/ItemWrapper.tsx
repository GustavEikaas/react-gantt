import { differenceInDays } from "date-fns";
import { useMemo } from "react";
import { GanttData } from "../../types";
import { GanttTask } from "./Item";

type ItemWrapperProps = {
  data: GanttData;
  startDate: Date;
  tickSize: number;
  height: number;
};
export const ItemWrapper = ({
  data,
  startDate,
  tickSize,
  height,
}: ItemWrapperProps) => {
  const left = useMemo(
    () => differenceInDays(data.startDate, startDate) * tickSize,
    [data, startDate, tickSize]
  );

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          left: left,
          height: "100%",
          width: `${data.duration * tickSize}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("item clicked");
        }}
      >
        <GanttTask height={height} item={data} />
      </div>
    </>
  );
};
