import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Resolver, useForm } from "react-hook-form";
import { addCampaignSchema } from "./add-campaign-schemas";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { useCreateCampaign } from "src/queries/business/useCreateCampaign";
import { CreateCampaignRequest } from "src/types/campaigns";

export interface AddCampaignForm {
  companyAvatar: number | undefined;
  campaignName: string;
  companyName: string;
  aboutCompany: string;
  selectedCategories: number;
  enableWatermark: boolean;
  brandID: number | "" | "new-brand";
}

const baseCampaignFormValues: AddCampaignForm = {
  aboutCompany: "",
  campaignName: "",
  companyName: "",
  selectedCategories: 0,
  enableWatermark: false,
  brandID: "",
  companyAvatar: undefined,
};

export const getCampaignFormDefaultValues = (
  override?: Partial<AddCampaignForm>
): AddCampaignForm => ({
  ...baseCampaignFormValues,
  ...override,
});

export const useCampaignFormMethods = (
  defaultValuesOverride?: Partial<AddCampaignForm>
) =>
  useForm<AddCampaignForm>({
    resolver: valibotResolver(addCampaignSchema) as Resolver<AddCampaignForm>,
    defaultValues: getCampaignFormDefaultValues(defaultValuesOverride),
  });

export const useAdCampaignForm = (setOpen: (open: boolean) => void) => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const methods = useCampaignFormMethods();

  const onCreateCampaignSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.business.campaigns.getAllCampaigns,
    });
    toast.success(t("business.campaignSuccessfulCreated"));
    methods.reset(getCampaignFormDefaultValues());
    setOpen(false);
  };

  const { createCampaignMutate, pendingCreateCampaign } = useCreateCampaign();
  // TODO set new data
  const onSubmit = (form: AddCampaignForm) => {
    const normalizedBrandID =
      typeof form.brandID === "number" ? form.brandID : Number(form.brandID);

    if (!normalizedBrandID || Number.isNaN(normalizedBrandID)) {
      return;
    }

    const body: CreateCampaignRequest = {
      brand_id: normalizedBrandID,
      business_category_ids: form.selectedCategories > 0 ? [form.selectedCategories] : [],
      title: form.campaignName,
      settings: {
        allow_platform_watermark: form.enableWatermark,
      },
    };
    createCampaignMutate(body, {
      onSuccess: onCreateCampaignSuccess,
    });
  };

  return {
    methods,
    onSubmit,
    pendingCreateCampaign,
  };
};
