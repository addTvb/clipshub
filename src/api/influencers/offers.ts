import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { OffersForInfluencersResponse } from "src/types/offers";
import { SocialPlatformFilter } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { GetOfferByIdResponse } from "src/types/influencers";
import { BaseResponse } from "src/types/base";

export type OfferSortType =
  | "created_at"
  | "-created_at"
  | "cmp_price"
  | "-cmp_price"
  | "total_max_profit";

export interface InfluencerOffersFilterParams {
  page?: number;
  per_page?: number;
  sort?: OfferSortType;
  media_channel_id?: string;
  business_category_ids?: string[];
  media_channel_category_ids?: string[];
  media_channel_type?: SocialPlatformFilter;
  language_ids?: string[];
  search?: string;
  integration_types?: string[];
  brand_id?: number;
}

export const getOffersForInfluencers = async (
  params: InfluencerOffersFilterParams
) => {
  const { data }: AxiosResponse<OffersForInfluencersResponse> =
    await axiosInstance({
      method: "GET",
      url: `/influencers/ad-offers`,
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    });

  return data;
};

export const getOfferById = async (offerId: number) => {
  const { data }: AxiosResponse<GetOfferByIdResponse> = await axiosInstance({
    method: "GET",
    url: `/influencers/ad-offers/${offerId}`,
  });

  return data;
};

export const getOffers = async (params: InfluencerOffersFilterParams) => {
  const { data }: AxiosResponse<OffersForInfluencersResponse> =
    await axiosInstance({
      method: "GET",
      url: `/ad-offers`,
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    });

  return data;
};
export const cancelOffer = async (postId: number) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: `/influencers/posts/${postId}/close`,
  });

  return data;
};
