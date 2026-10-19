import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  GetLeaderboardPostsRequest,
  GetLeaderboardPostsByGroupRequest,
  GetLeaderboardPostsByGroupResponse,
  GetLeaderboardPostsResponse,
  GetLeaderboardRowsRequest,
  GetLeaderboardRowsResponse,
  liderboardGroupType,
  GetLeaderboardMediaChannelsRequest,
  GetLeaderboardMediaChannelsResponse,
} from "src/types/leadeerboard";

export const getLeaderboardPosts = async (
  params: GetLeaderboardPostsRequest
) => {
  const { data }: AxiosResponse<GetLeaderboardPostsResponse> =
    await axiosInstance({
      method: "GET",
      url: "/leaderboard/posts",
      params,
    });

  return data;
};

export const getLeaderboardRows = async (
  group: liderboardGroupType,
  params: GetLeaderboardRowsRequest
) => {
  const { data }: AxiosResponse<GetLeaderboardRowsResponse> =
    await axiosInstance({
      method: "GET",
      url: `/leaderboard/${group}`,
      params,
    });

  return data;
};

export const getLeaderboardPostsByGroup = async (
  group: liderboardGroupType,
  entity: number,
  params: GetLeaderboardPostsByGroupRequest
) => {
  const { data }: AxiosResponse<GetLeaderboardPostsByGroupResponse> =
    await axiosInstance({
      method: "GET",
      url: `/leaderboard/${group}/${entity}/posts`,
      params,
    });

  return data;
};

export const getLeaderboardMediaChannels = async (
  params: GetLeaderboardMediaChannelsRequest
) => {
  const { data }: AxiosResponse<GetLeaderboardMediaChannelsResponse> =
    await axiosInstance({
      method: "GET",
      url: "/leaderboard/media-channels",
      params,
    });

  return data;
};
