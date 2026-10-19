"use client";

import clsx from "clsx";
import { Spinner } from "./spinner";

interface IProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SpinnerBlock = ({ width, height, className }: IProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-[300px] rounded-[8px] bg-white200",
        className
      )}
      style={{ width: width, height: height }}
    >
      <Spinner color="dark" />
    </div>
  );
};
