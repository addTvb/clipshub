import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import {
  AllCampaignsResponse,
  CampaignIDResponse,
  CampaignType,
  CreateCampaignRequest,
} from "src/types/campaigns";
import { BaseResponse } from "src/types/base";

export const getAllCampaigns = async () => {
  const { data }: AxiosResponse<AllCampaignsResponse> = await axiosInstance({
    method: "GET",
    url: "/companies/ad-campaigns/me",
  });

  return data;
};
export const createCampaign = async (body: CreateCampaignRequest) => {
  const { data }: AxiosResponse<CampaignType & BaseResponse> =
    await axiosInstance({
      method: "POST",
      url: "/companies/ad-campaigns",
      data: body,
    });

  return data;
};
export const getCampaignByID = async (id: number) => {
  const { data }: AxiosResponse<CampaignIDResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-campaigns/${id}`,
  });

  return data;
};
export const updateCampaign = async (
  id: number,
  body: CreateCampaignRequest
) => {
  const { data }: AxiosResponse<{ ad_campaign: CampaignType } & BaseResponse> =
    await axiosInstance({
      method: "POST",
      url: `/companies/ad-campaigns/${id}`,
      data: body,
    });

  return data;
};
export const archiveCampaign = async (id: number) => {
  const { data }: AxiosResponse<{ ad_campaign: CampaignType } & BaseResponse> =
    await axiosInstance({
      method: "POST",
      url: `/companies/ad-campaigns/${id}/archive`,
    });

  return data;
};
