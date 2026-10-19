import { useQuery } from "@tanstack/react-query";
import { getListBrandsWithOffers, getListBrandsWithOffersUnAuth } from "src/api/business/brands";
import { queryKeys } from "src/config/queryKeys";
import { ListBrandsWithOffersParams } from "src/types/brands";
import { VALID_PARAMS } from "src/widgets/influencers/filter-offers/model/useFiltersParams";
import {
  FilterState,
  useFilterStore,
} from "src/widgets/influencers/filter-offers/model/useFilterStore";
import { useDebounceValue } from "usehooks-ts";
import { AdType } from "src/types/base";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { useAuthStore } from "src/store/auth";

export const flattenBrandsFilters = (filters: ListBrandsWithOffersParams) => {
  const params: Array<string | number> = [];

  VALID_PARAMS.forEach((key) => {
    const value = filters[key as keyof ListBrandsWithOffersParams];
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.push(key, value.join(","));
      }
    } else {
      params.push(key, value.toString());
    }
  });

  return params;
};

export const cleanBrandsRequestParams = (
  params: Partial<FilterState>
): ListBrandsWithOffersParams => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleaned: any = {};

  VALID_PARAMS.forEach((key) => {
    const value = params[key as keyof FilterState];

    if (value === undefined || value === "all") return;

    // Преобразуем типы для ListBrandsWithOffersParams
    if (key === "media_channel_id") {
      const channelId = typeof value === "string" ? parseInt(value, 10) : value;
      if (!isNaN(channelId as number)) {
        cleaned[key] = channelId as number;
      }
    } else if (
      key === "business_category_ids" ||
      key === "media_channel_category_ids" ||
      key === "language_ids"
    ) {
      if (Array.isArray(value) && value.length > 0) {
        cleaned[key] = value
          .map((id) => (typeof id === "string" ? parseInt(id, 10) : id))
          .filter((id) => !isNaN(id as number)) as number[];
      }
    } else if (key === "integration_types") {
      if (Array.isArray(value) && value.length > 0) {
        cleaned[key] = value.filter((type): type is AdType =>
          [
            "banner",
            "half_screen",
            "influencer_content",
            "dedicate",
            "integration",
            "challenge",
          ].includes(type)
        ) as AdType[];
      }
    } else if (key === "media_channel_type") {
      if (
        value &&
        typeof value === "string" &&
        ["youtube", "instagram", "tiktok"].includes(value)
      ) {
        cleaned[key] = value as SocialPlatform;
      }
    } else if (key === "sort") {
      // Для brands поддерживаются только created_at, -created_at, id, -id
      if (
        value === "created_at" ||
        value === "-created_at" ||
        value === "id" ||
        value === "-id"
      ) {
        cleaned[key] = value;
      }
      // Для других сортировок не устанавливаем sort (API будет использовать значение по умолчанию)
    } else {
      cleaned[key] = value;
    }
  });

  return cleaned as ListBrandsWithOffersParams;
};

export const useBrandsListWithOffers = (
  externalParams?: ListBrandsWithOffersParams
) => {
  const filters = useFilterStore();
  const [debounceSearch] = useDebounceValue(filters.search, 500);
  const { isAuthenticated } = useAuthStore();

  const queryParams =
    externalParams ||
    cleanBrandsRequestParams({
      ...filters,
      search: debounceSearch === "" ? undefined : debounceSearch,
    });
  const filtersArray = flattenBrandsFilters(queryParams);

  // Запрос для авторизованных пользователей
  const authQuery = useQuery({
    queryKey: queryKeys.influencers.brands.getBrandsWithOffers(filtersArray),
    queryFn: () => getListBrandsWithOffers(queryParams),
    enabled: isAuthenticated,
  });

  // Запрос для неавторизованных пользователей
  const unAuthQuery = useQuery({
    queryKey: queryKeys.influencers.brands.getBrandsWithOffersUnAuth(filtersArray),
    queryFn: () => getListBrandsWithOffersUnAuth(queryParams),
    enabled: !isAuthenticated,
  });

  const activeQuery = isAuthenticated ? authQuery : unAuthQuery;

  return {
    brands: activeQuery.data?.brands,
    adOfferTypes: activeQuery.data?.ad_offer_types,
    paginate: activeQuery.data?.paginate,
    status: activeQuery.data?.status,
    isLoading: activeQuery.isLoading,
    error: activeQuery.error,
  };
};
