import { useQuery } from "@tanstack/react-query";
import {
  getCampaignPaymentStats,
  getCampaignStats,
} from "src/api/business/statistics";
import { queryKeys } from "src/config/queryKeys";

export const useStatsByCampaignID = (id: number) => {
  const { data: statData } = useQuery({
    queryKey: queryKeys.business.stats.getStatsByCampaignID(id),
    queryFn: () => getCampaignStats(id),
  });
  const { data: paymentData } = useQuery({
    queryKey: queryKeys.business.stats.getPaymentStatsByCampaignID(id),
    queryFn: () => getCampaignPaymentStats(id),
  });

  return {
    campaignStats: statData?.statistics,
    paymentStats: paymentData?.summary,
  };
};
