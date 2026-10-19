import Cookies from "js-cookie";
import { monthInSeconds, BANNER_CLOSED_COOKIE } from "src/config/cookies";

export const cookieSetter = (key: string, value: string) => {
  const isDev = process.env.NODE_ENV === "development";

  Cookies.set(key, value, {
    expires: monthInSeconds,
    path: "/",
    secure: isDev ? false : true, // Локально отключаем для теста в Safari
    sameSite: "lax", // Менее строгий чем "strict", но безопасный для Safari
  });
};

export const setBannerClosedCookie = () => {
  Cookies.set(BANNER_CLOSED_COOKIE, "true", {
    expires: 1, // 1 день (в днях)
    path: "/",
    secure: true,
    sameSite: "lax",
  });
};

export const isBannerClosed = (): boolean => {
  return !!Cookies.get(BANNER_CLOSED_COOKIE);
};
