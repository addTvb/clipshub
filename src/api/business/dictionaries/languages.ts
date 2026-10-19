import type { AxiosResponse } from "axios";
import { DictionariesResponse } from "src/types/category";
import { axiosInstance } from "src/api/axiosInstance";

export const getLanguagesDictionary = async () => {
  const { data }: AxiosResponse<DictionariesResponse> = await axiosInstance({
    method: "GET",
    url: "/dictionaries/languages",
  });

  return data;
};
