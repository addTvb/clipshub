"use client";

import { OfferBusinessType } from "src/types/offers";
import { socialPlatformIcons } from "../../offers/create-offer/form-steps/fifth-step/OfferDetails";
import Image from "next/image";
// import { Progress } from "src/components/ui/progress";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useParams } from "next/navigation";
import { formatDate } from "src/lib/date/formatDate";
import { useDraftOfferCard } from "./model/useDraftOfferCard";

interface IProps {
  offer: OfferBusinessType;
}

export const DraftOfferCard = ({ offer }: IProps) => {
  const t = useTranslations();
  const { id } = useParams();
  const { setVersionStatusOfferPending, handleChangeStatus, handleDeleteOffer } =
    useDraftOfferCard(offer);

  const offerDetail = offer.pending_adoffer_detail ?? offer.active_adoffer_detail;
  if (!offerDetail) {
    return null;
  }

  const adOffer = offerDetail.ad_offer;
  const offerId = adOffer.id;
  const offerName = adOffer.name;
  const mediaChannelType = adOffer.media_channel_type;
  const createdAt = adOffer.created_at;

  return (
    <div className="rounded-[8px] shadow-cardShadow p-[24px] bg-white grid grid-cols-3 xl:grid-cols-[350px_3fr_2fr] items-center justify-end">
      <div className="flex items-center gap-[8px]">
        <Image
          src={socialPlatformIcons[mediaChannelType]}
          alt={mediaChannelType}
          width={32}
          height={32}
        />
        <span className="font-bold text-xl truncate max-w-[300px]">
          {offerName}
        </span>
      </div>

      <div className="flex items-center justify-center gap-[113px] text-sm text-gray600 font-medium">
        <div>{formatDate(createdAt)}</div>

        {/* TODO add progress */}
        {/* <div className="flex items-center gap-[12px] w-[140px]">
          <Progress
            max={100}
            segments={[{ value: 50, color: "#4DADE2" }]}
            className="max-w-[140px]"
          />
          <span>100%</span>
        </div> */}
      </div>

      <div className="flex items-center gap-[12px] justify-end">
        <Button
          href={`/business/campaigns/${id}/offer/${offerId}/edit`}
          variant="outline"
          className="p-[12px]"
        >
          <Image
            src="/static/icons/pencil-black.svg"
            alt="Edit"
            width={20}
            height={20}
          />
        </Button>

        <Button
          className="min-w-[120px]"
          loading={setVersionStatusOfferPending}
          onClick={handleChangeStatus}
          disabled={setVersionStatusOfferPending}
        >
          {t("business.offerForm.activateOffer")}
        </Button>

        <Popover>
          <PopoverTrigger>
            <Image
              src="/static/icons/three-dots.svg"
              alt="More"
              width={24}
              height={24}
            />
          </PopoverTrigger>
          <PopoverContent className="p-[6px] max-w-[150px] ">
            <Button
              variant="text"
              className="w-full justify-start p-[6px]"
              onClick={handleDeleteOffer}
              icon={
                <Image
                  src="/static/icons/trash-red.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              }
            >
              <span>{t("common.delete")}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
