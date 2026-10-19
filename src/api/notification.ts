import { axiosInstance } from "./axiosInstance";
import { AxiosResponse } from "axios";
import { GetNotificationsRequest, GetNotificationsResponse, ReadNotificationRequest } from "src/types/notifications";
import { BaseResponse } from "src/types/base";

export const getNotifications = async (data: GetNotificationsRequest) => {
  const { data: response }: AxiosResponse<GetNotificationsResponse> = await axiosInstance({
    method: "GET",
    url: "/notifications/me",
    params: data,
  });

  return response;
};

export const readNotifications = async (data: ReadNotificationRequest) => {
  const { data: response }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/notifications/me/read",
    data,
  });

  return response;
};

export const readAllNotifications = async () => {
  const { data: response }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/notifications/me/read-all",
  });

  return response;
};