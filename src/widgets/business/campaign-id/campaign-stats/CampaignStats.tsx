"use client";

import { useStatsByCampaignID } from "src/queries/business/useStatsByCampaignID";
import { CampaignStatCard } from "./CampaignStatCard";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { useTranslations } from "next-intl";

interface IProps {
  campaignID: number;
}

export const CampaignStats = ({ campaignID }: IProps) => {
  const { campaignStats, paymentStats } = useStatsByCampaignID(campaignID);
  const t = useTranslations("business.offer");
  return (
    <div className="flex flex-wrap items-center gap-[24px]">
      {typeof campaignStats?.unique_influencers === "number" && (
        <CampaignStatCard
          cardType="influencers"
          value={formatCurrency(campaignStats.unique_influencers)}
        />
      )}
      {campaignStats && (
        <>
          <CampaignStatCard
            cardType="totalPosts"
            value={formatCurrency(campaignStats?.total_posts)}
          />
          <CampaignStatCard
            cardType="totalViews"
            value={formatCurrency(campaignStats?.total_views)}
          />
        </>
      )}
      {paymentStats && (
        <CampaignStatCard
          cardType="spent"
          value={formatCurrency(paymentStats.paid_sum)}
          subValue={`${t('reserved')} $${formatCurrency(Number(paymentStats.reserved_sum))}`}
        />
      )}
    </div>
  );
};
