import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import {
  AllBrandsParams,
  AllBrandsResponse,
  BrandType,
  CreateBrandRequest,
  ListBrandsWithOffersParams,
  ListBrandsWithOffersResponse,
} from "src/types/brands";
import { BaseResponse } from "src/types/base";

export const getAllBrands = async (params?: AllBrandsParams) => {
  const { data }: AxiosResponse<AllBrandsResponse> = await axiosInstance({
    method: "GET",
    url: "/companies/brands",
    params: params,
  });

  return data;
};

export const createBrand = async (body: CreateBrandRequest) => {
  const { data }: AxiosResponse<{ brand: BrandType } & BaseResponse> =
    await axiosInstance({
      method: "POST",
      url: "/companies/brands",
      data: body,
    });

  return data;
};

export const deleteBrand = async (brandID: number) => {
  const { data }: AxiosResponse<AllBrandsResponse> = await axiosInstance({
    method: "DELETE",
    url: `/companies/brands/${brandID}`,
  });

  return data;
};

export const updateBrand = async (
  brandID: number | null,
  body?: CreateBrandRequest
) => {
  const { data }: AxiosResponse<AllBrandsResponse> = await axiosInstance({
    method: "PUT",
    url: `/companies/brands/${brandID}`,
    data: body,
  });

  return data;
};

export const getListBrandsWithOffers = async (
  params?: ListBrandsWithOffersParams
) => {
  const { data }: AxiosResponse<ListBrandsWithOffersResponse> =
    await axiosInstance({
      method: "GET",
      url: "/influencers/brands/offers",
      params: params,
      paramsSerializer: {
        indexes: null,
      },
    });

  return data;
};
export const getListBrandsWithOffersUnAuth = async (
  params?: ListBrandsWithOffersParams
) => {
  const { data }: AxiosResponse<ListBrandsWithOffersResponse> =
    await axiosInstance({
      method: "GET",
      url: "/brands/offers",
      params: params,
      paramsSerializer: {
        indexes: null,
      },
    });

  return data;
};
