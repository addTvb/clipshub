"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { OfferBusinessType, OfferSetStatusType } from "src/types/offers";
import { socialPlatformIcons } from "../../offers/create-offer/form-steps/fifth-step/OfferDetails";
import clsx from "clsx";
import { Fragment } from "react";
import { OfferStatusActions } from "./OfferStatusActions";
import { InfoPopover } from "src/components/ui/info-popover";
import { RejectedOfferReasons } from "./RejectedOfferReasons";

interface IProps {
  offer: OfferBusinessType;
}

interface StatusItem {
  id: number;
  name: string;
  mediaChannelType: string;
  status: OfferSetStatusType;
  createdAt: string;
}

const statusBadgeStyles: Record<OfferSetStatusType, string> = {
  moderated: "bg-[#00B69B] text-white",
  moderating: "bg-[#F8E5CA] text-[#B1803A]",
  draft: "bg-[#E6EBF2] text-[#586781]",
  closed: "bg-[#E6EBF2] text-[#586781]",
  paused: "bg-[#FEE0E0] text-[#B13A3A]",
  rejected: "bg-[#FEE0E0] text-[#B13A3A]",
};

export const OfferStatusList = ({ offer }: IProps) => {
  const t = useTranslations();

  // Показываем только pending версию, так как active уже показана в карточке
  const statusItems: StatusItem[] = [];

  if (offer.pending_adoffer_detail) {
    const pendingOffer = offer.pending_adoffer_detail.ad_offer;
    statusItems.push({
      id: pendingOffer.id,
      name: pendingOffer.name,
      mediaChannelType: pendingOffer.media_channel_type,
      status: pendingOffer.version_status || pendingOffer.status,
      createdAt: pendingOffer.created_at,
    });
  }

  // Если нет pending статусов для отображения, не рендерим компонент
  if (statusItems.length === 0) {
    return null;
  }

  const getStatusTranslation = (status: OfferSetStatusType): string => {
    const statusKey = `business.offer.statuses.${status}`;
    const translation = t(statusKey);
    // Если перевод не найден (вернулся ключ), используем fallback
    if (translation === statusKey) {
      return status === "paused" ? "Paused" : status;
    }
    return translation;
  };

  return (
    <div className="flex flex-col gap-[12px] p-[12px] rounded-[12px] bg-[#FAFBFD]">
      <div className="text-sm font-semibold text-[#303948]">
        {t("business.offer.pending")}
      </div>

      {statusItems.map((item) => (
        <Fragment key={item.id}>
          <div className="h-[1px] bg-[#E6EBF2]" />

          <div>
            <div className="flex items-center sm:gap-[24px] gap-[12px]">
              <div className="flex items-center gap-[6px] flex-1 min-w-0">
                <Image
                  src={socialPlatformIcons[item.mediaChannelType]}
                  alt={item.mediaChannelType}
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />

                <div className="flex items-center gap-[6px] sm:gap-[12px] min-w-0 flex-1">
                  <span className="text-base font-bold text-[#010D22] truncate flex-1 min-w-0">
                    {item.name}
                  </span>

                  <span
                    className={clsx(
                      "py-[2px] px-[6px] rounded-[8px] text-sm font-bold capitalize",
                      statusBadgeStyles[item.status]
                    )}
                  >
                    {getStatusTranslation(item.status)}
                  </span>

                  {item.status !== "draft" && (
                    <InfoPopover>
                      {item.status === "moderating" ? (
                        t("business.offer.oldOfferRemainsActiveUntilModeration")
                      ) : item.status === "rejected" ? (
                        <RejectedOfferReasons
                          moderationRejectReasons={
                            offer.pending_adoffer_detail?.ad_offer.moderation_reject_reasons
                          }
                        />
                      ) : null}
                    </InfoPopover>
                  )}
                </div>
              </div>

              <OfferStatusActions item={item} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
