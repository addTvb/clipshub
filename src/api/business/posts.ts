import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { PostsListResponse } from "src/types/posts";
import { OfferPaymentHistoryResponse } from "src/types/offers";

export const getPostsByOfferID = async (offerID: number, page: number = 1) => {
  const { data }: AxiosResponse<PostsListResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-offers/${offerID}/posts`,
    params: {
      page,
    },
  });
  return data;
};

export const getPaymentHistoryByOfferID = async (offerID: number) => {
  const { data }: AxiosResponse<OfferPaymentHistoryResponse> =
    await axiosInstance({
      method: "GET",
      url: `/companies/ad-offers/${offerID}/payment-history`,
    });
  return data;
};
