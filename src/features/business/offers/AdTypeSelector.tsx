import React from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { IconCheckbox } from "../../../components/ui/icon-checkbox";
import { FormFieldError } from "../../../components/ui/form-field-error";
import { AD_TYPES } from "./model/adTypes";
import { AdType } from "src/types/base";

interface IProps {
  name: string;
}

const hints: Partial<Record<AdType, string>> = {
  banner: "business.offerForm.bannerTypeHint",
  half_screen: "business.offerForm.halfScreenTypeHint",
  influencer_content: "business.offerForm.influencerContentTypeHint",
  dedicate: "business.offerForm.dedicateTypeHint",
  integration: "business.offerForm.integrationTypeHint",
  challenge: "business.offerForm.challengeTypeHint",
};

export const AdTypeSelector = ({ name }: IProps) => {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const adType = getValues(name) as AdType;

  return (
    <div className="space-y-[16px]">
      <div className="text-textColor text-base font-bold">
        {t("business.offerForm.chooseAdType")}
      </div>

      {/* Hidden input to register field with validation rules */}
      <input
        type="hidden"
        {...register(name, { required: "validation.required" })}
      />
      <div className="space-y-[8px]">
        <div className="flex flex-wrap gap-[12px]">
          {AD_TYPES.map((type) => (
            <IconCheckbox
              key={type.value}
              name={name}
              id={type.value}
              selectionType="radio"
              iconPath={"icon" in type ? type.icon : undefined}
              title={t(type.title)}
              className="max-[540px]:w-full max-[540px]:justify-center"
            />
          ))}
        </div>

        {(() => {
          const fieldErrors = errors as FieldErrors<Record<string, unknown>>;
          const fieldError = fieldErrors?.[name] as
            | { message?: string }
            | undefined;
          return (
            <FormFieldError
              visible={Boolean(fieldError)}
              messageKey={fieldError?.message || undefined}
            />
          );
        })()}
        {adType && hints[adType] && (
          <div className="text-sm text-gray600">{t(hints[adType])}</div>
        )}
      </div>
    </div>
  );
};
