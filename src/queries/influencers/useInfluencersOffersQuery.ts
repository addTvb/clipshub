import { useQuery } from "@tanstack/react-query";
import {
  getOffersForInfluencers,
  InfluencerOffersFilterParams,
} from "src/api/influencers/offers";
import { queryKeys } from "src/config/queryKeys";
import { VALID_PARAMS } from "src/widgets/influencers/filter-offers/model/useFiltersParams";
import {
  FilterState,
  useFilterStore,
} from "src/widgets/influencers/filter-offers/model/useFilterStore";
import { useDebounceValue } from "usehooks-ts";

const flattenFilters = (filters: InfluencerOffersFilterParams) => {
  const params: Array<string | number> = [];

  VALID_PARAMS.forEach((key) => {
    const value = filters[key];
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
const cleanRequestParams = (
  params: Partial<FilterState>
): InfluencerOffersFilterParams => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleaned: any = {};

  VALID_PARAMS.forEach((key) => {
    const value = params[key as keyof InfluencerOffersFilterParams];

    if (value !== undefined && value !== "all") {
      cleaned[key] = value;
    }
  });

  return cleaned as InfluencerOffersFilterParams;
};

export const useInfluencersOffersQuery = () => {
  const filters = useFilterStore();
  const [debounceSearch] = useDebounceValue(filters.search, 500);

  const queryParams = cleanRequestParams({
    ...filters,
    search: debounceSearch === "" ? undefined : debounceSearch,
  });
  const filtersArray = flattenFilters(queryParams);

  const { data: offers, isLoading: offersLoading } = useQuery({
    queryKey: queryKeys.influencers.offers.getOffers(filtersArray),
    queryFn: () => getOffersForInfluencers(queryParams),
  });

  return { offers, offersLoading };
};
