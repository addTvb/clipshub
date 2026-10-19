import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { Modal } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { useBrandPrefill } from "./model/useBrandPrefill";
import { useBrandCreation } from "./model/useBrandCreation";
import { BrandSelect } from "./BrandSelect";
import { BrandDetailsSection } from "./components/modal/BrandDetailsSection";
import { CampaignNameSection } from "./components/modal/CampaignNameSection";
import { useGetUser } from "src/queries/useGetUser";
import { useAllBrands } from "src/queries/business/brands/useAllBrands";
import { useCreateBrand } from "src/queries/business/brands/useCreateBrand";
import { useUpdateBrand } from "src/queries/business/brands/useUpdateBrand";
import { useQueryClient } from "@tanstack/react-query";
import { useEditCampaignState } from "./model/useEditCampaignState";
import {
  AddCampaignForm,
  getCampaignFormDefaultValues,
  useCampaignFormMethods,
} from "./model/useAdCampaignForm";
import { useUpdateCampaign } from "src/queries/business/useUpdateCampaign";
import { CampaignType, CreateCampaignRequest } from "src/types/campaigns";
import toast from "react-hot-toast";

const normalizeBrandIDValue = (
  value: string | number | null | undefined
): number | null => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    if (!value.trim() || value === "new-brand") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

const normalizeFileID = (
  value: number | string | null | undefined
): number | undefined => {
  if (typeof value === "number") {
    return value > 0 ? value : undefined;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed);
    return Number.isNaN(parsed) || parsed <= 0 ? undefined : parsed;
  }
  return undefined;
};

const normalizeText = (value?: string | null) =>
  typeof value === "string" ? value.trim() : "";

type EditCampaignModalProps = {
  campaigns?: CampaignType[];
};

