import {
  useQuery,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { getLeaderboardPostsByGroup } from "src/api/leaderboard";
import { queryKeys } from "src/config/queryKeys";
import {
  GetLeaderboardPostsByGroupRequest,
  GetLeaderboardPostsByGroupResponse,
  liderboardGroupType,
} from "src/types/leadeerboard";

export const useLeaderboardPostsByGroupQuery = (
  group: liderboardGroupType,
  entity: number,
  params: GetLeaderboardPostsByGroupRequest,
  options?: Partial<UseQueryOptions<GetLeaderboardPostsByGroupResponse>>
) => {
  const { data, isFetching, error } = useQuery({
    queryKey: queryKeys.leaderboard.getPostsByGroup(
      group,
      entity,
      params.period,
      params.page,
      params.per_page
    ),
    queryFn: () => getLeaderboardPostsByGroup(group, entity, params),
    placeholderData: keepPreviousData,
    meta: { skipGlobalErrorHandler: true },
    ...options,
  });

  return {
    posts: data?.list || [],
    topThree: data?.top_three || [],
    paginate: data?.paginate,
    status: data?.status,
    isLoading: isFetching, // Используем isFetching для показа скелетонов при любой загрузке
    error,
  };
};
