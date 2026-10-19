import { useQuery } from "@tanstack/react-query";
import { getOfferByID } from "src/api/business/offers";
import { queryKeys } from "src/config/queryKeys";

export const useGetOfferByIDQuery = (offerID: number) => {
  const { data, isLoading: offerLoading } = useQuery({
    queryKey: queryKeys.business.offers.getOfferByID(offerID),
    queryFn: () => getOfferByID(offerID),
  });

  return { offer: data?.ad_offer_detail, offerLoading };
};
