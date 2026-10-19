import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { IntlErrorCode } from "next-intl";
import { loadMessagesForLocale } from "./loadMessages";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  // Загружаем сообщения для локали с fallback на английский
  const messages = await loadMessagesForLocale(locale);

  return {
    locale,
    messages,
    timeZone: "UTC",

    // Настройка обработки ошибок для отсутствующих переводов
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Логируем отсутствующие переводы только в режиме разработки
        if (process.env.NODE_ENV === "development") {
          console.warn("Missing translation:", error.message);
        }
      } else {
        // Другие ошибки могут указывать на баги в приложении
        console.error("Internationalization error:", error);
      }
    },

    // Fallback для отсутствующих переводов
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // В режиме разработки показываем путь к отсутствующему переводу
        if (process.env.NODE_ENV === "development") {
          return `[Missing: ${path}]`;
        }
        // В продакшене просто возвращаем ключ
        return path;
      } else {
        return `[Error: ${path}]`;
      }
    },
  };
});
