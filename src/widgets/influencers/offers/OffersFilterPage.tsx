"use client";

import Breadcrumb, { BreadcrumbItem } from "src/components/ui/bread-crumb";
import { FilterChannelSort } from "src/widgets/influencers/filter-offers/channel-filter/FilterChannelSort";
import { FilterOffersHeading } from "src/widgets/influencers/filter-offers/FilterOffersHeading";
import { FiltersColumn } from "src/widgets/influencers/filter-offers/filters-column/FiltersColumn";
import { FilterSearch } from "src/widgets/influencers/filter-offers/FilterSearch";
// import { FiltersSortBy } from "src/widgets/influencers/filter-offers/sort/FiltersSortBy";
import { OffersList } from "src/widgets/influencers/filter-offers/OffersList";
import { SelectedFilters } from "src/widgets/influencers/filter-offers/selected-filters/SelectedFilters";
import { useFilterParams } from "src/widgets/influencers/filter-offers/model/useFiltersParams";
import { useInitFilters } from "src/widgets/influencers/filter-offers/model/useInitFilters";
import { useFirstFillInputFilters } from "src/widgets/influencers/filter-offers/model/useFirstFillInputFilters";
import { useWindowSize } from "usehooks-ts";
import { OffersForInfluencersResponse } from "src/types/offers";
import dynamic from "next/dynamic";
import { FilterTabList } from "../filter-offers/filter-tabs/FilterTabList";
import { MobileFiltersTrigger } from "../filter-offers/MobileFiltersTrigger";
import HowItWorksBanner from "../how-it-works-banner/HowItWorksBanner";
import { OfferBrandList } from "../filter-offers/offer-brand/OfferBrandList";
import { useFilterStore } from "../filter-offers/model/useFilterStore";

const MobileFiltersSortBy = dynamic(
  () =>
    import(
      "src/widgets/influencers/filter-offers/sort/MobileFiltersSortBy"
    ).then((mod) => mod.MobileFiltersSortBy),
  { ssr: false }
);
const MobileFiltersColumn = dynamic(
  () =>
    import(
      "src/widgets/influencers/filter-offers/filters-column/MobileFiltersColumn"
    ).then((mod) => mod.MobileFiltersColumn),
  { ssr: false }
);

interface IProps {
  offers?: OffersForInfluencersResponse;
  breadCrumbs: BreadcrumbItem[];
  offersLoading: boolean;
}

export const OffersFilterPage = ({
  offers,
  breadCrumbs,
  offersLoading,
}: IProps) => {
  const { width } = useWindowSize();

  const { filterItems, setFilterItems } = useInitFilters();
  useFilterParams();
  useFirstFillInputFilters({
    filterItems,
    setFilterItems,
  });
  const filters = useFilterStore();

  return (
    <>
      <MobileFiltersSortBy />
      <MobileFiltersColumn filterItems={filterItems} />
      <div className="space-y-[16px] lg:space-y-[22px] max-w-screenMaxWidth w-full mx-auto px-[10px] py-[32px]">
        <Breadcrumb items={breadCrumbs} />

        <div className="space-y-[24px] lg:space-y-[30px]">
          <FilterOffersHeading offersCount={offers?.paginate.total_count} />

          <div className="space-y-[24px]">
            <div className="bg-white rounded-[6px] flex flex-col sm:grid sm:grid-cols-[auto_1fr] sm:[&>:only-child]:col-span-full">
              <FilterChannelSort />
              <FilterSearch />
            </div>

            <div className="lg:grid lg:grid-cols-[297px_1fr] gap-[32px]">
              {width >= 1024 && (
                <div className="flex flex-col gap-[24px]">
                  <FiltersColumn filterItems={filterItems} />
                  <HowItWorksBanner />
                </div>
              )}

              <div className="space-y-[8px] min-w-0">
                <div className="pb-[14px] lg:pb-0 flex flex-col gap-[15px] min-w-0">
                  <FilterTabList
                    adOfferTypes={offers?.ad_offer_types}
                    isLoading={offersLoading}
                  />
                  <MobileFiltersTrigger />
                  <SelectedFilters filterItems={filterItems} />
                  {/* {width >= 1024 && <FiltersSortBy />} */}
                </div>

                <div className="flex flex-col gap-[16px] items-center lg:items-start">
                  {filters.media_channel_id === "all" ? (
                    <OfferBrandList />
                  ) : (
                    <OffersList
                      offers={offers?.list}
                      paginate={offers?.paginate}
                      isLoading={offersLoading}
                    />
                  )}

                  {width < 1024 && (
                    <div className="w-full max-w-[354px] mx-auto">
                      <HowItWorksBanner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
