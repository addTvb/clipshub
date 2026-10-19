import type { AxiosResponse } from "axios";
import { DictionariesResponse } from "src/types/category";
import { axiosInstance } from "src/api/axiosInstance";

export const getBusinessCategory = async () => {
  const { data }: AxiosResponse<DictionariesResponse> = await axiosInstance({
    method: "GET",
    url: "/dictionaries/business-categories",
  });

  return data;
};
