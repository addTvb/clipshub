import { useQuery } from "@tanstack/react-query";
import { getMediaChannelStatistics } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";

export const useMediaChannelStat = (mediaChannelId: number) => {
  const { data, isLoading } = useQuery({
    queryKey:
      queryKeys.influencers.statistics.getMediaChannelStatistics(
        mediaChannelId
      ),
    queryFn: () => getMediaChannelStatistics(mediaChannelId),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    mediaChannelStat: data?.statistics,
    mediaChannelStatLoading: isLoading,
  };
};
