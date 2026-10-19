import clsx from "clsx";
import Image from "next/image";

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  duration?: number;
}

export const RotateGear = ({
  className,
  style,
  size = 366,
  duration = 40,
}: IProps) => {
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 size-[366px] translate-x-[40%] translate-y-[-40%]",
        className
      )}
      style={{ ...style, width: size, height: size }}
    >
      <Image
        src="/static/images/banner-gear.svg"
        alt="reward icon"
        width={366}
        height={366}
        className="w-full h-full object-contain animate-spin"
        style={{
          animationDuration: `${duration}s`,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
      />
    </div>
  );
};
