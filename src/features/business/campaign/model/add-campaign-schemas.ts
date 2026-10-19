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
  boolean,
  union,
} from "valibot";

// const imageSchema = pipe(
//   file("form.uploadOneFile"),
//   mimeType(["image/jpeg", "image/png"], "form.invalidFileFormat"),
//   maxSize(fiveMegabyte, "form.fileTooLarge")
// );

export const addCampaignSchema = object({
  // companyAvatar: imageSchema,
  selectedCategories: number("form.requiredField"),
  companyAvatar: optional(number()),
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
  brandID: optional(pipe(union([number(), string()]))),
});
