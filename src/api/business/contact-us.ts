import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { ContactUsRequest, ContactUsResponse } from "src/types/contact-us";

export const submitContactUs = async (body: ContactUsRequest) => {
  const { data }: AxiosResponse<ContactUsResponse> = await axiosInstance({
    method: "POST",
    url: "/brand-contact-requests",
    data: body,
  });

  return data;
};
