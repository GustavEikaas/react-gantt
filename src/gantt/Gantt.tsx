import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { RowWrapper } from "./layout/row/RowWrapper";
import { Header } from "./layout/header/Header";
import { EventMarker, GanttData, TimelineDimension } from "./types";
import { getActualEnd, getActualStart } from "./utils/getActualDate";
import { addDays, differenceInDays } from "date-fns";
import { scrollItemIntoView } from "./utils/scroll";
import { VirtualContainer } from "./layout/container/VirtualContainer";
import { ItemWrapper } from "./layout/item/ItemWrapper";
import { EventMarker as EventFlag } from "./components/markers/EventMarker";

type GanttProps = {
  projectStart: Date;
  projectEnd: Date;
  data: GanttData[];
  markers?: EventMarker[];
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
  const markers = props.markers ?? [
    { date: addDays(new Date(), 12), label: "Project start" },
  ];
  const [rowHeight] = useState(30);

  const [mode] = useState<TimelineDimension>("week");

  const tickSize = getTickSize(mode);

  const startDate = getActualStart(props.projectStart, mode);
  const endDate = getActualEnd(props.projectEnd, mode);
  const totalTicks = differenceInDays(endDate, startDate);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const { getTotalSize, getVirtualItems, isScrolling } = useVirtualizer({
    count: data.length,
    estimateSize: () => rowHeight,
    getScrollElement: () => parentRef.current,
    overscan: 3,
  });
  const containerHeight = getTotalSize();
  const containerWidth = totalTicks * tickSize;
  return (
    <VirtualContainer ref={parentRef} id="scroll_container">
      <div
        style={{
          height: `${containerHeight}px`,
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
        {markers.map((s) => (
          <EventFlag
            {...s}
            key={s.date.getTime()}
            projectStart={startDate}
            height={containerHeight}
            rowHeight={rowHeight}
            tickSize={tickSize}
            isScrolling={isScrolling}
            yStartIndex={Math.min(...getVirtualItems().map((s) => s.index))}
          />
        ))}
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
