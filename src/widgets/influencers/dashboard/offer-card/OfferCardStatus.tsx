import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { PostStatusType } from "src/types/posts";

interface StatusProps {
  type: PostStatusType;
}

const getBgColor = (type: PostStatusType) => {
  switch (type) {
    case "approved":
      return "bg-success";
    case "created":
      return "bg-gray200";
    case "moderation":
      return "bg-amber";
    case "archived":
      return "bg-gray200";
    case "rejected":
      return "bg-[#FEE0E0]";
    default:
      return "bg-success";
  }
};

const getTextColor = (type: PostStatusType) => {
  switch (type) {
    case "approved":
      return "text-white";
    case "created":
      return "text-gray400";
    case "moderation":
      return "text-amber600";
    case "archived":
      return "text-gray400";
    case "rejected":
      return "text-[#B13A3A]";
    default:
      return "text-white";
  }
};

export const Status: FC<StatusProps> = ({ type }) => {
  const t = useTranslations("influencer.offerCard");

  return (
    <div
      className={clsx(
        "text-[14px] font-bold py-[4px] px-[6px] rounded-[8px]",
        getTextColor(type),
        getBgColor(type)
      )}
    >
      {t(`statuses.${type}`)}
    </div>
  );
};
