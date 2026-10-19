import { AdOfferType } from "src/types/offers";
import { FilterChannelSort } from "../../filter-offers/channel-filter/FilterChannelSort";
import { FilterTabList } from "../../filter-offers/filter-tabs/FilterTabList";
import { useTranslations } from "next-intl";
import { CompactFilterSortBy } from "../../filter-offers/sort/CompactFilterSortBy";
import { useWindowSize } from "usehooks-ts";

interface IProps {
  adOfferTypes?: AdOfferType[];
  isLoading: boolean;
}

export const OfferBrandFilter = ({ adOfferTypes, isLoading }: IProps) => {
  const t = useTranslations("common");
  const { width } = useWindowSize();
  return (
    <div className="flex items-center gap-[24px] md:gap-[20px] md:flex-row flex-col">
      <div className="w-full md:w-auto flex flex-col gap-[10px] p-[12px] bg-white rounded-[6px] md:bg-transparent md:p-0 ">
        <div className="md:block hidden text-[10px] text-gray350 uppercase font-semibold leading-[16px] tracking-[0.7px] font-[Inter]">
          {t("filters")}
        </div>

        <FilterChannelSort
          className="!p-0 border-none"
          btnBg={width >= 768 ? "#fff" : "#f3f6fa"}
        />
      </div>

      <div className="md:block hidden h-[88px] w-[1px] bg-gray200" />

      <div className="flex flex-col gap-[10px] overflow-x-auto w-full">
        {(isLoading || (adOfferTypes && adOfferTypes?.length > 0)) && (
          <div className="text-[10px] text-gray350 uppercase font-semibold leading-[16px] tracking-[0.7px] font-[Inter]">
            {t("adType.title")}
          </div>
        )}
        <div className="flex items-end gap-[10px] justify-between w-full">
          <FilterTabList
            adOfferTypes={adOfferTypes}
            className="!pt-0"
            isLoading={isLoading}
          />
          <div className="min-w-[46px] p-[5px] md:block hidden">
            <CompactFilterSortBy className="!flex" />
          </div>
        </div>
      </div>
    </div>
  );
};
