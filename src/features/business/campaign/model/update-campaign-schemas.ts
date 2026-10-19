// import { fiveMegabyte } from "src/config/fileSizes";
import {
  object,
  string,
  maxLength,
  pipe,
  // file,
  // mimeType,
  // maxSize,
  number,
  optional,
  minLength,
  union,
  boolean,
} from "valibot";

// const imageSchema = pipe(
//   file("form.uploadOneFile"),
//   mimeType(["image/jpeg", "image/png"], "form.invalidFileFormat"),
//   maxSize(fiveMegabyte, "form.fileTooLarge")
// );

export const updateCampaignSchema = object({
  // companyAvatar: imageSchema,
  selectedCategories: number("form.requiredField"),
  companyAvatar: optional(union([number(), string()])),
  campaignName: pipe(
    string("form.requiredField"),
    minLength(1, "form.requiredField"),
    maxLength(100, "form.tooManyCharacters")
  ),
  companyName: pipe(
    string("form.requiredField"),
    minLength(1, "form.requiredField"),
    maxLength(100, "form.tooManyCharacters")
  ),
  aboutCompany: pipe(
    string("form.requiredField"),
    minLength(1, "form.requiredField")
  ),
  enableWatermark: boolean("form.requiredField"),
});
