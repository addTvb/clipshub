import { useQuery } from "@tanstack/react-query";
import { getOfferById } from "src/api/influencers/offers";
import { queryKeys } from "src/config/queryKeys";

export const useOfferById = (offerId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.influencers.offers.getOfferById(offerId),
    queryFn: () => getOfferById(offerId),
    enabled: !!offerId,
  });

  return {
    offer: data?.detail?.ad_offer_detail,
    campaignDetail: data?.detail?.ad_campaign_detail,
    mediaChannelResponseInformations: data?.detail?.media_channel_response_informations,
    status: data?.status,
    isLoading,
    error,
  };
}; 