import type { AxiosResponse } from "axios";
import { axiosInstance } from "src/api/axiosInstance";
import {
  MediaChannelsResponse,
  MediaChannelDetailResponse,
  MediaChannelStatisticsResponse,
  GetChannelVerificationCodeResponse,
} from "src/types/influencers";

export const getMediaChannels = async () => {
  const { data }: AxiosResponse<MediaChannelsResponse> = await axiosInstance({
    method: "GET",
    url: "/influencers/media-channels/me",
  });

  return data;
};
interface AddMediaChannelRequest {
  code: string;
  front_url: string;
  type: string;
}

export const addMediaChannel = async (body: AddMediaChannelRequest) => {
  const { data }: AxiosResponse<MediaChannelDetailResponse> =
    await axiosInstance({
      method: "POST",
      url: "/influencers/media-channels",
      data: body,
    });

  return data;
};

interface UpdateMediaChannelSettingsRequest {
  category_ids: number[];
  language_ids: number[];
}

export const updateMediaChannelSettings = async (
  mediaChannelId: number,
  body: UpdateMediaChannelSettingsRequest
) => {
  const { data }: AxiosResponse<MediaChannelDetailResponse> =
    await axiosInstance({
      method: "PUT",
      url: `/influencers/media-channels/${mediaChannelId}`,
      data: body,
    });

  return data;
};

export const archiveMediaChannel = async (mediaChannelId: number) => {
  const { data }: AxiosResponse<MediaChannelDetailResponse> =
    await axiosInstance({
      method: "POST",
      url: `/influencers/media-channels/${mediaChannelId}/archive`,
    });

  return data;
};

export const getMediaChannelStatistics = async (mediaChannelId: number) => {
  const { data }: AxiosResponse<MediaChannelStatisticsResponse> =
    await axiosInstance({
      method: "GET",
      url: `/influencers/media-channels/${mediaChannelId}/statistics`,
    });

  return data;
};

export interface AddMediaChannelByUrlRequest {
  channel_url: string;
}
export const addMediaChannelByUrl = async (
  body: AddMediaChannelByUrlRequest
) => {
  const { data }: AxiosResponse<MediaChannelDetailResponse> =
    await axiosInstance({
      method: "POST",
      url: "/influencers/media-channels/profile-verification-code",
      data: body,
    });

  return data;
};

export const getChannelVerificationCode = async () => {
  const { data }: AxiosResponse<GetChannelVerificationCodeResponse> =
    await axiosInstance({
      method: "GET",
      url: "/influencers/media-channels/profile-verification-code",
    });

  return data;
};
