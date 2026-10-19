import { useCallback, useEffect, useMemo, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import type { BrandType } from "src/types/brands";
import { filterBrandByID } from "src/queries/business/brands/filterBrandByID";
import type { AddCampaignForm } from "./useAdCampaignForm";

export type BrandAvatarState = {
  id?: number;
  link: string;
  name: string;
};

const defaultAvatarState: BrandAvatarState = {
  id: undefined,
  link: "",
  name: "",
};

type UseBrandPrefillParams = {
  methods: UseFormReturn<AddCampaignForm>;
  brands?: BrandType[];
};

export const useBrandPrefill = ({
  methods,
  brands,
}: UseBrandPrefillParams) => {
  const brandID = useWatch({
    control: methods.control,
    name: "brandID",
  });

  const selectedBrand = useMemo(() => {
    if (brandID && brandID !== "new-brand") {
      return filterBrandByID(brandID, brands);
    }
    return undefined;
  }, [brandID, brands]);

  const [brandAvatar, setBrandAvatar] =
    useState<BrandAvatarState>(defaultAvatarState);

  const resetBrandAvatar = useCallback(() => {
    setBrandAvatar(defaultAvatarState);
  }, []);

  const updateBrandAvatar = useCallback((patch: Partial<BrandAvatarState>) => {
    setBrandAvatar((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    if (brandID === "new-brand" || !brandID) {
      methods.setValue("aboutCompany", "");
      methods.setValue("companyAvatar", undefined);
      methods.setValue("companyName", "");
      methods.setValue("selectedCategories", 0);
      resetBrandAvatar();
      return;
    }

    if (!selectedBrand) {
      resetBrandAvatar();
      return;
    }

    methods.setValue("aboutCompany", selectedBrand.description ?? "");
    methods.setValue("companyName", selectedBrand.title ?? "");
    methods.setValue(
      "selectedCategories",
      selectedBrand.business_category_id ?? 0
    );

    const logoFileID = selectedBrand.logo_file?.id;
    methods.setValue("companyAvatar", logoFileID);

    if (logoFileID && selectedBrand.logo_file?.link) {
      setBrandAvatar({
        id: logoFileID,
        link: selectedBrand.logo_file.link,
        name: selectedBrand.logo_file?.name ?? "",
      });
    } else {
      resetBrandAvatar();
    }
  }, [brandID, methods, selectedBrand, resetBrandAvatar]);

  return {
    brandID,
    selectedBrand,
    brandAvatar,
    updateBrandAvatar,
    resetBrandAvatar,
  };
};

