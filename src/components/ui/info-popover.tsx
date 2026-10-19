import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import InfoPopoverIcon from "@icons/info-popover-icon.svg";
import HowItWorksIcon from "@icons/how-it-works-icon.svg";
import clsx from "clsx";

interface IProps {
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  icon?: "info" | "question";
  contentOffset?: number;
}

export const InfoPopover = ({
  children,
  triggerClassName,
  contentClassName,
  iconClassName,
  icon = "info",
  contentOffset = 5,
}: IProps) => {
  return (
    <Popover>
      <PopoverTrigger className={clsx(triggerClassName)}>
        {icon === "info" ? (
          <InfoPopoverIcon className={clsx("w-[20px] h-[20px] transition-colors duration-300", iconClassName || "text-gray600 hover:text-textColor")} />
        ) : (
          <HowItWorksIcon className={clsx("w-[20px] h-[20px] transition-colors duration-300", iconClassName || "text-gray600 hover:text-textColor")} />
        )}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={contentOffset}
        className={clsx(
          "text-gray400 text-sm font-medium p-[10px] max-w-[336px] w-full",
          contentClassName
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
