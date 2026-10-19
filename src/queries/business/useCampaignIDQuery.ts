import { useQuery } from "@tanstack/react-query";
import { getCampaignByID } from "src/api/business/campaigns";
import { queryKeys } from "src/config/queryKeys";

export const useCampaignIDQuery = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.business.campaigns.getCampaignByID(id),
    queryFn: () => getCampaignByID(id),
  });

  return { campaign: data?.ad_campaign, campaignLoading: isLoading };
};
