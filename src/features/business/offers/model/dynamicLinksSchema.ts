import { object, string, url, pipe, array, maxLength, optional, union, literal } from "valibot";

export const linkItemSchema = object({
  // Поле заголовка не обязательно: допускаем отсутствие, пустую строку или строку до 100 символов
  title: optional(
    union([
      literal(""),
      pipe(string(), maxLength(100, "form.tooManyCharacters"))
    ])
  ),
  // Поле ссылки не обязательно: допускаем отсутствие, пустую строку или валидный URL
  link: optional(
    union([
      literal(""),
      pipe(string(), url("form.invalidUrl"))
    ])
  ),
});

export const dynamicLinksSchema = array(linkItemSchema);

// Схема для обязательных динамических ссылок
export const requiredDynamicLinksSchema = array(linkItemSchema);
