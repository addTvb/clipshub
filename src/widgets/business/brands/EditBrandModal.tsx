import React from "react";
import { FormProvider } from "react-hook-form";
import { Modal } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { AdBrandForm } from "./AdBrandForm";
import { useBrandForm } from "./model/useBrandForm";
import { useBrandModalState } from "./model/useBrandModalState";
import { useHoverCategory } from "src/hooks/useHoverCategory";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";

export const EditBrandModal = () => {
  const t = useTranslations();

  const { openEditModal, setOpenEditModal } = useBrandModalState();
  const { methods, storeActions, loading, onSubmit } = useBrandForm(
    "edit",
    setOpenEditModal
  );
  const { hoveredCategory, handleHover, handleUnHover } = useHoverCategory();
  const { businessCategories } = useBusinessCategory();

  return (
    <FormProvider {...methods}>
      <Modal
        open={openEditModal}
        setIsOpen={setOpenEditModal}
        className="max-w-[710px]"
        withCross
        mobileBreakpoint={750}
        title={t("business.brand.editBrand")}
        renderFooter={() => (
          <Button
            type="submit"
            loading={loading}
            onClick={methods.handleSubmit(onSubmit)}
            className="w-full"
          >
            {t("common.change")}
          </Button>
        )}
      >
        <AdBrandForm
          methods={methods}
          onSubmit={onSubmit}
          storeActions={storeActions}
          businessCategories={businessCategories}
          hoveredCategory={hoveredCategory}
          handleHover={handleHover}
          handleUnHover={handleUnHover}
        />
      </Modal>
    </FormProvider>
  );
};
