import { GetInvitedUsersResponse } from "src/types/influencers";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "src/api/axiosInstance";

export const getInvitedUsers = async () => {
  const { data }: AxiosResponse<GetInvitedUsersResponse> = await axiosInstance({
    method: "GET",
    url: `/referral-program/invited-users`,
  });

  return data;
};
