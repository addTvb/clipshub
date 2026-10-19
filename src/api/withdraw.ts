import { CreateWithdrawRequest } from "src/types/withdraw";
import { axiosInstance } from "./axiosInstance";
import { BaseResponse } from "src/types/base";
import { AxiosResponse } from "axios";
import {
  WithdrawRequestResponse,
  WalletWithdrawMethodsResponse,
  CreatedWithdrawCreditial,
  CreatedWithdrawCreditialResponse,
  UpdateWithdrawCreditialRequest,
  UpdateWithdrawCreditialResponse,
} from "src/types/withdraw";

export const createWithdraw = async (data: CreateWithdrawRequest) => {
  const { data: response }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/influencers/wallets/me/withdraw-requests",
    data,
  });

  return response;
};
export const getWalletWithdrawMethods = async () => {
  const { data }: AxiosResponse<WalletWithdrawMethodsResponse> =
    await axiosInstance({
      method: "GET",
      url: "dictionaries/wallet-withdraw-methods",
    });

  return data;
};
export const getWithdrawRequests = async () => {
  const { data }: AxiosResponse<WithdrawRequestResponse> = await axiosInstance({
    method: "GET",
    url: "/influencers/wallets/me/withdraw-requests",
  });

  return data;
};
export const createWithdrawCreditial = async (
  body: CreatedWithdrawCreditial
) => {
  const { data }: AxiosResponse<CreatedWithdrawCreditialResponse> =
    await axiosInstance({
      method: "POST",
      url: "/influencers/wallets/me/withdraw-credentials",
      data: body,
  });

  return data;
};
export const updateWithdrawCreditial = async (
  id: number,
  body: UpdateWithdrawCreditialRequest
) => {
  const { data }: AxiosResponse<UpdateWithdrawCreditialResponse> =
    await axiosInstance({
      method: "PUT",
      url: `/influencers/wallets/me/withdraw-credentials/${id}`,
      data: body,
    });

  return data;
};
export const deleteWithdrawCreditial = async (id: number) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "DELETE",
    url: `/influencers/wallets/me/withdraw-credentials/${id}`,
  });

  return data;
};
