import { any, number, object, optional, pipe, string } from "valibot";

export const createBrandSchema = pipe(
  object({
    brandAvatarID: optional(any()),
    nameBrand: optional(string()),
    descriptionBrand: optional(string()),
    selectedCategories: number("form.requiredField"),
  })
);
