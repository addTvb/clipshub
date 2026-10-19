"use client";

import clsx from "clsx";

interface IProps {
  size?: "small" | "standard";
  color?: "light" | "dark";
  wrapperClassName?: string;
}

const sizes = {
  small: "h-5 w-5 border-[2px]",
  standard: "h-8 w-8",
};

const colors = {
  light: "border-[#d5efff]",
  dark: "border-[#0b2535]",
};

export const Spinner = ({
  size = "standard",
  wrapperClassName,
  color = "light",
}: IProps) => {
  return (
    <span
      className={clsx("flex justify-center items-center", wrapperClassName)}
    >
      <span
        className={clsx(
          "animate-spin rounded-full border-[3px] border-t-transparent border-b-transparent",
          sizes[size],
          colors[color]
        )}
      />
    </span>
  );
};
