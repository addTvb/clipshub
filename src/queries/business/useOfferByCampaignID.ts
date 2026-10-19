import { useQuery } from "@tanstack/react-query";
import { getOfferByCampaignID } from "src/api/business/offers";
import { queryKeys } from "src/config/queryKeys";

export const useOfferByCampaignID = (id: number) => {
  const { data } = useQuery({
    queryKey: queryKeys.business.offers.getOfferByCampaignID(id),
    queryFn: () => getOfferByCampaignID(id),
  });

  return {
    offers: data?.ad_offer_details,
  };
};
