"use client";

import Image from "next/image";
import { Link } from "src/i18n/routing";
import { OfferBusinessType, OfferSetStatusType } from "src/types/offers";
import { socialPlatformIcons } from "../../offers/create-offer/form-steps/fifth-step/OfferDetails";
import { formatDate } from "src/lib/date/formatDate";
import { useTranslations } from "next-intl";
import { Progress } from "src/components/ui/progress";
import { useParams } from "next/navigation";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { OfferStatusList } from "./OfferStatusList";
import { OfferActionsMenu } from "./OfferActionsMenu";

interface IProps {
  offer: OfferBusinessType;
  status: Exclude<OfferSetStatusType, "draft">;
}

export const OfferCard = ({ offer, status }: IProps) => {
  const t = useTranslations();
  const { id } = useParams();

  // Ранняя проверка на наличие active_adoffer_detail
  const activeOfferDetail = offer.active_adoffer_detail;
  if (!activeOfferDetail) {
    return null;
  }

  const adOffer = activeOfferDetail.ad_offer;
  const offerId = adOffer.id;
  const offerName = adOffer.name;
  const mediaChannelType = adOffer.media_channel_type;
  const createdAt = adOffer.created_at;


  const paidSum = offer.payment_summary.paid_sum;
  const reservedSum = offer.payment_summary.reserved_sum;
  const budget = activeOfferDetail.pricing.budget || 0;
  const spent = paidSum + reservedSum;

  return (
    <div className="p-[16px] md:p-[24px] flex flex-col gap-[12px] sm:gap-[24px] rounded-[8px] bg-white shadow-cardShadow">
      <div className="flex-col items-start sm:items-center sm:flex-row   pb-[18px] border-b-[1px] border-dashed border-gray500 flex  justify-between">
        <Link
          href={`/business/campaigns/${id}/offer/${offerId}`}
          className="flex items-center gap-[8px]"
        >
          <Image
            src={socialPlatformIcons[mediaChannelType]}
            alt={mediaChannelType}
            width={20}
            height={20}
          />
          <span className="max-w-[208px] truncate">{offerName}</span>
          <Image
            src="/static/icons/arrow-right-blue.svg"
            alt=""
            width={14}
            height={14}
          />
        </Link>

        <div className="flex items-center gap-[24px] w-full justify-between sm:w-auto sm:justify-start">
          <div className="text-gray600 text-sm font-medium">
            {formatDate(createdAt)} / {t("influencer.offerCard.infoBlocks.cpm")}
          </div>

          {(status === "moderated" || status === "paused") && (
            <OfferActionsMenu
              offerId={offerId}
              offerName={offerName}
              status={status}
            />
          )}
        </div>
      </div>

      <div className="grid grid-rows-1 grid-cols-3 gap-[48px] max-[450px]:gap-[22px] max-[400px]:grid-rows-2 max-[400px]:grid-cols-2 max-[400px]:gap-x-[22px] max-[400px]:gap-y-[12px]">
        <div className="flex flex-col gap-[8px] max-[400px]:col-span-3">
          <div className="flex items-center gap-[4px]">
            <Image
              src="/static/icons/dollar-coin-blue.svg"
              alt=""
              width={18}
              height={18}
            />
            <span className="text-gray400 text-sm font-semibold">
              {t("business.offer.spent")}
            </span>
          </div>

          <div className="text-sm font-medium">
            {budget
              ? `$${formatCurrency(spent)} / $${formatCurrency(budget)}`
              : `$${formatCurrency(spent)}`}
          </div>

          <Progress
            max={!budget || spent > budget ? spent : budget}
            segments={[
              {
                value: reservedSum,
                color: "#ABAEFF",
              },
              {
                value: paidSum,
                color: "#F8D47A",
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <Image
              src="/static/icons/eye-gray.svg"
              alt=""
              width={18}
              height={18}
            />
            <span className="text-gray400 text-sm font-semibold">
              {t("business.offer.views")}
            </span>
          </div>

          <div className="text-sm font-medium">
            {offer.statictic.views_count}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <Image
              src="/static/icons/post-blue.svg"
              alt=""
              width={18}
              height={18}
            />
            <span className="text-gray400 text-sm font-semibold">
              {t("business.offer.posts")}
            </span>
          </div>

          <div className="text-sm font-medium">
            {offer.statictic.posts_count}
          </div>
        </div>
      </div>

      <OfferStatusList offer={offer} />
    </div>
  );
};
