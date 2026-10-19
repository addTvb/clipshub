import { useQuery } from "@tanstack/react-query";
import { getAllCampaigns } from "src/api/business/campaigns";
import { queryKeys } from "src/config/queryKeys";

export const useCampaignsQuery = () => {
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: queryKeys.business.campaigns.getAllCampaigns,
    queryFn: getAllCampaigns,
  });

  return { campaigns, campaignsLoading };
};
