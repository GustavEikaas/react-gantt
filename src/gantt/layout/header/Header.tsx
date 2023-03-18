import { useVirtualizer } from "@tanstack/react-virtual";
import styled from "styled-components";
import { TimelineDimension } from "../../types";
import { generateHeaders } from "../../utils/generateHeaders";
import { HeaderCell } from "./HeaderCell";

export type GanttHeaderProps = {
  startDate: Date;
  endDate: Date;
  mode: TimelineDimension;
  tickSize: number;
  getScrollElement: () => HTMLElement | null;
};

export const Header = ({
  getScrollElement,
  endDate,
  tickSize,
  mode,
  startDate,
}: GanttHeaderProps) => {
  const { header, subheader } = generateHeaders(startDate, endDate, mode);

  /** handle ticks here and do some magic when rendering */
  const topHeader = useVirtualizer({
    count: header.length,
    estimateSize: (index) => header[index].width * tickSize,
    getScrollElement,
    horizontal: true,
    overscan: 1,
  });

  const subHeaderVirtualizer = useVirtualizer({
    count: subheader.length,
    estimateSize: (index) => subheader[index].width * tickSize,
    horizontal: true,
    overscan: 1,
    getScrollElement,
  });

  const { getTotalSize } = topHeader;

  return (
    <StickyHeader width={getTotalSize()}>
      {topHeader.getVirtualItems().map(({ size, index, key, start }) => {
        const item = header[index];
        return (
          <HeaderCell
            offset={0}
            item={item}
            size={size}
            start={start}
            key={key}
          />
        );
      })}
      {subHeaderVirtualizer
        .getVirtualItems()
        .map(({ size, index, key, start }) => {
          const item = subheader[index];
          return (
            <HeaderCell
              offset={25}
              item={item}
              size={size}
              start={start}
              key={key}
            />
          );
        })}
    </StickyHeader>
  );
};

const StickyHeader = styled.div<{ width: number }>`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  width: ${({ width }) => `${width}px`};
  height: 50px;
  background: lightgray;
  color: black;
`;
