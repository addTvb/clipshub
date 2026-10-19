"use client";

import { useMemo } from "react";
import { AdCampaignModal } from "src/features/business/campaign/AdCampaignModal";
import { EditCampaignModal } from "src/features/business/campaign/EditCampaignModal";
import { AddCampaignCard } from "src/features/business/campaign/AddCampaignCard";
import { CampaignCard } from "src/features/business/campaign/CampaignCard";
import { SkeletonCard } from "src/features/business/SkeletonCard";
import { CampaignType } from "src/types/campaigns";

interface IProps {
  campaigns?: CampaignType[];
}

export const CampaignsGrid = ({ campaigns }: IProps) => {
  const CARDS_PER_ROW = 3;

  const emptyCardsCount = useMemo(() => {
    if (!campaigns) return 0;
    const totalCards = campaigns.length + 1; // +1 для AddCampaignCard
    const cardsInLastRow = totalCards % CARDS_PER_ROW;
    return cardsInLastRow === 0 ? 0 : CARDS_PER_ROW - cardsInLastRow;
  }, [campaigns]);

  const emptyCards = useMemo(() => {
    return Array.from({ length: emptyCardsCount }, (_, index) => (
      <SkeletonCard key={`empty-${index}`} />
    ));
  }, [emptyCardsCount]);

  return (
    <>
      <AdCampaignModal />
      <EditCampaignModal campaigns={campaigns} />
      <div className="grid grid-cols-1 grid-rows-[minmax(219px, 1fr)] gap-x-[20px] gap-y-[16px] sm:grid-cols-2 lg:grid-cols-3">
        {campaigns &&
          campaigns.map((campaign, index) => (
            <CampaignCard
              key={`campaign-${campaign.ad_campaign.id || index}`}
              campaign={campaign}
            />
          ))}

        <AddCampaignCard />

        {emptyCards}
      </div>
    </>
  );
};
