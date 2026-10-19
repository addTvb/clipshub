import {
  string,
  pipe,
  nonEmpty,
  object
} from "valibot";

// Создаем валидацию для поля ссылки
const createLinkField = () => pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField")
);

export const postLinkSchema = object({
  shortsLink: createLinkField()
});
