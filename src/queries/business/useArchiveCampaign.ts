import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveCampaign } from "src/api/business/campaigns";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";

// TODO Temporally not supported
export const useArchiveCampaign = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: mutationKeys.business.campaigns.archive,
    mutationFn: (id: number) => archiveCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.campaigns.getAllCampaigns,
      });
    },
  });

  return { archiveCampaignMutate: mutate, pendingArchive: isPending };
};
