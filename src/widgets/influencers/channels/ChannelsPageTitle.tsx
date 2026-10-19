"use client";

import { useTranslations } from "next-intl";

interface Props {
  count: number;
}

const ChannelsPageTitle = ({ count }: Props) => {
  const t = useTranslations("influencer");
  
  return (
    <h1 className="flex gap-[10px] items-center text-[40px] font-bold">
      {t("yourChannels")}
      <div className="text-[16px] rounded-[8px] bg-gray300 px-[6px] py-[4px]">
        {count}
      </div>
    </h1>
  );
};

export default ChannelsPageTitle;
