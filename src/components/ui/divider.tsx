import clsx from "clsx";
import { memo } from "react";

interface IProps {
  vertical?: boolean;
  dashed?: boolean;
  color?: string;
  className?: string;
}

export const Divider = memo(
  ({ vertical, dashed, color, className }: IProps) => {
    if (vertical)
      return (
        <div
          className={clsx(
            "w-[1px] h-full border-l border-[#DFE3EA]",
            dashed && "border-dashed",
            color && `border-[${color}]`,
            className
          )}
        />
      );

    return (
      <div
        className={clsx(
          "w-full h-[1px] border-t border-[#DFE3EA]",
          dashed && "border-dashed",
          color && `border-[${color}]`,
          className
        )}
      />
    );
  }
);
Divider.displayName = "Divider";
