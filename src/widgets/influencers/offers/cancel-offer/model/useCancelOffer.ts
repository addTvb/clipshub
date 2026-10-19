import { mutationKeys } from "src/config/mutationKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOffer } from "src/api/influencers/offers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { queryKeys } from "src/config/queryKeys";

export const useCancelOffer = (postId: number, channelId: number) => {
  const t = useTranslations("influencer.offers");
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { mutate: cancelOfferMutate, isPending } = useMutation({
    mutationKey: mutationKeys.influencers.offers.cancelOffer(postId),
    mutationFn: () => cancelOffer(postId),
    onSuccess: () => {
      toast.success(t("offerCancelledSuccessfully"));
      push("/influencers");
      queryClient.refetchQueries({
        queryKey: queryKeys.influencers.statistics.getMediaChannelStatistics(
          Number(channelId)
        ),
      });
    },
  });

  return { cancelOfferMutate, isPending };
};
