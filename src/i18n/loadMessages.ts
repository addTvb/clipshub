import deepmerge from "deepmerge";
import type { AbstractIntlMessages } from "next-intl";

/**
 * Загружает сообщения для указанной локали с fallback на английский
 * @param locale - Локаль для загрузки сообщений
 * @returns Объект с сообщениями для указанной локали
 */
export async function loadMessagesForLocale(
  locale: string
): Promise<AbstractIntlMessages> {
  // Загружаем английские сообщения как fallback
  const defaultMessages = (await import(`../messages/en.json`)).default;

  let messages = defaultMessages;

  // Если локаль не английская, загружаем и объединяем с fallback
  if (locale !== "en") {
    try {
      const localeMessages = (await import(`../messages/${locale}.json`))
        .default;
      // Объединяем: английский как база, затем накладываем переводы локали
      messages = deepmerge(defaultMessages, localeMessages);
    } catch {
      // Если файл локали не найден, используем только английский
      console.warn(
        `Messages file for locale "${locale}" not found, falling back to English`
      );
      messages = defaultMessages;
    }
  }

  return messages;
}

