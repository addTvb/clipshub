"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

interface IProps {
  text?: string;
  className?: string;
  renderSubBlock?: React.ReactNode;
}

export const NotFoundBlock = ({ text, className, renderSubBlock }: IProps) => {
  const t = useTranslations("common");
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center h-[300px] rounded-[8px] bg-white200 text-gray600",
        className
      )}
    >
      <div className="text-2xl">{text || t("noOffers")}</div>
      {renderSubBlock && renderSubBlock}
    </div>
  );
};
