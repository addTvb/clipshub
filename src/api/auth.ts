import type { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  ConfirmEmailRequest,
  AuthTokenResponse,
  SignInRequest,
  SignUpRequest,
  SendRestoreLinkRequest,
  RestorePasswordRequest,
  SignInSocialRequest,
  UserResponse,
  EditUserRequest,
  SocialAuthenticationResponse,
  LinkSocialAuthenticationRequest,
  ResendEmailRequest,
} from "src/types/auth";
import { BaseResponse } from "src/types/base";

export const signUp = async (body: SignUpRequest) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/signup/password",
    data: body,
  });

  return data;
};
export const confirmEmailByCode = async (body: ConfirmEmailRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signup/password/confirm",
    data: body,
  });

  return data;
};
export const resendEmailConfirm = async (body: ResendEmailRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signup/password/resend-confirmation-link",
    data: body,
  });

  return data;
};
export const signIn = async (body: SignInRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/password",
    data: body,
  });

  return data;
};
export const sendRestoreLink = async (body: SendRestoreLinkRequest) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/password/send-restore-link",
    data: body,
  });

  return data;
};
export const restorePassword = async (body: RestorePasswordRequest) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/password/restore",
    data: body,
  });

  return data;
};
export const signInGoogle = async (body: SignInSocialRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/google",
    data: body,
  });

  return data;
};
export const signInTikTok = async (body: SignInSocialRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/tiktok",
    data: body,
  });

  return data;
};
export const signInInstagram = async (body: SignInSocialRequest) => {
  const { data }: AxiosResponse<AuthTokenResponse> = await axiosInstance({
    method: "POST",
    url: "/signin/instagram",
    data: body,
  });

  return data;
};
export const getUserMe = async () => {
  const { data }: AxiosResponse<UserResponse> = await axiosInstance({
    method: "GET",
    url: "/users/me",
  });

  return data;
};
export const updateUser = async (body: EditUserRequest) => {
  const { data }: AxiosResponse<UserResponse> = await axiosInstance({
    method: "PUT",
    url: "/users/me",
    data: body,
  });

  return data;
};
export const getSocialAuthentications = async () => {
  const { data }: AxiosResponse<SocialAuthenticationResponse> =
    await axiosInstance({
      method: "GET",
      url: "/users/me/socials",
    });

  return data;
};
export const deleteSocialAuthentication = async (authId: number) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "DELETE",
    url: `/users/auths/${authId}`,
  });

  return data;
};
export const linkSocialAuthentication = async (
  body: LinkSocialAuthenticationRequest
) => {
  const { data }: AxiosResponse<BaseResponse> = await axiosInstance({
    method: "POST",
    url: "/users/auths",
    data: body,
  });

  return data;
};
