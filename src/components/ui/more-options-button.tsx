import ThreeDotsIcon from "@icons/three-dots.svg";
import { cn } from "src/lib/utils";
import { MouseEventHandler } from "react";

interface IProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const MoreOptionsButton = ({ className, onClick }: IProps) => {
  return (
    <span
      className={cn(
        "w-[24px] h-[24px] flex items-center justify-center rounded-[6px] hover:bg-gray100 active:scale-95 transition-[background-color, transform] duration-300",
        className
      )}
      onClick={onClick}
    >
      <ThreeDotsIcon />
    </span>
  );
};

export default MoreOptionsButton;
