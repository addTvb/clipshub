import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand } from "src/api/business/brands";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: mutationKeys.business.brands.delete,
    mutationFn: (id: number) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.brands.getAll,
      });
    },
  });

  return {
    deleteBrandMutate: mutate,
    deleteBrandLoading: isPending,
  };
};
