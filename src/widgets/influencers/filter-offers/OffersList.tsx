"use client";

import { InfluencerOfferType } from "src/types/offers";
import OfferCard from "../dashboard/offer-card/OfferCard";
import { memo } from "react";
import { NotFoundBlock } from "src/components/ui/not-found-block";
import { SpinnerBlock } from "src/components/ui/spinner-block";
import { Pagination } from "src/features/posts/Pagination";
import { PaginationType } from "src/types/base";

interface IProps {
  offers?: InfluencerOfferType[];
  isLoading: boolean;
  paginate?: PaginationType;
}

export const OffersList = memo(({ offers, isLoading, paginate }: IProps) => {
  if (isLoading) return <SpinnerBlock className="w-full" />;

  if (!offers || offers.length <= 0)
    return <NotFoundBlock className="w-full" />;

  return (
    <div className="space-y-[16px] w-full">
      <div className="space-y-[18px] w-full">
        {offers?.map((offer) => (
          <OfferCard
            key={`${offer.ad_offer_detail.ad_offer.id}-influencer-offer`}
            campaignDetail={offer.ad_campaign_detail}
            offer={offer.ad_offer_detail}
            mediaChannelResponseInformations={
              offer.media_channel_response_informations
            }
          />
        ))}
      </div>
      {paginate && <Pagination paginate={paginate} />}
    </div>
  );
});
OffersList.displayName = "OffersList";
