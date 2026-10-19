import clsx from "clsx";
import { useTranslations } from "next-intl";
import { OfferLevel } from "src/types/base";

interface IProps {
  level: OfferLevel;
}

const levelBgColors = {
  easy: "bg-[#51ebbd33]",
  medium: "bg-[#fbb85333]",
  hard: "bg-[#b13a3a33]",
};
const levelTextColors = {
  easy: "text-[#1FAF73]",
  medium: "text-[#D99648]",
  hard: "text-[#CF4141]",
};

export const OfferLevelBadge = ({ level }: IProps) => {
  const t = useTranslations("common.levels");

  if (!level) return null;

  return (
    <span
      className={clsx(
        "text-xs text-center font-bold rounded-[8px] px-[6px]",
        levelTextColors[level],
        levelBgColors[level]
      )}
    >
      {t(level)}
    </span>
  );
};
