import { useCallback } from "react";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import type { BrandType } from "src/types/brands";
import type { AddCampaignForm } from "./useAdCampaignForm";
import { queryKeys } from "src/config/queryKeys";
import type { UseFormReturn } from "react-hook-form";

type CreateBrandPayload = {
  title: string;
  description: string;
  logo_file_id: number;
  business_category_id?: number;
};

type UseBrandCreationParams = {
  methods: UseFormReturn<AddCampaignForm>;
  onSubmit: (form: AddCampaignForm) => void;
  createBrandMutateAsync: (payload: CreateBrandPayload) => Promise<unknown>;
  refetchBrands: () => Promise<{ data?: { brands?: BrandType[] } }>;
  queryClient: QueryClient;
};

const matchCreatedBrand = (
  brandList: BrandType[] | undefined,
  companyName?: string,
  logoFileID?: number
) => {
  if (!Array.isArray(brandList)) return undefined;

  const normalizedCompanyName = companyName?.trim().toLowerCase();

  return brandList.find((brand) => {
    if (!brand?.title) return false;
    const brandTitle = brand.title.trim().toLowerCase();
    const sameTitle = normalizedCompanyName && brandTitle === normalizedCompanyName;

    if (!sameTitle) return false;

    if (logoFileID) {
      return brand.logo_file?.id === logoFileID;
    }

    return true;
  })?.id;
};

const extractCreatedBrandID = (
  response: unknown,
  companyName: string,
  logoFileID?: number,
  brandList?: BrandType[]
) => {
  if (!response) return undefined;
  const responseBrand = (response as { brand?: BrandType }).brand;
  if (responseBrand?.id) return responseBrand.id;

  const responseBrandID = (response as { brand_id?: number }).brand_id;
  if (responseBrandID) return responseBrandID;

  const directID = (response as { id?: number }).id;
  if (directID) return directID;

  const responseBrands = (response as { brands?: BrandType[] }).brands;
  const matchedInResponse = matchCreatedBrand(
    responseBrands,
    companyName,
    logoFileID
  );
  if (matchedInResponse) return matchedInResponse;

  return matchCreatedBrand(brandList, companyName, logoFileID);
};

export const useBrandCreation = ({
  createBrandMutateAsync,
  methods,
  onSubmit,
  queryClient,
  refetchBrands,
}: UseBrandCreationParams) => {
  const handleNewBrandSubmission = useCallback(
    async (form: AddCampaignForm) => {
      const logoFileID = Number(form.companyAvatar);

      if (!logoFileID) {
        methods.setError("companyAvatar", {
          type: "manual",
          message: "form.requiredField",
        });
        return;
      }

      try {
        const response = await createBrandMutateAsync({
          title: form.companyName,
          description: form.aboutCompany,
          logo_file_id: logoFileID,
          business_category_id: form.selectedCategories > 0 ? form.selectedCategories : undefined,
        });

        let createdBrandID = extractCreatedBrandID(
          response,
          form.companyName,
          logoFileID
        );

        if (!createdBrandID) {
          const refreshedBrands = await refetchBrands();
          createdBrandID = matchCreatedBrand(
            refreshedBrands.data?.brands,
            form.companyName,
            logoFileID
          );
        }

        if (!createdBrandID) {
          toast.error("Не удалось определить созданный бренд");
          return;
        }

        queryClient.invalidateQueries({
          queryKey: queryKeys.business.brands.getAll,
        });

        methods.setValue("brandID", createdBrandID);
        onSubmit({
          ...form,
          brandID: createdBrandID,
        });
      } catch (error) {
        console.error("Failed to create brand before campaign", error);
        toast.error("Не удалось создать бренд");
      }
    },
    [
      createBrandMutateAsync,
      methods,
      onSubmit,
      queryClient,
      refetchBrands,
    ]
  );

  return { handleNewBrandSubmission };
};

