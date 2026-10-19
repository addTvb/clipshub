import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Modal } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { AdBrandForm } from "./AdBrandForm";
import { useBrandForm } from "./model/useBrandForm";
import { useBrandModalState } from "./model/useBrandModalState";
import { useHoverCategory } from "src/hooks/useHoverCategory";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";

export const AdBrandModal = () => {
  const t = useTranslations();

  const { openModal, setOpen } = useBrandModalState();
  const { methods, loading, onSubmit } = useBrandForm("create", setOpen);
  const { hoveredCategory, handleHover, handleUnHover } = useHoverCategory();
  const { businessCategories } = useBusinessCategory();

  useEffect(() => {
    if (openModal) methods.reset();
  }, [openModal, methods]);

  return (
    <FormProvider {...methods}>
      <Modal
        open={openModal}
        setIsOpen={setOpen}
        className="max-w-[710px]"
        withCross
        mobileBreakpoint={750}
        title={t("business.brand.createABrand")}
        renderFooter={() => (
          <Button
            type="submit"
            loading={loading}
            onClick={methods.handleSubmit(onSubmit)}
            className="w-full"
          >
            {t("common.create")}
          </Button>
        )}
      >
        <AdBrandForm
          methods={methods}
          onSubmit={onSubmit}
          businessCategories={businessCategories}
          hoveredCategory={hoveredCategory}
          handleHover={handleHover}
          handleUnHover={handleUnHover}
        />
      </Modal>
    </FormProvider>
  );
};
