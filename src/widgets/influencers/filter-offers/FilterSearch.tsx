"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, memo } from "react";
import { useFilterStore } from "./model/useFilterStore";
import { useOpenSortStore } from "./sort/model/useOpenSortStore";
import { useOpenMobileFilters } from "./filters-column/model/useOpenMobileFilters";
import { CompactFilterSortBy } from "./sort/CompactFilterSortBy";

export const FilterSearch = memo(() => {
  const t = useTranslations("influencer");

  const { setOpen: setOpenSort } = useOpenSortStore();
  const { setOpen: setOpenFilters } = useOpenMobileFilters();

  const handleOpenMobileSort = () => setOpenSort(true);
  const handleOpenMobileFilters = () => setOpenFilters(true);

  const { search, setFilters, ...filters } = useFilterStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  return (
    <div className="relative w-full hidden sm:inline-block">
      <Image
        src="/static/icons/search-black.svg"
        alt=""
        width={24}
        height={24}
        className="absolute left-[25px] top-[30px]"
      />
      <input
        value={search}
        onChange={handleChange}
        type="search"
        placeholder={t("searchOffersByBrand")}
        className="w-[calc(100%-90px)] lg:w-full h-[84px] p-[10px] pl-[58px] bg-white focus-visible:outline-none font-[Inter]"
      />

      <div className="flex justify-center items-center absolute top-[20px] right-[12px]">
        <CompactFilterSortBy />
        <button
          className="p-[8px] transition-transform active:scale-90 lg:hidden"
          onClick={handleOpenMobileSort}
        >
          <Image
            src="/static/icons/sort-gray-thin.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
        <button
          className="p-[8px] transition-transform active:scale-90 lg:hidden"
          onClick={handleOpenMobileFilters}
        >
          <Image
            src="/static/icons/filters-gray.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
});
FilterSearch.displayName = "FilterSearch";
