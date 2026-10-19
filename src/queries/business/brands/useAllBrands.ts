import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "src/api/business/brands";
import { queryKeys } from "src/config/queryKeys";

export const useAllBrands = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.business.brands.getAll,
    queryFn: () => getAllBrands(),
  });

  return {
    brands: data?.brands,
    paginate: data?.paginate,
    brandsLoading: isLoading,
    refetchBrands: refetch,
  };
};