export const EditCampaignModal = ({ campaigns }: EditCampaignModalProps) => {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const queryClient = useQueryClient();

  const { openModal, setOpen, selectedCampaignID } = useEditCampaignState();

  const methods = useCampaignFormMethods();

  const { featureFlags } = useGetUser();
  const { brands, refetchBrands } = useAllBrands();
  const { createBrandMutateAsync, pendingCreateBrand } = useCreateBrand();
  console.log(methods.getValues());

  const {
    brandID,
    brandAvatar,
    updateBrandAvatar,
    resetBrandAvatar,
    selectedBrand,
  } = useBrandPrefill({
    methods,
    brands,
  });

  const normalizedSelectedBrandID = useMemo(
    () => normalizeBrandIDValue(brandID),
    [brandID]
  );

  const { updateBrandMutateAsync, updateBrandLoading } = useUpdateBrand(
    normalizedSelectedBrandID
  );

  const selectedCampaign = useMemo(
    () =>
      campaigns?.find(
        (campaignItem) =>
          campaignItem?.ad_campaign?.id === selectedCampaignID
      ),
    [campaigns, selectedCampaignID]
  );

  const lastPrefilledCampaignID = useRef<number | null>(null);

  useEffect(() => {
    if (!openModal) {
      methods.reset(getCampaignFormDefaultValues());
      lastPrefilledCampaignID.current = null;
      resetBrandAvatar();
      return;
    }

    if (
      !selectedCampaign ||
      selectedCampaignID === null ||
      lastPrefilledCampaignID.current === selectedCampaignID
    ) {
      return;
    }

    const logoFile = selectedCampaign.brand?.logo_file;

    methods.reset(
      getCampaignFormDefaultValues({
        campaignName: selectedCampaign.ad_campaign?.title ?? "",
        companyName:
          selectedCampaign.brand?.title ??
          selectedCampaign.ad_campaign?.business_name ??
          "",
        aboutCompany:
          selectedCampaign.brand?.description ??
          selectedCampaign.ad_campaign?.business_description ??
          "",
        companyAvatar:
          logoFile?.id ?? selectedCampaign.ad_campaign?.logo_file_id ?? undefined,
        selectedCategories:
          selectedCampaign.business_category_ids?.[0] ??
          selectedCampaign.brand?.business_category_id ??
          0,
        enableWatermark: Boolean(
          selectedCampaign.ad_campaign?.settings?.allow_platform_watermark
        ),
        brandID: selectedCampaign.brand?.id ?? "",
      })
    );

    if (logoFile?.id && logoFile.link) {
      updateBrandAvatar({
        id: logoFile.id,
        link: logoFile.link,
        name: logoFile.name ?? "",
      });
    } else {
      resetBrandAvatar();
    }

    lastPrefilledCampaignID.current = selectedCampaignID;
  }, [
    openModal,
    methods,
    selectedCampaign,
    selectedCampaignID,
    resetBrandAvatar,
    updateBrandAvatar,
  ]);

  const { mutateAsync: updateCampaignMutateAsync, isPending: pendingUpdate } =
    useUpdateCampaign();

  const handleUpdateCampaignSubmit = useCallback(
    async (form: AddCampaignForm) => {
      if (!selectedCampaignID) return;

      const normalizedBrandID = normalizeBrandIDValue(form.brandID);
      if (!normalizedBrandID) {
        return;
      }

      const categoryID = selectedBrand?.business_category_id ?? form.selectedCategories;

      const payload: CreateCampaignRequest = {
        brand_id: normalizedBrandID,
        business_category_ids: categoryID > 0 ? [categoryID] : [],
        title: form.campaignName,
        settings: {
          allow_platform_watermark: form.enableWatermark,
        },
      };

      const brandLogoIDFromForm = normalizeFileID(form.companyAvatar);
      const sameBrandSelected =
        selectedBrand?.id !== undefined &&
        Number(selectedBrand.id) === normalizedBrandID;
      const existingBrandLogoID = normalizeFileID(
        selectedBrand?.logo_file?.id
      );
      const nameChanged =
        normalizeText(form.companyName) !==
        normalizeText(selectedBrand?.title ?? "");
      const descriptionChanged =
        normalizeText(form.aboutCompany) !==
        normalizeText(selectedBrand?.description ?? "");
      const logoChanged =
        brandLogoIDFromForm !== undefined &&
        brandLogoIDFromForm !== existingBrandLogoID;

      const shouldUpdateBrand =
        sameBrandSelected && (nameChanged || descriptionChanged || logoChanged);

      try {
        if (shouldUpdateBrand) {
          const logoFileID = brandLogoIDFromForm ?? existingBrandLogoID;
          if (!logoFileID) {
            methods.setError("companyAvatar", {
              type: "manual",
              message: "form.requiredField",
            });
            return;
          }

          await updateBrandMutateAsync({
            title: form.companyName,
            description: form.aboutCompany,
            logo_file_id: logoFileID,
          });
        }

        await updateCampaignMutateAsync({
          id: selectedCampaignID,
          body: payload,
        });
        toast.success("Campaign updated");
        methods.reset(getCampaignFormDefaultValues());
        setOpen(false);
      } catch (error) {
        console.error("Failed to save campaign changes", error);
        toast.error("Failed to save campaign changes");
      }
    },
    [
      methods,
      selectedBrand,
      selectedCampaignID,
      setOpen,
      updateBrandMutateAsync,
      updateCampaignMutateAsync,
    ]
  );

  const { handleNewBrandSubmission } = useBrandCreation({
    createBrandMutateAsync,
    methods,
    onSubmit: handleUpdateCampaignSubmit,
    queryClient,
    refetchBrands,
  });

  const handleSubmitWithBrand = useMemo(
    () =>
      methods.handleSubmit((form) => {
        if (form.brandID === "new-brand") {
          handleNewBrandSubmission(form);
          return;
        }

        handleUpdateCampaignSubmit(form);
      }),
    [handleNewBrandSubmission, handleUpdateCampaignSubmit, methods]
  );

  return (
    <FormProvider {...methods}>
      <Modal
        open={openModal}
        setIsOpen={setOpen}
        className="max-w-[710px]"
        withCross
        mobileBreakpoint={750}
        title="Edit Campaign"
        renderFooter={() => (
          <Button
            type="submit"
            loading={
              pendingUpdate || pendingCreateBrand || updateBrandLoading
            }
            onClick={handleSubmitWithBrand}
            className="w-full"
            disabled={
              !selectedCampaignID || pendingCreateBrand || updateBrandLoading
            }
          >
            {tCommon("change")}
          </Button>
        )}
      >
        <form
          className="flex flex-col gap-[32px]"
          onSubmit={handleSubmitWithBrand}
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


