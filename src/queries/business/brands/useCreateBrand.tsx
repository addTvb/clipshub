import { useMutation } from "@tanstack/react-query";
import { createBrand } from "src/api/business/brands";
import { mutationKeys } from "src/config/mutationKeys";
import { CreateBrandRequest } from "src/types/brands";

export const useCreateBrand = () => {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: mutationKeys.business.brands.create,
    mutationFn: (body: CreateBrandRequest) => createBrand(body),
  });

  return {
    createBrandMutate: mutate,
    createBrandMutateAsync: mutateAsync,
    pendingCreateBrand: isPending,
  };
};
