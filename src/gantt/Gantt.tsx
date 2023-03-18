import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { RowWrapper } from "./layout/row/RowWrapper";
import { Header } from "./layout/header/Header";
import { GanttData, TimelineDimension } from "./types";
import { getActualEnd, getActualStart } from "./utils/getActualDate";
import { differenceInDays } from "date-fns";
import { scrollItemIntoView } from "./utils/scroll";
import { VirtualContainer } from "./layout/container/VirtualContainer";
import { ItemWrapper } from "./layout/item/ItemWrapper";

type GanttProps = {
  projectStart: Date;
  projectEnd: Date;
  data: GanttData[];
};

function getTickSize(mode: TimelineDimension) {
  switch (mode) {
    case "week":
      return 30;
    default:
      return 10;
  }
}

export function Gantt({ data, ...props }: GanttProps) {
  const [rowHeight] = useState(30);

  const [mode] = useState<TimelineDimension>("week");

  const tickSize = getTickSize(mode);

  const startDate = getActualStart(props.projectStart, mode);
  const endDate = getActualEnd(props.projectEnd, mode);
  const totalTicks = differenceInDays(endDate, startDate);
  const containerWidth = totalTicks * tickSize;

  const parentRef = useRef<HTMLDivElement | null>(null);

  const { getTotalSize, getVirtualItems } = useVirtualizer({
    count: data.length,
    estimateSize: () => rowHeight,
    getScrollElement: () => parentRef.current,
    overscan: 3,
  });

  return (
    <VirtualContainer ref={parentRef} id="scroll_container">
      <div
        style={{
          height: `${getTotalSize()}px`,
          width: `${containerWidth}px`,
          position: "relative",
        }}
      >
        <Header
          endDate={endDate}
          mode={mode}
          tickSize={tickSize}
          startDate={startDate}
          getScrollElement={() => parentRef.current}
        />
        {getVirtualItems().map((virtualItem) => (
          <RowWrapper
            headerHeight={50}
            key={virtualItem.key}
            virtualItem={virtualItem}
            onClick={() => {
              scrollItemIntoView(
                parentRef.current,
                data[virtualItem.index],
                startDate,
                tickSize
              );
              //TODO: Scroll to item
              console.log("row clicked");
            }}
          >
            <ItemWrapper
              height={rowHeight / 2}
              tickSize={tickSize}
              startDate={startDate}
              data={data[virtualItem.index]}
            />
          </RowWrapper>
        ))}
      </div>
    </VirtualContainer>
  );
}
