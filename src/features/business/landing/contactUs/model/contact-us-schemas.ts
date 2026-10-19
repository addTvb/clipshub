import * as v from "valibot";
import { ContactUsRequest } from "src/types/contact-us";

// Универсальная валидация телефонного номера для любой страны
const phoneValidation = v.pipe(
  v.string(),
  v.trim(),
  v.regex(
    /^[\+]?[1-9][\d]{0,3}[-.\s]?[(]?[\d]{1,4}[)]?[-.\s]?[\d]{1,4}[-.\s]?[\d]{1,9}$/,
    "business.landing.contactUs.phoneInvalid"
  ),
  v.minLength(7, "business.landing.contactUs.phoneMinLength"),
  v.maxLength(20, "business.landing.contactUs.phoneMaxLength")
);

export const contactUsSchema = v.pipe(
  v.object({
    email: v.optional(
      v.union([
        v.literal(""),
        v.pipe(
          v.string(),
          v.email("business.landing.contactUs.emailInvalid")
        )
      ])
    ),
    phone: v.optional(
      v.union([
        v.literal(""),
        phoneValidation
      ])
    ),
    brandName: v.optional(v.string()),
    messenger: v.optional(v.string()),
    about: v.optional(v.string()),
    categories: v.array(v.number()),
    language: v.string(),
  }),
  v.check(
    (input) => {
      const hasEmail = Boolean(input.email && input.email.trim() !== "");
      return hasEmail;
    },
    "email_or_phone_required"
  )
);

export type ContactUsFormData = v.InferInput<typeof contactUsSchema>;

// Функция для преобразования данных формы в формат API
export const transformFormDataToApi = (formData: ContactUsFormData): ContactUsRequest => {
  return {
    about: formData.about || "",
    brand_name: formData.brandName || "",
    business_category_ids: formData.categories,
    email: formData.email || "",
    phone: formData.phone || undefined,
    messenger: formData.messenger || undefined,
    language: formData.language,
  };
};