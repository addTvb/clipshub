import React, { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { Modal } from "src/components/ui/dialog";
import { useAdCampaignForm } from "./model/useAdCampaignForm";
import { useBrandPrefill } from "./model/useBrandPrefill";
import { useBrandCreation } from "./model/useBrandCreation";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { useGetUser } from "src/queries/useGetUser";
import { useAdCampaignState } from "./model/useAdCampaignState";
import { BrandSelect } from "./BrandSelect";
import { useAllBrands } from "src/queries/business/brands/useAllBrands";
import { useCreateBrand } from "src/queries/business/brands/useCreateBrand";
import { useQueryClient } from "@tanstack/react-query";
import { BrandDetailsSection } from "./components/modal/BrandDetailsSection";
import { CampaignNameSection } from "./components/modal/CampaignNameSection";

export const AdCampaignModal = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { openModal, setOpen } = useAdCampaignState();

  const { methods, onSubmit, pendingCreateCampaign } =
    useAdCampaignForm(setOpen);

  const { featureFlags } = useGetUser();
  const { brands, refetchBrands } = useAllBrands();
  const { createBrandMutateAsync, pendingCreateBrand } = useCreateBrand();

  const { brandID, brandAvatar, updateBrandAvatar } = useBrandPrefill({
    methods,
    brands,
  });

  const { handleNewBrandSubmission } = useBrandCreation({
    createBrandMutateAsync,
    methods,
    onSubmit,
    queryClient,
    refetchBrands,
  });

  const handleCreateCampaign = useMemo(
    () =>
      methods.handleSubmit((form) => {
        if (form.brandID === "new-brand") {
          handleNewBrandSubmission(form);
          return;
        }

        onSubmit(form);
      }),
    [handleNewBrandSubmission, methods, onSubmit]
  );

  return (
    <FormProvider {...methods}>
      <Modal
        open={openModal}
        setIsOpen={setOpen}
        className="max-w-[710px]"
        withCross
        mobileBreakpoint={750}
        title={t("business.createCampaign")}
        renderFooter={() => (
          <Button
            type="submit"
            loading={pendingCreateCampaign || pendingCreateBrand}
            onClick={handleCreateCampaign}
            className="w-full"
          >
            {t("common.confirm")}
          </Button>
        )}
      >
        <form
          className="flex flex-col gap-[32px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[32px]">
            <CampaignNameSection t={t} />

            <BrandSelect name="brandID" />

            {brandID && (
              <BrandDetailsSection
                t={t}
                brandAvatar={brandAvatar}
                onAvatarChange={updateBrandAvatar}
                watermarkFee={featureFlags?.ad_campaign_fee_pct}
                watermarkDiscount={
                  featureFlags?.ad_campaign_watermark_fee_discount_pct
                }
              />
            )}
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};
