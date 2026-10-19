import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";
import { getInvitedUsers } from "src/api/influencers/referrals";

export const useGetInvitedUsers = () => {
  return useQuery({
    queryKey: queryKeys.influencers.referrals.getInvitedUsers,
    queryFn: getInvitedUsers,
  });
};

