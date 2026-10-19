import { useTranslations } from "next-intl";
import React from "react";
import { DragAndDrop, FileStoreActions } from "src/components/ui/drag-and-drop";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { AddBrandForm } from "./model/useBrandForm";
import { UseFormReturn } from "react-hook-form";
import { BusinessCategorySelector } from "src/features/business/campaign/components/modal/BusinessCategorySelector";
import type { DictionaryType } from "src/types/category";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<AddBrandForm, any, AddBrandForm>;
  onSubmit: (form: AddBrandForm) => void;
  storeActions?: FileStoreActions;
  businessCategories?: DictionaryType[];
  hoveredCategory: DictionaryType | null;
  handleHover: (category: DictionaryType) => void;
  handleUnHover: () => void;
}

export const AdBrandForm = ({
  methods,
  storeActions,
  onSubmit,
  businessCategories,
  hoveredCategory,
  handleHover,
  handleUnHover,
}: IProps) => {
  const t = useTranslations();

  const categoryErrorKey =
    methods.formState.errors.selectedCategories?.message;

  return (
    <form
      className="flex flex-col gap-[32px]"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <h4 className="text-base font-bold">
            {t("business.brand.brandAvatar")}
          </h4>
          <DragAndDrop
            name="brandAvatarID"
            type="image"
            storeActions={storeActions}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <h4 className="text-base font-bold">
            {t("business.enterCompanyName")}
          </h4>
          <Input
            name="nameBrand"
            placeholder={t("business.companyName")}
            icon="/static/icons/portfolio.svg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h4 className="text-base font-bold">
          {t("business.aboutYourCompany")}
        </h4>
        <Textarea
          name="descriptionBrand"
          rows={4}
          placeholder={t("business.aboutYourCompanyPlaceholder")}
        />
      </div>

      <BusinessCategorySelector
        t={t}
        categories={businessCategories}
        hoveredCategory={hoveredCategory}
        handleHover={handleHover}
        handleUnHover={handleUnHover}
        categoryErrorKey={categoryErrorKey}
      />
    </form>
  );
};
