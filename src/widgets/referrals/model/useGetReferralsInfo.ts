import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { getReferralsInfo } from "src/api/referrals";
import { queryKeys } from "src/config/queryKeys";

export const useGetReferralsInfo = () => {
  const locale = useLocale();

  const { data: referrals, isLoading } = useQuery({
    queryKey: queryKeys.referrals.getReferralsInfo(locale),
    queryFn: getReferralsInfo,
  });

  return { referrals, isLoading };
};
