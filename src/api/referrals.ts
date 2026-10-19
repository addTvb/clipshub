import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import { ReferralInfoResponse } from "src/types/referrals";

export const getReferralsInfo = async () => {
  const { data: response }: AxiosResponse<ReferralInfoResponse> =
    await axiosInstance({
      method: "GET",
      url: "/dictionaries/user-referral-levels",
    });

  return response;
};
