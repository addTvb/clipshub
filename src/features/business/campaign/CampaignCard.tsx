"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { CampaignType } from "src/types/campaigns";
import { getBackgroundGradient } from "./model/getBackgroundGradient";
import { CHImage } from "src/components/ui/image";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { Link } from "src/i18n/routing";
import { formatDate } from "src/lib/date/formatDate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
// import TrashIcon from "@icons/trash-red.svg";
import EditIcon from "@icons/edit.svg";
import { useState } from "react";
// import { useArchiveCampaign } from "src/queries/business/useArchiveCampaign";
import { useEditCampaignState } from "./model/useEditCampaignState";

interface IProps {
  campaign: CampaignType;
}

export const CampaignCard = ({ campaign }: IProps) => {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const backgroundImage = getBackgroundGradient(campaign?.ad_campaign?.id);

  // const { archiveCampaignMutate, pendingArchive } = useArchiveCampaign();

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const handleOpenMoreOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMoreOptions(!showMoreOptions);
  };

  const { openWithCampaign } = useEditCampaignState();

  const handleEditCampaign = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!campaign?.ad_campaign?.id) return;
    openWithCampaign(campaign.ad_campaign.id);
    setShowMoreOptions(false);
  };
  // const handleDeleteCampaign = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (campaign.ad_campaign.id) archiveCampaignMutate(campaign.ad_campaign.id);
  // };

  return (
    <Link
      href={`/business/campaigns/${campaign?.ad_campaign?.id}`}
      className="flex flex-col h-full"
    >
      <span
        className={clsx(
          "relative p-[20px] flex gap-[16px] items-center justify-between rounded-t-[12px] text-white bg-no-repeat"
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "60% 30%",
        }}
      >
        <div className="text-xl font-bold leading-[26px] truncate">
          {campaign?.ad_campaign?.title}
        </div>

        {/* TODO add brand name and logo */}
        <div className="flex items-center gap-[6px] text-sm font-semibold">
          <CHImage
            width={24}
            height={24}
            alt={campaign?.brand?.logo_file?.name}
            src={campaign?.brand?.logo_file?.link}
            imagePlaceholder
            className="rounded-full w-[24px] h-[24px] border border-white"
          />
          <span className="truncate w-max">
            {campaign?.ad_campaign?.business_name}
          </span>
        </div>
      </span>

      <span className="py-[18px] px-[20px] bg-white flex items-center gap-[24px] font-[Inter]">
        <span className="flex flex-col gap-[2px]">
          <span className="text-gray350 font-semibold text-[10px] leading-[16px] uppercase tracking-[0.7px]">
            {t("campaignWallet")}
          </span>
          <span className="text-textColor font-semibold text-[13px] leading-[19px]">
            ${formatCurrency(campaign?.wallet?.balance)}
          </span>
        </span>

        <span className="flex flex-col gap-[2px]">
          <span className="text-gray350 font-semibold text-[10px] leading-[16px] uppercase tracking-[0.7px]">
            {t("activeOffers")}
          </span>
          <span className="text-textColor font-semibold text-[13px] leading-[19px]">
            <span className="text-textColor">
              {campaign?.ad_offers_count?.moderated_count}
            </span>
            <span className="text-gray350">
              {" "}
              / {campaign?.ad_offers_count?.total_count}
            </span>
          </span>
        </span>

        <span className="flex flex-col gap-[2px]">
          <span className="text-gray350 font-semibold text-[10px] leading-[16px] uppercase tracking-[0.7px]">
            {t("creationDate")}
          </span>
          <span className="text-textColor font-semibold text-[13px] leading-[19px]">
            {formatDate(campaign?.ad_campaign?.created_at)}
          </span>
        </span>
      </span>

      <span className="px-[20px] py-[18px] flex items-center gap-[10px] bg-white rounded-b-[12px] border-t border-white50">
        <Button className="w-full py-[11px] px-[12px] text-base font-bold h-[43px]">
          {tCommon("goToDashboard")}
        </Button>
        <Popover open={showMoreOptions} onOpenChange={setShowMoreOptions}>
          <PopoverTrigger
            className="p-[12px] rounded-[6px] bg-white active:scale-95 transition-[background-color, transform] duration-300 border border-gray300"
            onClick={handleOpenMoreOptions}
          >
            <Image
              src="/static/icons/three-dots-black.svg"
              alt="More"
              width={20}
              height={20}
            />
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="flex flex-col gap-[6px] p-[10px] text-gray400 font-medium text-sm w-fit min-w-[140px]"
          >
            <Button
              variant="text"
              className="text-sm font-medium justify-start p-[6px]"
              onClick={handleEditCampaign}
            >
              <EditIcon />
              {tCommon("change")}
            </Button>
            {/* <Button
              variant="text"
              className="text-red-500 text-sm font-medium justify-start p-[6px]"
              onClick={handleDeleteCampaign}
              loading={pendingArchive}
            >
              <TrashIcon />
              {tCommon("delete")}
            </Button> */}
          </PopoverContent>
        </Popover>
      </span>
    </Link>
  );
};
