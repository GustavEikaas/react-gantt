import { differenceInDays } from "date-fns";
import { useMemo } from "react";
import styled from "styled-components";
import { EventMarker } from "../../types";

type EventMarkerProps = {
  projectStart: Date;
  tickSize: number;
  isScrolling: boolean;
  yStartIndex: number;
  height: number;
  rowHeight: number;
} & EventMarker;

export function EventMarker({
  date,
  label,
  projectStart,
  tickSize,
  isScrolling,
  height,
  yStartIndex,
  rowHeight,
}: EventMarkerProps) {
  const left = useMemo(
    () => differenceInDays(date, projectStart) * tickSize,
    [projectStart, date, tickSize]
  );

  return (
    <StyledEventMarker left={left}>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: (yStartIndex + 1) * rowHeight + 200,
          height: 20,
          display: "flex",
          alignItems: "center",
          padding: "5px 20px",
          borderRadius: "3px",
          background: "red",
        }}
      >
        {label}
      </div>
    </StyledEventMarker>
  );
}

const StyledEventMarker = styled.div<{ left: number }>`
  position: absolute;
  top: 50;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: ${({ left }) => `${left}px`};
  height: 100%;
  border-left: 1px dotted red;
  z-index: 1;
  white-space: nowrap;

  &:hover {
    border-left: 5px dotted red;
  }
`;
