import { useQuery } from "@tanstack/react-query";
import { getMediaChannels } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";
import { useAuthStore } from "src/store/auth";

export const useMediaChannels = () => {
  const { isAuthenticated } = useAuthStore();

  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.influencers.getMediaChannels,
    queryFn: getMediaChannels,
    enabled: isAuthenticated,
  });

  const activeChannelDetails = data?.media_channel_details?.filter(
    (detail) => detail?.media_channel?.status !== "archived"
  ) || [];

  return {
    mediaChannels: activeChannelDetails.map((detail) => detail?.media_channel) || [],
    channelDetails: activeChannelDetails,
    isLoading: isPending,
    error,
  };
};
