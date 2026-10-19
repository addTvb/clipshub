"use client";

import { useOfferByCampaignID } from "src/queries/business/useOfferByCampaignID";
import { OfferCard } from "./OfferCard";
import { OfferCardSkeleton } from "./OfferCardSkeleton";
import { AddOffer } from "./AddOffer";

interface IProps {
  campaignID: number;
}

export const ActiveOffersList = ({ campaignID }: IProps) => {
  const { offers } = useOfferByCampaignID(campaignID);

  const moderatedOffers =
    offers?.filter(
      (offer) => offer.active_adoffer_detail?.ad_offer.status === "moderated"
    ) || [];
  const skeletonCount =
    moderatedOffers.length === 0 ? 2 : moderatedOffers.length === 1 ? 1 : 0;

  return (
    <div className="flex flex-col gap-[24px]">
      {moderatedOffers.map((offer) => {
        const offerId = offer.active_adoffer_detail?.ad_offer.id;
        if (!offerId) return null;

        return (
          <OfferCard
            key={`offer-${offerId}`}
            status="moderated"
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
