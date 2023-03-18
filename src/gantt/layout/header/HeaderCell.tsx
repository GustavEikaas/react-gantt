import { subDays } from "date-fns";
import { HeaderItem } from "../../types";

type HeaderCellProps = {
  item: HeaderItem;
  size: number;
  start: number;
  offset: number;
};
export function HeaderCell({ item, size, start, offset }: HeaderCellProps) {
  return (
    <div
      title={getHeaderTitle(item)}
      style={{
        position: "absolute",
        top: offset,
        left: 0,
        display: "flex",
        justifyContent: "center",
        width: `${size}px`,
        height: "25px",
        transform: `translateX(${start}px)`,
        borderRight: "1px solid black",
        boxSizing: "border-box",
      }}
    >
      {item.label}
    </div>
  );
}

function getHeaderTitle(item: HeaderItem) {
  if (item.startDate === item.endDate) {
    return `${item.startDate.toDateString()}`;
  }
  return `${subDays(
    item.startDate,
    1
  ).toDateString()} - ${item.endDate.toDateString()}`;
}
