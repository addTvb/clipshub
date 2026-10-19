import type { AxiosResponse } from "axios";
import { axiosInstance } from "src/api/axiosInstance";
import {
  GetPostByIdResponse,
  AppendMediaPostResponse,
  AppendMediaPostRequest,
  GetPostsByMediaChannelResponse,
  CreatePostOnOfferRequest,
  GetPostsByMediaChannelParams,
} from "src/types/influencers";

export const getPostById = async (postId: number) => {
  const { data }: AxiosResponse<GetPostByIdResponse> = await axiosInstance({
    method: "GET",
    url: `/influencers/posts/${postId}`,
  });

  return data;
};

export const appendMediaPost = async (
  postId: number,
  body: AppendMediaPostRequest
) => {
  const { data }: AxiosResponse<AppendMediaPostResponse> = await axiosInstance({
    method: "POST",
    url: `/influencers/posts/${postId}/append-media-post`,
    data: body,
  });

  return data;
};

export const getPostsByMediaChannel = async (
  mediaChannelId: number,
  params: GetPostsByMediaChannelParams
) => {
  const { data }: AxiosResponse<GetPostsByMediaChannelResponse> =
    await axiosInstance({
      method: "GET",
      url: `/influencers/media-channels/${mediaChannelId}/posts`,
      params: params,
    });

  return data;
};

export const createPostOnOffer = async (
  mediaChannelId: number,
  body: CreatePostOnOfferRequest
) => {
  const { data }: AxiosResponse<GetPostByIdResponse> = await axiosInstance({
    method: "POST",
    url: `/influencers/media-channels/${mediaChannelId}/posts`,
    data: body,
  });

  return {
    data,
    mediaChannelId,
  };
};
