"use client";

import { AdOfferDetailForBusiness, OfferBusinessType } from "src/types/offers";
import { OfferBudgetStat } from "./offer-stat-cards/OfferBudgetStat";
import { OfferSmallStatCard } from "./offer-stat-cards/OfferSmallStatCard";
import { OfferViewsStat } from "./offer-stat-cards/OfferViewsStat";
import dynamic from "next/dynamic";
import { Spinner } from "src/components/ui/spinner";
import { formatCurrency } from "src/lib/numbers/formatCurrency";

const BudgetChart = dynamic(
  () => import("./budget-chart/BudgetChart").then((mod) => mod.BudgetChart),
  {
    ssr: false,
    loading: () => (
      <div className="col-span-2 row-span-4 flex items-center justify-center rounded-lg h-full w-full bg-white p-6">
        <Spinner />
      </div>
    ),
  }
);

interface IProps {
  offerDetail: AdOfferDetailForBusiness;
  statictic?: OfferBusinessType["statictic"];
  payment_summary?: OfferBusinessType["payment_summary"];
}

export const OfferGrid = ({
  offerDetail,
  statictic,
  payment_summary,
}: IProps) => {
  return (
    <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-3 lg:grid-rows-[205px_1fr_1fr_1fr_1fr]">
      <OfferBudgetStat
        offerDetail={offerDetail}
        payment_summary={payment_summary}
      />
      <OfferViewsStat statictic={statictic} />
      <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] min-[830px]:grid-cols-3 lg:grid-cols-1 lg:grid-rows-[auto_auto_auto] gap-[20px] row-span-2">
        <OfferSmallStatCard
          cardType="socialPlatform"
          value={offerDetail.ad_offer.media_channel_type}
        />
        <OfferSmallStatCard
          cardType="cpm"
          value={`$${formatCurrency(offerDetail.pricing.cmp_price)}`}
        />
        <OfferSmallStatCard
          cardType="maxPayPerPost"
          value={`$${formatCurrency(offerDetail.pricing.max_profit)}`}
        />
      </div>

      {offerDetail.ad_offer.id && (
        <BudgetChart offerID={offerDetail.ad_offer.id} />
      )}
    </div>
  );
};
