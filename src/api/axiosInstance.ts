import axios, { AxiosHeaders, type AxiosRequestHeaders } from "axios";
import {
  AUTH_COOKIE_NAME,
  BRAND_SCOPE_COOKIE,
  USER_TYPE_COOKIE_NAME,
} from "src/config/cookies";
import Cookies from "js-cookie";
import { setHeaderOnConfig } from "src/lib/http/headers";
import { BRAND_SCOPE_HEADER } from "src/config/app";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const setHeader = (name: string, value: string) =>
        setHeaderOnConfig(
          config.headers as AxiosHeaders | AxiosRequestHeaders,
          name,
          value
        );

      setHeader("Accept-Language", "en");

      const brandScopeCookie = Cookies.get(BRAND_SCOPE_COOKIE);
      if (brandScopeCookie) setHeader(BRAND_SCOPE_HEADER, brandScopeCookie);

      const authCookie = Cookies.get(AUTH_COOKIE_NAME);
      if (authCookie) config.headers.Authorization = `Bearer ${authCookie}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
const isMockApi =
  process.env.NEXT_PUBLIC_API_URL?.includes("/api/mock") ?? false;

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // В mock-режиме без бэкенда не выкидываем на логин при 401
    if (error.status === 401 && !isMockApi) {
      Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
      Cookies.remove(USER_TYPE_COOKIE_NAME, { path: "/" });
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
