import Image from "next/image";
import { useFilterStore } from "../model/useFilterStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "src/components/ui/select";
import { sortOptions } from "./model/sort-options";
import { OfferSortType } from "src/api/influencers/offers";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { memo } from "react";

interface IProps {
  className?: string;
}

export const CompactFilterSortBy = memo(({ className }: IProps) => {
  const t = useTranslations("common");
  const { setFilters, sort, ...filters } = useFilterStore();

  const handleChangeSort = (value: string) =>
    setFilters({ ...filters, sort: value as OfferSortType });

  return (
    <Select onValueChange={handleChangeSort} value={sort}>
      <SelectTrigger
        arrowClassName="hidden"
        className={clsx(
          "hidden lg:flex items-center justify-center border-none p-[6px] bg-transparent rounded-full shadow-none hover:shadow-inputShadow transition-transform active:scale-95 focus:outline-none data-[state=open]:shadow-none data-[state=open]:border-none",
          className
        )}
      >
        <Image
          src="/static/icons/sort-gray-thin.svg"
          alt=""
          width={24}
          height={24}
        />
      </SelectTrigger>
      <SelectContent className="p-[10px]">
        {sortOptions?.map((option) => (
          <SelectItem
            key={option?.value}
            value={option?.value}
            className="text-sm font-medium p-[6px] min-w-[170px]"
          >
            {t(option?.name)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
CompactFilterSortBy.displayName = "CompactFilterSortBy";