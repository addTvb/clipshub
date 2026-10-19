import { useQuery } from "@tanstack/react-query";
import { getPaymentHistoryByOfferID } from "src/api/business/posts";
import { queryKeys } from "src/config/queryKeys";

export const usePaymentHistoryByOfferIDQuery = (offerID: number) => {
  const { data: paymentHistory, isLoading: paymentHistoryLoading } = useQuery({
    queryKey: queryKeys.business.offers.getPaymentHistoryByOfferID(offerID),
    queryFn: () => getPaymentHistoryByOfferID(offerID),
    enabled: !!offerID,
  });

  return {
    paymentHistory: paymentHistory?.list,
    paymentHistoryLoading,
  };
}; 