import axios, { AxiosHeaders, type AxiosRequestHeaders } from "axios";
import {
  AUTH_COOKIE_NAME,
  BRAND_SCOPE_COOKIE,
  RU_AVAILABLE_COOKIE,
  USER_TYPE_COOKIE_NAME,
} from "src/config/cookies";
import { LOCALES, DEFAULT_LOCALE } from "src/i18n/routing";
import Cookies from "js-cookie";
import { isRuAvailable } from "src/lib/isRuAvailable";
import { getHeaderFromConfig, setHeaderOnConfig } from "src/lib/http/headers";
import { getClientAcceptLanguage } from "src/lib/lang/clientAcceptLanguage";
import { BRAND_SCOPE_HEADER } from "src/config/app";

// Function to get the current locale from the URL
const getCurrentLocale = (): string => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  // Check if the first segment is a valid locale
  if (firstSegment && LOCALES.includes(firstSegment as never)) {
    if (firstSegment === "pt-br") return "pt";
    return firstSegment;
  }

  return DEFAULT_LOCALE;
};

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const firstSegment = segments[1] || "";

      const getHeader = (name: string): string | undefined =>
        getHeaderFromConfig(
          config.headers as AxiosHeaders | AxiosRequestHeaders,
          name
        );
      const setHeader = (name: string, value: string) =>
        setHeaderOnConfig(
          config.headers as AxiosHeaders | AxiosRequestHeaders,
          name,
          value
        );

      const cfCountry =
        getHeader("cf-ipcountry") ?? getHeader("CF-IPCountry") ?? "";
      const currentRuCookie = Cookies.get(RU_AVAILABLE_COOKIE);

      const clientAcceptLanguage = getClientAcceptLanguage();
      const ruShouldBeAvailable = isRuAvailable(
        cfCountry,
        clientAcceptLanguage,
        currentRuCookie || "",
        firstSegment
      );

      const currentLocale =
        ruShouldBeAvailable && getCurrentLocale() !== "ru"
          ? `${getCurrentLocale()},ru`
          : getCurrentLocale();

      setHeader("Accept-Language", currentLocale);

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
