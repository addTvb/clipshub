import { memo } from "react";
import "./CrownSparkles.css";
import clsx from "clsx";

interface IProps {
  className?: string;
  scale?: number;
  containerClassName?: string;
  color?: string;
}

export const CrownSparkles = memo(
  ({ color = "#ffffff", className, scale = 1, containerClassName }: IProps) => {
    const baseTopStarSize = 22;
    const baseLeftStarSize = 16;
    const baseDotSize = 6;

    const baseTopStarLeft = 8;
    const baseLeftStarTop = 20;
    const baseDotTop = 24;
    const baseDotLeft = 28;

    const topStarSize = baseTopStarSize * scale;
    const leftStarSize = baseLeftStarSize * scale;
    const dotSize = baseDotSize * scale;
    const topStarLeft = baseTopStarLeft * scale;
    const leftStarTop = baseLeftStarTop * scale;
    const dotTop = baseDotTop * scale;
    const dotLeft = baseDotLeft * scale;

    return (
      <div className={clsx("absolute", containerClassName, className)}>
        <svg
          className="crown-sparkle-1 absolute top-0"
          width={`${topStarSize}px`}
          height={`${topStarSize}px`}
          viewBox="0 0 22 22"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{ left: `${topStarLeft}px` }}
        >
          <polygon
            fill={color}
            points="10.998167 0 7.25512415 7.09866667 0 10.8826667 7.25512415 14.9013333 10.998167 22 14.9758374 14.9013333 22 10.8826667 14.9758374 7.09866667"
          />
        </svg>

        <svg
          className="crown-sparkle-2 absolute left-0"
          width={`${leftStarSize}px`}
          height={`${leftStarSize}px`}
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{ top: `${leftStarTop}px` }}
        >
          <polygon
            fill={color}
            points="7.99866689 0 5.27645392 5.16266667 0 7.91466667 5.27645392 10.8373333 7.99866689 16 10.8915181 10.8373333 16 7.91466667 10.8915181 5.16266667"
          />
        </svg>

        <svg
          className="crown-dot-1 absolute"
          width={dotSize}
          height={dotSize}
          style={{ top: `${dotTop}px`, left: `${dotLeft}px` }}
        >
          <circle
            cx={dotSize / 2}
            cy={dotSize / 2}
            r={dotSize / 2}
            fill={color}
          />
        </svg>
      </div>
    );
  }
);
CrownSparkles.displayName = "CrownSparkles";
