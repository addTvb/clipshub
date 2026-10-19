import { useQuery } from "@tanstack/react-query";
import { getLeaderboardRows } from "src/api/leaderboard";
import { queryKeys } from "src/config/queryKeys";
import {
  GetLeaderboardRowsRequest,
  liderboardGroupType,
} from "src/types/leadeerboard";

export const useLeaderboardRowsQuery = (
  group: liderboardGroupType,
  params: GetLeaderboardRowsRequest
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.leaderboard.getRows(group, params.period),
    queryFn: () => getLeaderboardRows(group, params),
  });

  return {
    rows: data?.rows || [],
    status: data?.status,
    isLoading,
    error,
  };
};

