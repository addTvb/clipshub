import { axiosInstance } from "./axiosInstance";
import { AxiosResponse } from "axios";
import { DepositsResponse, RefillRequest, RefillResponse } from "src/types/refill";

export const createRefill = async (data: RefillRequest) => {
  const { data: response }: AxiosResponse<RefillResponse> = await axiosInstance({
    method: "POST",
    url: "/companies/wallets/deposits",
    data,
  });

  return response;
};

export const getDeposits = async () => {
  const { data: response }: AxiosResponse<DepositsResponse> = await axiosInstance({
    method: "GET",
    url: "/companies/wallets/deposits/me",
  });

  return response;
};