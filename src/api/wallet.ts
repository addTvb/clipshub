import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import { TransferRequest, UserWalletResponse } from "src/types/wallet";
import { BaseResponse } from "src/types/base";

export const getUserWallet = async () => {
  const { data }: AxiosResponse<UserWalletResponse> = await axiosInstance({
    method: "GET",
    url: "/companies/wallets/me",
  });

  return data;
};
export const getInfluencerWallet = async () => {
  const { data }: AxiosResponse<UserWalletResponse> = await axiosInstance({
    method: "GET",
    url: "/influencers/wallets/me",
  });

  return data;
};
export const transferBudget = async (
  fromWalletID: number,
  toWalletID: number,
  body: TransferRequest
) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: `/companies/wallets/${fromWalletID}/transfer/${toWalletID}`,
    data: body,
  });

  return data;
};
