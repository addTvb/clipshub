import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import { FileResponse, FilesRequest } from "src/types/files";

export const createFile = async (body: FilesRequest) => {
  const formData = new FormData();

  formData.append("file", body.file);
  formData.append("type", body.type);

  const { data }: AxiosResponse<FileResponse> = await axiosInstance({
    method: "POST",
    url: "/files",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return data;
};
