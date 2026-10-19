import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

interface IProps {
  iconSrc?: string;
  label: string;
  value?: string | ReactNode;
  containerClass?: string;
}

export const PedestalInfoCard = ({
  iconSrc,
  label,
  value,
  containerClass,
}: IProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-0 items-center border-gray700",
        // Мобильная версия - горизонтальный layout
        "md:flex-col md:gap-[8px] md:items-center md:px-[12px] md:py-[20px]",
        "flex-row items-center justify-between px-[0] py-[8px]",
        containerClass
      )}
    >
      <div className="flex items-center gap-[4px]">
        {iconSrc && (
          <Image
            src={iconSrc}
            alt=""
            width={16}
            height={16}
            className="md:w-4 md:h-4 w-[13px] h-[13px]"
          />
        )}
        <span className="text-[11px] md:text-sm font-semibold text-gray350">{label}</span>
      </div>
      <div className="text-[12px] md:text-xl font-bold text-black-1000">{value}</div>
    </div>
  );
};
