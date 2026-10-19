import { useQuery } from "@tanstack/react-query";
import { getBusinessCategory } from "src/api/business/dictionaries/business-category";
import { queryKeys } from "src/config/queryKeys";

export const useBusinessCategory = () => {
  const { data: businessCategories, isLoading: loadingCategories } = useQuery({
    queryKey: queryKeys.business.dictionaries.businessCategory,
    queryFn: getBusinessCategory,
  });

  return {
    businessCategories: businessCategories?.list,
    loadingCategories,
  };
};
