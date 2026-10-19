import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { PaymentStatsResponse, StatisticsResponse } from "src/types/statistics";

export const getCampaignStats = async (id: number) => {
  const { data }: AxiosResponse<StatisticsResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-campaigns/${id}/statistics`,
  });

  return data;
};
export const getCampaignPaymentStats = async (id: number) => {
  const { data }: AxiosResponse<PaymentStatsResponse> = await axiosInstance({
    method: "GET",
    url: `/companies/ad-campaigns/${id}/payment-summaries`,
  });

  return data;
};
