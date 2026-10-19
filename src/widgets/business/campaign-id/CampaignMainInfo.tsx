"use client";

import Image from "next/image";
import { CampaignType } from "src/types/campaigns";


interface IProps {
  campaign?: CampaignType;
}
import SettingsIcon from "@icons/settings-gray.svg";
import { Button } from "src/components/ui/button/button";

export const CampaignMainInfo = ({ campaign }: IProps) => {

  return (
    <div className="flex gap-[32px] justify-center md:justify-start relative">
      <div className="flex gap-[20px] items-center flex-col md:flex-row">
        <Image
          className="border border-[#DDDFE4] rounded-full object-cover h-[100px] w-[100px]"
          src={campaign?.brand?.logo_file?.link || ""}
          alt={campaign?.brand?.logo_file?.name || ""}
          width={100}
          height={100}
        />

        <div className="flex flex-col gap-[12px] text-center items-center md:text-start md:items-start">
          <h1 className="text-[28px] text-textColor font-bold md:text-[40px]">
            {campaign?.ad_campaign?.title}
          </h1>

          <div className="flex gap-[4px] items-center">
            <Image
              src="/static/icons/portfolio-gray.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-gray400 text-sm font-semibold">
              {campaign?.ad_campaign?.business_name}
            </span>
          </div>

          <p className="text-gray600 text-sm font-medium">
            {campaign?.ad_campaign?.business_description}
          </p>
        </div>
      </div>
      <Button
        href={`/business/campaigns/${campaign?.ad_campaign.id}/update`}
        variant="outline"
        className="p-2 size-auto bg-transparent [&_svg]:size-[15px] w-fit ml-auto absolute right-0 top-0"
      >
        <SettingsIcon />
      </Button>

      {/* <Image
        className="self-start"
        src="/static/icons/three-dots.svg"
        alt=""
        width={24}
        height={24}
      /> */}
    </div>
  );
};
