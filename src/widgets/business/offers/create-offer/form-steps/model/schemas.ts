import {
  string,
  nonEmpty,
  pipe,
  minLength,
  maxLength,
  object,
  picklist,
  number,
  array,
  minValue,
  optional,
  boolean,
  maxValue,
  union,
  literal,
  url,
  forward,
  check,
} from "valibot";
import { dynamicLinksSchema } from "src/features/business/offers/model/dynamicLinksSchema";

export const socialPlatformSchema = pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField")
);
export const offerNameSchema = pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField"),
  minLength(2, "form.tooLittleWithSymbol"),
  maxLength(100, "form.tooManyCharacters")
);
export const offerFirstStepSchema = object({
  offerName: offerNameSchema,
  socialPlatform: socialPlatformSchema,
});

const AD_POSITIONS = [
  "left-top",
  "right-top",
  "left-center",
  "right-center",
  "left-bottom",
  "right-bottom",
  "top",
  "center",
  "bottom",
] as const;

const DURATION_OPTIONS = ["entire"] as const;

const adPositionSchema = pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField"),
  picklist(AD_POSITIONS, "form.chooseAdPosition")
);
const adDurationSchema = pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField"),
  picklist(DURATION_OPTIONS, "form.chooseAdDuration")
);
const linkSchema = optional(
  union([literal(""), pipe(string(), url("form.incorrectUrl"))])
);
export const requiredLinkSchema = pipe(
  string("form.requiredField"),
  nonEmpty("form.requiredField"),
  url("form.incorrectUrl")
);
// const descriptionSchema = pipe(
//   string("form.requiredField"),
//   nonEmpty("form.requiredField"),
//   minLength(20, "form.tooLittleWithSymbol20")
// );
const optionalDescriptionSchema = optional(
  pipe(string(), maxLength(1000, "form.maxLengthIs1000"))
);
const optionalDescriptionSchema100 = optional(
  pipe(string(), maxLength(100, "form.maxLengthIs100"))
);
const videoAdIDSchema = number("form.requiredField");

export const instagramSecondStepSchema = pipe(
  object({
    adFileID: optional(videoAdIDSchema),
    adPosition: optional(adPositionSchema),
    adDuration: optional(adDurationSchema),
    instagramDescriptionBio: optionalDescriptionSchema,
    descriptionReels: optionalDescriptionSchema,
    instagramLinkBio: linkSchema,
    // pinnedComment: optionalDescriptionSchema,
    adType: optionalDescriptionSchema,
    dynamicLinks: optional(dynamicLinksSchema),
    clipperAvatarFileID: optional(videoAdIDSchema),
  }),
);
export const youTubeSecondStepSchema = pipe(
  object({
    adFileID: optional(videoAdIDSchema),
    adPosition: optional(adPositionSchema),
    adDuration: optional(adDurationSchema),
    youTubeDescriptionBio: optionalDescriptionSchema,
    descriptionShorts: optionalDescriptionSchema100,
    // pinnedComment: optionalDescriptionSchema,
    youTubeLinkBio: linkSchema,
    adType: optionalDescriptionSchema,
    dynamicLinks: optional(dynamicLinksSchema),
    clipperAvatarFileID: optional(videoAdIDSchema),
  }),
);
export const tikTokSecondStepSchema = pipe(
  object({
    adFileID: optional(videoAdIDSchema),
    adPosition: optional(adPositionSchema),
    adDuration: optional(adDurationSchema),
    tikTokDescriptionBio: optionalDescriptionSchema,
    descriptionTikTok: optionalDescriptionSchema,
    tikTokLinkBio: linkSchema,
    adType: optionalDescriptionSchema,
    dynamicLinks: optional(dynamicLinksSchema),
    clipperAvatarFileID: optional(videoAdIDSchema),
  }),
);
export const offerThirdStepSchema = pipe(
  object({
    mediaChannelCategoryIDs: pipe(
      array(number("form.requiredField")),
      minLength(1, "form.requiredField")
    ),
    language: pipe(
      string("form.requiredField"),
      nonEmpty("form.requiredField")
    ),
    contentBrief: optionalDescriptionSchema,
  })
);
export const fourthStepSchema = pipe(
  object({
    avgChannelViews: pipe(
      string("form.requiredField"),
      minLength(1, "form.selectAtLeastOneValue")
    ),
    payoutAmount: optional(
      union([
        literal(""),
        pipe(
          number("form.mustBeNumber"),
          minValue(0.00001, "form.positiveNumber"),
          maxValue(100, "form.maxValueIs100dollars")
        )
      ])
    ),
    lifetimePost: pipe(
      number("form.mustBeNumber"),
      minValue(1, "form.positiveNumber"),
      maxValue(30, "form.maxValueIs30days")
    ),
    payoutPerPost: optional(
      union([
        literal(""),
        pipe(
          number("form.mustBeNumber"),
          minValue(0, "form.positiveNumber"),
          maxValue(1000, "form.maxValueIs1000dollars")
        )
      ])
    ),
    view_bonuses: optional(
      array(
        object({
          views_count: pipe(
            number("form.mustBeNumber"),
            minValue(1, "form.positiveNumber")
          ),
          bonus_sum: pipe(
            number("form.mustBeNumber"),
            minValue(0, "form.positiveNumber"),
            maxValue(1000000, "form.maxValueIsOneMilDollars")
          ),
        })
      )
    ),
  }),
  forward(
    check(
      ({ payoutAmount, view_bonuses }) => {
        const hasPayoutAmount = typeof payoutAmount === "number" && payoutAmount > 0;
        const hasViewBonuses = Array.isArray(view_bonuses) && view_bonuses.length > 0;
        return hasPayoutAmount || hasViewBonuses;
      },
      "form.atLeastOnePayoutFieldRequired"
    ),
    ["payoutAmount"]
  )
);

export const fifthStepSchema = pipe(
  object({
    isBudgetUnlimit: optional(boolean()),
    budget: optional(
      pipe(number(), maxValue(10000000, "form.maxValueIsTenMildollars"))
    ),
  })
  // forward(
  //   check(
  //     ({ budget = 0, isBudgetUnlimit }) => isBudgetUnlimit || budget > 0,
  //     "form.budgetShouldBeMoreThanZero"
  //   ),
  //   ["budget"]
  // ),
  // forward(
  //   check(
  //     ({ budget, isBudgetUnlimit }) =>
  //       isBudgetUnlimit || typeof budget === "number",
  //     "form.requiredField"
  //   ),
  //   ["budget"]
  // )
);
