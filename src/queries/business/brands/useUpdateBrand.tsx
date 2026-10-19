import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrand } from "src/api/business/brands";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { CreateBrandRequest } from "src/types/brands";

export const useUpdateBrand = (id: number | null) => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: mutationKeys.business.brands.update,
    mutationFn: (body: CreateBrandRequest) => updateBrand(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.brands.getAll,
      });
    },
  });

  return {
    updateBrandMutate: mutate,
    updateBrandMutateAsync: mutateAsync,
    updateBrandLoading: isPending,
  };
};
