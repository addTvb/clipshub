import React, { memo, ReactNode } from "react";
import WarningBlueIcon from "@icons/warning_notification-blue.svg";
import clsx from "clsx";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const HintLabel = memo(({ children, className }: IProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-[8px] py-[8px] px-[10px] text-gray400 text-sm font-medium rounded-[8px] bg-white50",
        className
      )}
    >
      <WarningBlueIcon className="size-[24px] flex-none" />
      <span>{children}</span>
    </div>
  );
});
HintLabel.displayName = "HintLabel";
