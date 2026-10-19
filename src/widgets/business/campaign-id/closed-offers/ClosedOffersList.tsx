"use client";

import { useOfferByCampaignID } from "src/queries/business/useOfferByCampaignID";
import { AddOffer } from "../active-offers/AddOffer";
import { OfferCardSkeleton } from "../active-offers/OfferCardSkeleton";
import { useMemo } from "react";
import { OfferCard } from "../active-offers/OfferCard";

interface IProps {
  campaignID: number;
}

export const ClosedOffersList = ({ campaignID }: IProps) => {
  const { offers } = useOfferByCampaignID(campaignID);

  const closedOffers = useMemo(
    () =>
      offers?.filter(
        (offer) => offer.active_adoffer_detail?.ad_offer.status === "closed"
      ) || [],
    [offers]
  );

  const skeletonCount =
    closedOffers.length === 0 ? 2 : closedOffers.length === 1 ? 1 : 0;

  return (
    <div className="flex flex-col gap-[24px]">
      {closedOffers.map((offer) => {
        const offerId = offer.active_adoffer_detail?.ad_offer.id;
        if (!offerId) return null;

        return (
          <OfferCard
            key={`offer-${offerId}`}
            status="closed"
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
