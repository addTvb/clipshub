import type { AxiosResponse } from "axios";
import { DictionariesResponse } from "src/types/category";
import { axiosInstance } from "src/api/axiosInstance";

export const getMediaChannelCategory = async () => {
  const { data }: AxiosResponse<DictionariesResponse> = await axiosInstance({
    method: "GET",
    url: "/dictionaries/media-channel-categories",
  });

  return data;
};
