"use client";

import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import clsx from "clsx";

interface DaysDifferenceProps {
  creationDateStr: string;
  className?: string;
}

export const DaysDifference = ({ creationDateStr, className }: DaysDifferenceProps) => {
  const t = useTranslations("common");
  
  const creationDate = dayjs(creationDateStr, "DD/MM/YYYY").startOf("day");
  const currentDate = dayjs().startOf("day");
  const diffDays = Math.abs(currentDate.diff(creationDate, "day"));

  let displayText: string;
  
  if (diffDays === 0) {
    displayText = t("expiresToday")
  } else {
    const dayText = diffDays === 1 ? t("day") : t("days");
    displayText = `${diffDays} ${dayText} ${t("left")}`;
  }

  return (
    <span className={clsx(className)}>
      {displayText}
    </span>
  );
}; 