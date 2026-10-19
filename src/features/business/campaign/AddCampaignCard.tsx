"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAdCampaignState } from "./model/useAdCampaignState";

export const AddCampaignCard = () => {
  const t = useTranslations();

  const { setOpen } = useAdCampaignState();
  const handleOpen = () => setOpen(true);
  
  return (
    <div className="p-[24px] flex flex-col gap-[24px] shadow-cardShadow bg-white h-full rounded-[6px]">
      <h2 className="text-base text-textColor m-0 font-bold leading-[22px]">
        {t("business.addCampaign")}
      </h2>

      <button
        onClick={handleOpen}
        className="w-full flex flex-col gap-[8px] h-full min-h-[125px] items-center justify-center text-gray400 rounded-[6px] transition-colors bg-white50 hover:bg-white200"
      >
        <Image
          src="/static/icons/triangle-flag.svg"
          alt=""
          width={32}
          height={32}
        />
        <span className="font-medium">{t("business.campaign")}</span>
      </button>
    </div>
  );
};
