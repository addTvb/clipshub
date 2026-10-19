"use client";

import { useOfferByCampaignID } from "src/queries/business/useOfferByCampaignID";
import { OfferCard } from "../active-offers/OfferCard";
import { OfferCardSkeleton } from "../active-offers/OfferCardSkeleton";
import { AddOffer } from "../active-offers/AddOffer";

interface IProps {
  campaignID: number;
}

export const PausedOffersList = ({ campaignID }: IProps) => {
  const { offers } = useOfferByCampaignID(campaignID);

  const pausedOffers =
    offers?.filter(
      (offer) => offer.active_adoffer_detail?.ad_offer.status === "paused"
    ) || [];
  const skeletonCount =
    pausedOffers.length === 0 ? 2 : pausedOffers.length === 1 ? 1 : 0;

  return (
    <div className="flex flex-col gap-[24px]">
      {pausedOffers.map((offer) => {
        const offerId = offer.active_adoffer_detail?.ad_offer.id;
        if (!offerId) return null;

        return (
          <OfferCard
            key={`offer-${offerId}`}
            status="paused"
            offer={offer}
          />
        );
      })}

      <AddOffer />

      {Array.from({ length: skeletonCount }).map((_, index) => (
        <OfferCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};

