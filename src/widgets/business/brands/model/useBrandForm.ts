import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Resolver, useForm } from "react-hook-form";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { createBrandSchema } from "./brand-schemas";
import { CreateBrandRequest } from "src/types/brands";
import { useCreateBrand } from "src/queries/business/brands/useCreateBrand";
import { useUpdateBrand } from "src/queries/business/brands/useUpdateBrand";
import { useBrandModalState } from "./useBrandModalState";
import { useAllBrands } from "src/queries/business/brands/useAllBrands";
import { useEffect, useState } from "react";
import { filterBrandByID } from "src/queries/business/brands/filterBrandByID";

export interface AddBrandForm {
  brandAvatarID?: number;
  nameBrand: string;
  descriptionBrand: string;
  selectedCategories: number;
}

export const useBrandForm = (
  formType: "create" | "edit",
  setOpen?: (open: boolean) => void
) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { editBrandID, setEditBrandID } = useBrandModalState();

  const { brands } = useAllBrands();
  const { createBrandMutate, pendingCreateBrand } = useCreateBrand();
  const { updateBrandMutate, updateBrandLoading } = useUpdateBrand(editBrandID);

  const [brandAvatarFileID, setBrandAvatarFileID] = useState<
    number | undefined
  >(undefined);
  const [brandAvatarFileLink, setBrandAvatarFileLink] = useState("");
  const [brandAvatarFileName, setBrandAvatarFileName] = useState("");

  const methods = useForm<AddBrandForm>({
    resolver: valibotResolver(createBrandSchema) as Resolver<AddBrandForm>,
    defaultValues: {
      brandAvatarID: undefined,
      nameBrand: "",
      descriptionBrand: "",
      selectedCategories: 0,
    },
  });

  useEffect(() => {
    if (editBrandID) {
      const selectedBrand = filterBrandByID(editBrandID, brands);
      if (selectedBrand) {
        methods.setValue("nameBrand", selectedBrand?.title ?? "");
        methods.setValue("descriptionBrand", selectedBrand?.description ?? "");
        methods.setValue(
          "selectedCategories",
          selectedBrand?.business_category_id ?? 0
        );

        const logoFileID = selectedBrand?.logo_file?.id;
        methods.setValue("brandAvatarID", Number(logoFileID));

        if (logoFileID && selectedBrand?.logo_file?.link) {
          setBrandAvatarFileID(logoFileID);
          setBrandAvatarFileLink(selectedBrand.logo_file.link);
          setBrandAvatarFileName(selectedBrand.logo_file?.name ?? "");
        } else {
          setBrandAvatarFileID(undefined);
          setBrandAvatarFileLink("");
          setBrandAvatarFileName("");
        }
      }
    }
  }, [brands, editBrandID, methods]);

  const onCreateBrand = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.business.brands.getAll,
    });
    toast.success(t("business.brand.brandSuccessfullyCreated"));
    methods.reset();
    setEditBrandID(null);
    if (setOpen) setOpen(false);
  };

  const onSubmit = (form: AddBrandForm) => {
    const logoFileID = form.brandAvatarID
      ? typeof form.brandAvatarID === "number"
        ? form.brandAvatarID
        : Number(form.brandAvatarID)
      : undefined;

    const body: CreateBrandRequest = {
      description: form.descriptionBrand,
      logo_file_id: logoFileID,
      title: form.nameBrand,
      business_category_id:
        form.selectedCategories > 0 ? form.selectedCategories : undefined,
    };

    if (formType === "edit") {
      updateBrandMutate(body, {
        onSuccess: onCreateBrand,
      });
    } else {
      createBrandMutate(body, {
        onSuccess: onCreateBrand,
      });
    }
  };

  const storeActions = {
    setFileID: setBrandAvatarFileID,
    setFileLink: setBrandAvatarFileLink,
    setFileName: setBrandAvatarFileName,
    fileLink: brandAvatarFileLink,
    fileName: brandAvatarFileName,
    fileID: brandAvatarFileID,
  };

  const loading = pendingCreateBrand || updateBrandLoading;

  return {
    methods,
    storeActions,
    onSubmit,
    loading,
  };
};
