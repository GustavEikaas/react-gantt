import { VirtualItem } from "@tanstack/react-virtual";
import { PropsWithChildren } from "react";

type RowWrapperProps = {
  virtualItem: VirtualItem;
  onClick?: () => void;
  headerHeight: number;
} & PropsWithChildren;

export const RowWrapper = ({
  children,
  virtualItem,
  onClick,
  headerHeight,
}: RowWrapperProps) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        cursor: "pointer",
        overflowX: "hidden",
        height: `${virtualItem.size}px`,
        width: "100%",
        boxSizing: "border-box",
        borderBottom: "1px solid grey",
        transform: `translateY(${virtualItem.start + headerHeight}px)`,
      }}
    >
      {children}
    </div>
  );
};
