import {
  InfluencerOffersFilterParams,
  OfferSortType,
} from "src/api/influencers/offers";
import { create } from "zustand";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const DEFAULT_MEDIA_CHANNEL_ID = "all";
const DEFAULT_SORT: OfferSortType = "total_max_profit";
export const DEFAULT_INTEGRATION_TYPES = ["banner"];
export const PLATFORMS_ARR = ["youtube", "tiktok", "instagram", "all"] as const;
export const AD_TYPES_VALUES = [
  "banner",
  "half_screen",
  "influencer_content",
  "dedicate",
  "integration",
  "challenge",
] as const;

export type FilterState = InfluencerOffersFilterParams & {
  setFilters: (filters: Partial<InfluencerOffersFilterParams>) => void;
  reset: () => void;
};

const validateParams = (
  params: Partial<InfluencerOffersFilterParams>
): Partial<InfluencerOffersFilterParams> => {
  const validated: Partial<InfluencerOffersFilterParams> = {};

  if (params.page && params.page > 0) validated.page = params.page;
  if (params.per_page && params.per_page > 0)
    validated.per_page = params.per_page;

  const validSorts: OfferSortType[] = [
    "total_max_profit",
    "created_at",
    "-created_at",
    "cmp_price",
    "-cmp_price",
  ];
  if (params.sort && validSorts.includes(params.sort)) {
    validated.sort = params.sort;
  }

  const validateStringArray = (arr?: unknown[], allowEmpty: boolean = true) => {
    if (!arr) return undefined;
    const filtered = arr.filter((n) => typeof n === "string");
    if (!allowEmpty && filtered.length === 0) return undefined;
    return filtered;
  };

  // Для обычных фильтров разрешаем пустые массивы
  if (params.business_category_ids !== undefined) {
    validated.business_category_ids = validateStringArray(
      params.business_category_ids,
      true
    );
  }
  if (params.media_channel_category_ids !== undefined) {
    validated.media_channel_category_ids = validateStringArray(
      params.media_channel_category_ids,
      true
    );
  }
  if (params.language_ids !== undefined) {
    validated.language_ids = validateStringArray(params.language_ids, true);
  }

  if (params.media_channel_id !== undefined) {
    validated.media_channel_id = params.media_channel_id;
  }

  if (params.media_channel_type !== undefined) {
    if (
      params.media_channel_type &&
      PLATFORMS_ARR.includes(params.media_channel_type)
    ) {
      validated.media_channel_type = params.media_channel_type;
    } else if (params.media_channel_type === undefined) {
      validated.media_channel_type = undefined;
    }
  }

  if (params.integration_types !== undefined) {
    const validatedIntegrationTypes = validateStringArray(
      params.integration_types,
      false
    ); // Не разрешаем пустые массивы
    if (validatedIntegrationTypes && validatedIntegrationTypes.length > 0) {
      validated.integration_types = validatedIntegrationTypes;
    }
  }

  if (params.search || params.search === "") validated.search = params.search;

  return validated;
};

export const useFilterStore = create<FilterState>()((set) => ({
  page: DEFAULT_PAGE,
  per_page: DEFAULT_PER_PAGE,
  sort: DEFAULT_SORT,
  media_channel_id: DEFAULT_MEDIA_CHANNEL_ID,
  business_category_ids: undefined,
  media_channel_category_ids: undefined,
  media_channel_type: undefined,
  language_ids: undefined,
  search: undefined,
  integration_types: DEFAULT_INTEGRATION_TYPES,

  setFilters: (filters) =>
    set((state) => {
      const validated = validateParams(filters);
      const newState = { ...state };

      // Обновляем каждое поле индивидуально
      if ("page" in filters) {
        newState.page =
          validated.page !== undefined ? validated.page : newState.page;
      }
      if ("per_page" in filters) {
        newState.per_page =
          validated.per_page !== undefined
            ? validated.per_page
            : newState.per_page;
      }
      if ("sort" in filters) {
        newState.sort =
          validated.sort !== undefined ? validated.sort : newState.sort;
      }
      if ("media_channel_id" in filters) {
        newState.media_channel_id =
          validated.media_channel_id !== undefined
            ? validated.media_channel_id
            : filters.media_channel_id;
      }
      if ("business_category_ids" in filters) {
        newState.business_category_ids =
          validated.business_category_ids !== undefined
            ? validated.business_category_ids
            : filters.business_category_ids;
      }
      if ("media_channel_category_ids" in filters) {
        newState.media_channel_category_ids =
          validated.media_channel_category_ids !== undefined
            ? validated.media_channel_category_ids
            : filters.media_channel_category_ids;
      }
      if ("media_channel_type" in filters) {
        newState.media_channel_type =
          validated.media_channel_type !== undefined
            ? validated.media_channel_type
            : filters.media_channel_type;
      }
      if ("language_ids" in filters) {
        newState.language_ids =
          validated.language_ids !== undefined
            ? validated.language_ids
            : filters.language_ids;
      }
      if ("search" in filters) {
        newState.search =
          validated.search !== undefined ? validated.search : filters.search;
      }
      if ("integration_types" in filters) {
        // Для integration_types особая логика - не позволяем установить undefined/пустой массив
        if (
          validated.integration_types !== undefined &&
          validated.integration_types.length > 0
        ) {
          newState.integration_types = validated.integration_types;
        }
        // Если валидация не прошла, оставляем текущее значение
      }

      if (!("page" in filters)) {
        newState.page = DEFAULT_PAGE;
      }
      
      return newState;
    }),

  reset: () =>
    set(() => ({
      page: DEFAULT_PAGE,
      per_page: DEFAULT_PER_PAGE,
      sort: DEFAULT_SORT,
      media_channel_id: DEFAULT_MEDIA_CHANNEL_ID,
      business_category_ids: undefined,
      media_channel_category_ids: undefined,
      media_channel_type: undefined,
      language_ids: undefined,
      search: undefined,
      integration_types: DEFAULT_INTEGRATION_TYPES,
    })),
}));
