import {
  useQuery,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { getLeaderboardPosts } from "src/api/leaderboard";
import { queryKeys } from "src/config/queryKeys";
import {
  GetLeaderboardPostsRequest,
  GetLeaderboardPostsResponse,
} from "src/types/leadeerboard";

export const useLeaderboardPostsQuery = (
  params: GetLeaderboardPostsRequest,
  options?: Partial<UseQueryOptions<GetLeaderboardPostsResponse>>
) => {
  const { data, isFetching, error } = useQuery({
    queryKey: queryKeys.leaderboard.getPosts(
      params.period,
      params.page,
      params.per_page
    ),
    queryFn: () => getLeaderboardPosts(params),
    meta: { skipGlobalErrorHandler: true },
    placeholderData: keepPreviousData,
    ...options,
  });

  return {
    posts: data?.list || [],
    topThree: data?.top_three || [],
    paginate: data?.paginate,
    status: data?.status,
    isLoading: isFetching,
    error,
  };
};
