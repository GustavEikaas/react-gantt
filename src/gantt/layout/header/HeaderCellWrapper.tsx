import { PropsWithChildren } from "react";

type HeaderCellWrapperProps = {
  width: number;
  offset: number;
  title: string;
} & PropsWithChildren;
export function HeaderCellWrapper({
  children,
  offset,
  title,
  width,
}: HeaderCellWrapperProps) {
  return (
    <div
      title={title}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: `${width}px`,
        transform: `translateX(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}
