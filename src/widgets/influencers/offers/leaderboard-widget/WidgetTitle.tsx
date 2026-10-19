import { useTranslations } from "next-intl";
import CrownIcon from "@icons/crown.svg";

export const WidgetTitle = () => {
  const t = useTranslations("influencer.leaderboardWidget");
  return (
    <div className="flex md:items-center gap-[16px] flex-col md:flex-row md:gap-[24px]">
      <div className="flex items-center gap-[8px] pl-[22px] min-[768px]:pl-0">
        <CrownIcon className="w-[32px] text-[#A8CAD8]" />
        <h2 className="md:text-[28px] text-xl font-bold text-textColor">
          {t("title")}
        </h2>
      </div>

      <span className="text-gray350 text-sm font-medium font-[Inter] pl-[12px] min-[768px]:pl-0">
        {t("description")}
      </span>
    </div>
  );
};
