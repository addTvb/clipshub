import { useMutation } from "@tanstack/react-query";
import { createCampaign } from "src/api/business/campaigns";
import { mutationKeys } from "src/config/mutationKeys";
import { CreateCampaignRequest } from "src/types/campaigns";

export const useCreateCampaign = () => {
  const { mutate: createCampaignMutate, isPending: pendingCreateCampaign } =
    useMutation({
      mutationKey: mutationKeys.business.campaigns.createCampaign,
      mutationFn: (body: CreateCampaignRequest) => createCampaign(body),
    });

  return { createCampaignMutate, pendingCreateCampaign };
};
