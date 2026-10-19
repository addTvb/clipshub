"use client";

import clsx from "clsx";

interface Segment {
  value: number;
  color: string;
}

interface IProps {
  segments: Segment[];
  max?: number;
  className?: string;
}

export const Progress = ({ segments, max = 0, className }: IProps) => {
  const calculateWidth = (value: number) => {
    if (!max || max <= 0) return 0;
    return (Math.min(Math.max(value, 0), max) / max) * 100;
  };

  return (
    <div
      className={clsx(
        "w-full h-[6px] rounded-full bg-[#DFE3EA] overflow-hidden flex",
        className
      )}
    >
      {segments.map((segment, index) => (
        <div
          key={index}
          className="h-full transition-all duration-300"
          style={{
            width: `${calculateWidth(segment.value)}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  );
};
