import {
  useQuery,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { getLeaderboardMediaChannels } from "src/api/leaderboard";
import { queryKeys } from "src/config/queryKeys";
import {
  GetLeaderboardMediaChannelsRequest,
  GetLeaderboardMediaChannelsResponse,
} from "src/types/leadeerboard";

export const useLeaderboardMediaChannels = (
  params: GetLeaderboardMediaChannelsRequest,
  options?: Partial<UseQueryOptions<GetLeaderboardMediaChannelsResponse>>
) => {
  const { data, isFetching, error } = useQuery({
    queryKey: queryKeys.leaderboard.getMediaChannels(params),
    queryFn: () => getLeaderboardMediaChannels(params),
    placeholderData: keepPreviousData,
    ...options,
  });

  return {
    mediaChannels: data?.list || [],
    topThree: data?.top_three || [],
    paginate: data?.paginate,
    status: data?.status,
    isLoading: isFetching, // Используем isFetching для показа скелетонов при любой загрузке
    error,
  };
};
