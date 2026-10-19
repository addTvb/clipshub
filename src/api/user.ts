import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import { UpdateUserRequest } from "src/types/base";
import { UserResponse } from "src/types/auth";

export const updateUser = async (data: UpdateUserRequest) => {
  const { data: response }: AxiosResponse<UserResponse> = await axiosInstance({
    method: "PUT",
    url: "/users/me",
    data,
  });

  return response;
};
