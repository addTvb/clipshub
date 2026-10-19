"use client";

import { useTranslations } from "next-intl";
import { FieldErrors, FormProvider, Resolver, useForm } from "react-hook-form";
import { useCreateOfferStore } from "../model/useCreateOfferStore";
import { offerThirdStepSchema } from "./model/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Divider } from "src/components/ui/divider";
import { IconCheckbox } from "src/components/ui/icon-checkbox";
import { useHoverCategory } from "src/hooks/useHoverCategory";
import clsx from "clsx";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { Textarea } from "src/components/ui/textarea";
import { FormSelect } from "src/components/ui/form-select";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { useEffect, useMemo, useRef } from "react";
import { useFormErrorScroll } from "src/hooks/useFormErrorScroll";

interface ThirdStepFormType {
  mediaChannelCategoryIDs: number[];
  language: string;
  contentBrief: string;
}

export const ThirdStepAdCategory = () => {
  const t = useTranslations("");
  const {
    nextStep,
    prevStep,
    setMediaChannelCategories,
    setLanguage,
    setContentBrief,
    mediaChannelCategoryIDs,
    language,
    contentBrief,
  } = useCreateOfferStore();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToError = useFormErrorScroll<ThirdStepFormType>(formRef);
  const methods = useForm<ThirdStepFormType>({
    resolver: valibotResolver(
      offerThirdStepSchema
    ) as Resolver<ThirdStepFormType>,
    defaultValues: {
      mediaChannelCategoryIDs: [],
      language: language || "",
      contentBrief: contentBrief || "",
    },
  });

  useEffect(() => {
    if (mediaChannelCategoryIDs.length > 0) {
      methods.setValue("mediaChannelCategoryIDs", mediaChannelCategoryIDs);
    } else {
      methods.setValue("mediaChannelCategoryIDs", [0]);
    }
  }, [mediaChannelCategoryIDs, methods]);

  const onSubmit = (form: ThirdStepFormType) => {
    const categoryIDs = form.mediaChannelCategoryIDs.filter((id) => id !== 0);
    setMediaChannelCategories(categoryIDs);
    setLanguage(form.language);
    setContentBrief(form.contentBrief);

    nextStep();
  };
  const { hoveredCategory, handleHover, handleUnHover } = useHoverCategory();
  const { mediaChannelCategories } = useMediaChannelCategory();
  const { languages } = useLanguagesDictionary();

  const handleChangeCategories = (
    values: (number | string)[],
    selectedId?: number | string
  ) => {
    const currentValues = methods.getValues("mediaChannelCategoryIDs") || [];

    const numericValues = values.map((val) =>
      typeof val === "string" ? parseInt(val, 10) : val
    );
    const numericSelectedId =
      selectedId !== undefined && typeof selectedId === "string"
        ? parseInt(selectedId, 10)
        : selectedId;

    if (numericValues.length === 0) {
      methods.setValue("mediaChannelCategoryIDs", [0]);
      return;
    }

    if (numericSelectedId !== undefined && numericSelectedId === 0) {
      methods.setValue("mediaChannelCategoryIDs", [0]);
      return;
    }

    if (numericSelectedId !== undefined && numericSelectedId !== 0) {
      if (currentValues.includes(0)) {
        methods.setValue("mediaChannelCategoryIDs", [numericSelectedId]);
      } else {
        methods.setValue(
          "mediaChannelCategoryIDs",
          numericValues.filter((id) => id !== 0)
        );
      }
      return;
    }

    methods.setValue("mediaChannelCategoryIDs", numericValues);
  };

  useEffect(() => {
    const currentCategories = methods.getValues("mediaChannelCategoryIDs");
    if (Array.isArray(currentCategories) && currentCategories.length === 0) {
      methods.setValue("mediaChannelCategoryIDs", [0]);
    }
  }, [methods]);

  const langOptions = useMemo(
    () =>
      languages?.map((lang) => ({
        id: lang.id,
        name: lang.name,
        value: String(lang.id),
        icon: lang.icon,
        slug: lang.slug,
      })) || [],
    [languages]
  );

  const onError = (errors: FieldErrors<ThirdStepFormType>) =>
    scrollToError(errors);

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-[24px]">
          <div className="text-textColor text-xl lg:text-[28px] font-bold">
            {t("business.offerForm.selectAdCategory")}
          </div>

          <div className="space-y-[16px]">
            <div className="text-lg lg:text-xl font-bold">
              {t("business.offerForm.influencerCategory")}
            </div>
            {/* TODO setup hook-form controller */}
            <div className="flex flex-wrap gap-[10px]">
              <IconCheckbox
                key="media-category-all"
                name="mediaChannelCategoryIDs"
                id={0}
                title={t("common.all")}
                selectionType="multiple"
                onChange={handleChangeCategories}
              />
              {mediaChannelCategories?.map((category) => (
                <IconCheckbox
                  key={`media-category-${category.id}`}
                  name="mediaChannelCategoryIDs"
                  id={category.id}
                  title={category.name}
                  iconPath={category.icon}
                  selectionType="multiple"
                  onHover={() => handleHover(category)}
                  onHoverLeave={handleUnHover}
                  onChange={handleChangeCategories}
                />
              ))}
            </div>
            <p
              className={clsx(
                "text-sm text-gray600 min-h-[20px] transition-opacity opacity-0 capitalize",
                hoveredCategory?.description && "opacity-100"
              )}
            >
              {hoveredCategory?.description || ""}
            </p>
          </div>

          <Divider />

          <div className="space-y-[16px]">
            <div className="text-lg lg:text-xl font-bold">
              {t("business.offerForm.contentExamplesBrief")}
            </div>

            <div className="space-y-[24px]">
              <div className="text-gray400 font-medium text-sm">
                {t.rich("business.offerForm.contentExamplesBriefDesc", {
                  bold: (chunks) => <strong>{chunks}</strong>,
                })}
              </div>

              <div className="rounded-[8px] bg-white50 space-y-[10px] p-[12px]">
                <div className="text-sm font-medium">
                  {t.rich("business.offerForm.sendLinksVideosYouLike", {
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
                <div className="text-sm font-medium">
                  {t.rich(
                    "business.offerForm.shareExamplesOfSuccessfulBrandIntegrations",
                    {
                      bold: (chunks) => <strong>{chunks}</strong>,
                    }
                  )}
                </div>
                <div className="text-sm font-medium">
                  {t.rich("business.offerForm.describeThePreferredStyle", {
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
                <div className="text-sm font-medium">
                  {t.rich("business.offerForm.highlightKeyElements", {
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
              </div>

              <Textarea
                name="contentBrief"
                rows={7}
                placeholder={t(
                  "business.offerForm.contentExamplesBriefPlaceholder"
                )}
              />
            </div>
          </div>

          <Divider />

          <div className="space-y-[10px]">
            <div className="font-bold">
              {t("business.offerForm.enterContentLanguage")}
            </div>

            <FormSelect
              defaultValue={language}
              name="language"
              options={langOptions}
              optionIcon={true}
              placeholder={t("common.language")}
            />
          </div>

          <div className="flex items-center self-end gap-[24px]">
            <Button
              className="flex items-center gap-[6px] text-base text-textColor font-bold"
              variant="text"
              onClick={prevStep}
              icon={
                <Image
                  src="/static/icons/long-arrow-left-black.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              <span>{t("common.back")}</span>
            </Button>

            <Button className="flex items-center gap-[6px]" type="submit">
              <span>{t("common.next")}</span>
              <Image
                src="/static/icons/long-arrow-right-white.svg"
                alt=""
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
