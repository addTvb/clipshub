import clsx from "clsx";
import Image from "next/image";
import { ReactNode, FC } from "react";

// Пути к иконкам
const ICONS = {
  link: "/static/icons/link.svg",
  eye: "/static/icons/eye-gray.svg",
  dollar: "/static/icons/dollar-coin-blue.svg",
  reserved: "/static/icons/reserved.svg",
  web: "/static/icons/web-gray.svg",
  cpm: "/static/icons/cpm.svg",
  calendar: "/static/icons/calendar.svg",
  arrowRight: "/static/icons/arrow-right-black.svg",
  category: "/static/images/categories/1.svg",
  categoryInfluencer: "/static/icons/category-influencer.svg",
  time: "/static/icons/lifetime.svg",
  language: "/static/icons/location-pin-blue.svg",
  questionCircle: "/static/icons/question-circle.svg",
  reward: "/static/icons/reward.svg",
  settings: "/static/icons/settings.svg",
};

// Типы доступных иконок
export type IconName = keyof typeof ICONS;

interface OfferStatBlockProps {
  iconName: IconName;
  label: string;
  value?: string;
  children?: ReactNode;
  className?: string;
}

const OfferStatBlock: FC<OfferStatBlockProps> = ({
  iconName,
  label,
  value,
  children,
  className = "",
}) => (
  <div
    className={clsx(
      "flex flex-col gap-[8px] min-w-[162px] max-[400px]:min-w-full",
      className
    )}
  >
    <div className="flex items-center gap-[4px] text-gray400 text-[14px] font-[600]">
      <Image
        src={ICONS[iconName]}
        alt={label}
        width={18}
        height={18}
        className="size-[18px]"
      />
      {label}
    </div>
    <div className="text-[14px] font-[500] line-clamp-2 font-[Inter]">
      {children || value}
    </div>
  </div>
);

export default OfferStatBlock;
