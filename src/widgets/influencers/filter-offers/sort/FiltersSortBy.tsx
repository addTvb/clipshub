"use client";

import { SelectTrigger } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "src/components/ui/select";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo } from "react";
import { useFilterStore } from "../model/useFilterStore";
import { OfferSortType } from "src/api/influencers/offers";
import { sortOptions } from "./model/sort-options";

export const FiltersSortBy = memo(() => {
  const t = useTranslations("common");
  const { setFilters, sort, ...filters } = useFilterStore();

  const handleChangeSort = (value: string) =>
    setFilters({ ...filters, sort: value as OfferSortType });

  return (
    <div className="p-[6px]">
      <div className="flex items-center gap-[6px] px-[8px] text-gray550">
        <Image
          src="/static/icons/sort-gray.svg"
          alt=""
          width={14}
          height={14}
        />
        <span>{t("sortBy")}</span>
      </div>
      <Select onValueChange={handleChangeSort} value={sort}>
        <SelectTrigger className="rounded-full px-[8px] py-[2px] flex items-center gap-[12px] bg-gray200 text-sm font-bold text-textColor ">
          <SelectValue />

          <Image
            src="/static/icons/arrow-down-gray.svg"
            alt=""
            width={14}
            height={14}
          />
        </SelectTrigger>
        <SelectContent className="p-[10px]">
          {sortOptions?.map((option) => (
            <SelectItem
              key={option?.value}
              value={option?.value}
              className="text-sm font-medium p-[6px]"
            >
              {t(option?.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
FiltersSortBy.displayName = "FiltersSortBy";
