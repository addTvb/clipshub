import { useMutation } from "@tanstack/react-query";
import { updateCampaign } from "src/api/business/campaigns";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { CreateCampaignRequest } from "src/types/campaigns";

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: CreateCampaignRequest }) => updateCampaign(id, body), 
    mutationKey: mutationKeys.business.campaigns.updateCampaign,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.campaigns.getAllCampaigns,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.campaigns.getCampaignByID(data.ad_campaign.ad_campaign.id),
      });
    },
  });
};
