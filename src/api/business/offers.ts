import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import {
  CreateOfferRequest,
  CreateOfferResponse,
  OfferByIDResponse,
  OfferSetStatusReq,
  OfferSetVersionStatusReq,
  OffersBusinessResponse,
} from "src/types/offers";

export const getOfferByCampaignID = async (id: number) => {
  const { data }: AxiosResponse<OffersBusinessResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-campaigns/${id}/ad-offers`,
  });

  return data;
};
export const createOffer = async (
  campaignID: number,
  body: CreateOfferRequest
) => {
  const { data }: AxiosResponse<CreateOfferResponse> = await axiosInstance({
    method: "POST",
    url: `/companies/ad-campaigns/${campaignID}/ad-offers`,
    data: body,
  });

  return data;
};
export const setStatusOffer = async (
  offerID: number,
  body: OfferSetStatusReq
) => {
  const { data }: AxiosResponse<CreateOfferResponse> = await axiosInstance({
    method: "POST",
    url: `/companies/ad-offers/${offerID}/set-status`,
    data: body,
  });

  return data;
};

export const setVersionStatusOffer = async (
  offerID: number,
  body: OfferSetVersionStatusReq
) => {
  const { data }: AxiosResponse<CreateOfferResponse> = await axiosInstance({
    method: "POST",
    url: `/companies/ad-offers/${offerID}/set-version-status`,
    data: body,
  });

  return data;
};
export const getOfferByID = async (id: number) => {
  const { data }: AxiosResponse<OfferByIDResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-offers/${id}`,
  });

  return data;
};
export const changeOfferByID = async (id: number, body: CreateOfferRequest) => {
  const { data }: AxiosResponse<OfferByIDResponse> = await axiosInstance({
    method: "PUT",
    url: `/companies/ad-offers/${id}`,
    data: body,
  });

  return data;
};