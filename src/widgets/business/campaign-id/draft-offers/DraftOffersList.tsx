"use client";

import { useOfferByCampaignID } from "src/queries/business/useOfferByCampaignID";
import { DraftOfferCard } from "./DraftOfferCard";
import { AddOffer } from "../active-offers/AddOffer";
import { OfferCardSkeleton } from "../active-offers/OfferCardSkeleton";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import { DraftOfferCardMobile } from "./DraftOfferCardMobile";

interface IProps {
  campaignID: number;
}

export const DraftOffersList = ({ campaignID }: IProps) => {
  const { offers } = useOfferByCampaignID(campaignID);
  const { width } = useWindowSize();

  const draftOffers = useMemo(
    () =>
      offers?.filter((offer) => {
        const { active_adoffer_detail, pending_adoffer_detail } = offer;
        const offerDetail = active_adoffer_detail ?? pending_adoffer_detail;
        return offerDetail?.ad_offer?.status === "draft";
      }) || [],
    [offers]
  );
  const skeletonCount =
    draftOffers.length === 0 ? 2 : draftOffers.length === 1 ? 1 : 0;

  return (
    <div className="flex flex-col gap-[24px]">
      {draftOffers.map((offer) => {
        const { active_adoffer_detail, pending_adoffer_detail } = offer;
        const offerDetail = active_adoffer_detail ?? pending_adoffer_detail;
        const offerId = offerDetail?.ad_offer.id;
        if (!offerId) return null;

        if (width <= 700) {
          return (
            <DraftOfferCardMobile key={`offer-${offerId}`} offer={offer} />
          );
        }
        return <DraftOfferCard key={`offer-${offerId}`} offer={offer} />;
      })}

      <AddOffer />

      {Array.from({ length: skeletonCount }).map((_, index) => (
        <OfferCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};
