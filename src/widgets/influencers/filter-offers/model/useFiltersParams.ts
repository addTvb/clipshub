import {
  InfluencerOffersFilterParams,
  OfferSortType,
} from "src/api/influencers/offers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  AD_TYPES_VALUES,
  DEFAULT_INTEGRATION_TYPES,
  PLATFORMS_ARR,
  useFilterStore,
} from "./useFilterStore";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { AdType } from "src/types/base";

export const VALID_PARAMS = [
  "page",
  "per_page",
  "sort",
  "media_channel_id",
  "business_category_ids",
  "media_channel_category_ids",
  "media_channel_type",
  "language_ids",
  "search",
  "integration_types",
  "brand_id"
] as const;

const parseSearchParams = (
  searchParams: URLSearchParams
): Partial<InfluencerOffersFilterParams> => {
  const params: Partial<InfluencerOffersFilterParams> = {};

  const page = searchParams.get("page");
  params.page = page && parseInt(page) > 0 ? parseInt(page) : undefined;

  const perPage = searchParams.get("per_page");
  params.per_page =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : undefined;

  const sort = searchParams.get("sort");
  if (sort) params.sort = sort as OfferSortType;

  const parseArrayParam = (param: string): string[] | undefined => {
    const value = searchParams.get(param);
    return value ? value.split(",") : undefined;
  };

  params.business_category_ids = parseArrayParam("business_category_ids");
  params.media_channel_category_ids = parseArrayParam(
    "media_channel_category_ids"
  );
  params.language_ids = parseArrayParam("language_ids");

  const mediaChannelId = searchParams.get("media_channel_id");
  params.media_channel_id = mediaChannelId || "all";

  const mediaChannelType = searchParams.get("media_channel_type");
  if (
    mediaChannelType &&
    PLATFORMS_ARR.includes(mediaChannelType as SocialPlatform)
  ) {
    params.media_channel_type = mediaChannelType as SocialPlatform;
  }

  const integrationType = searchParams.get("integration_types");
  if (integrationType) {
    const values = integrationType
      .split(",")
      .filter((v) => AD_TYPES_VALUES.includes(v as AdType));
    if (values.length) {
      params.integration_types = values;
    }
  }
  if (!integrationType) {
    params.integration_types = DEFAULT_INTEGRATION_TYPES;
  }

  const search = searchParams.get("search");
  if (search) params.search = search;

  return params;
};

const stringifyParams = (
  params: Partial<InfluencerOffersFilterParams>
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  VALID_PARAMS.forEach((key) => {
    const value = params[key];

    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.set(key, value.join(","));
      }
    } else if (typeof value === "number" || typeof value === "string") {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams;
};

export const useFilterParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useFilterStore();

  useEffect(() => {
    const params = parseSearchParams(searchParams);
    filters.setFilters(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newParams = stringifyParams(filters);
    const newUrl = `${pathname}?${newParams.toString()}`;

    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.page,
    filters.per_page,
    filters.sort,
    filters.media_channel_id,
    filters.business_category_ids,
    filters.media_channel_category_ids,
    filters.media_channel_type,
    filters.language_ids,
    filters.search,
    filters.integration_types,
    pathname,
    router
  ]);

  return {
    ...filters,
    reset: () => {
      filters.reset();
      router.replace(pathname, { scroll: false });
    },
  };
};
