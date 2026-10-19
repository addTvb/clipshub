"use client";

import { OfferBusinessType } from "src/types/offers";
import { socialPlatformIcons } from "../../offers/create-offer/form-steps/fifth-step/OfferDetails";
import Image from "next/image";
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

export const DraftOfferCardMobile = ({ offer }: IProps) => {
  const t = useTranslations();
  const { id } = useParams();
  const { setVersionStatusOfferPending, handleChangeStatus, handleDeleteOffer } =
    useDraftOfferCard(offer);

  // Ранняя проверка на наличие pending_adoffer_detail
  const pendingOfferDetail = offer.pending_adoffer_detail;
  if (!pendingOfferDetail) {
    return null;
  }

  const adOffer = pendingOfferDetail.ad_offer;
  const offerId = adOffer.id;
  const offerName = adOffer.name;
  const mediaChannelType = adOffer.media_channel_type;
  const createdAt = adOffer.created_at;

  return (
    <div className="rounded-[8px] shadow-cardShadow p-[24px] bg-white flex flex-col gap-[13px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[6px]">
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

          <div>{formatDate(createdAt)}</div>
        </div>

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

      <div className="flex items-center gap-[12px]">
        <Button
          href={`/business/campaigns/${id}/offer/${offerId}/edit`}
          variant="outline"
          className="p-[12px] w-full"
        >
          <Image
            src="/static/icons/pencil-black.svg"
            alt="Edit"
            width={20}
            height={20}
          />
        </Button>

        <Button
          className="min-w-[120px] w-full"
          loading={setVersionStatusOfferPending}
          onClick={handleChangeStatus}
          disabled={setVersionStatusOfferPending}
        >
          {t("business.offerForm.activateOffer")}
        </Button>
      </div>
    </div>
  );
};
