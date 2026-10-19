"use client";

import CrownIcon from "@icons/crown.svg";
import { useTranslations } from "next-intl";
import { useLeaderboardTitle } from "./model/LeaderboardTitleContext";

export const LeaderboardTitle = () => {
  const t = useTranslations();
  const { title } = useLeaderboardTitle();

  return (
    <h1 className="flex items-center gap-[12px] md:text-[40px] text-[28px] leading-[38px] font-bold text-white">
      <CrownIcon className="w-[31px] text-[#A8CAD8]" /> {t(title)}
    </h1>
  );
};

