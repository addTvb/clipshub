import {
  object,
  number,
  pipe,
  transform,
  custom,
} from "valibot";

// Создаем переиспользуемую функцию для числовых полей
const createNumberField = () => pipe(
  custom((value) => value !== null && value !== undefined && !isNaN(Number(value)), "form.requiredField"),
  transform((value) => Number(value || 0)), 
  number("form.requiredField") 
);

export const channelSettingsSchema = object({
  selectedCategories: createNumberField(),
  selectedLanguage: createNumberField(),
});
