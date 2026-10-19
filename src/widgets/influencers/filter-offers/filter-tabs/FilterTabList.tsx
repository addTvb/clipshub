"use client";

import { FilterTab } from "./FilterTab";
import { AdOfferType } from "src/types/offers";
import clsx from "clsx";
import { FilterTabListSkeleton } from "./FilterTabListSkeleton";

interface IProps {
  adOfferTypes?: AdOfferType[];
  className?: string;
  isLoading: boolean;
}

export const FilterTabList = ({
  adOfferTypes,
  className,
  isLoading,
}: IProps) => {
  if (isLoading) {
    return <FilterTabListSkeleton className={className} />;
  }

  if (!adOfferTypes || adOfferTypes?.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex flex-nowrap gap-[10px] items-center overflow-x-auto py-[5px] w-full",
        className
      )}
      style={{ scrollbarWidth: "thin" }}
    >
      {adOfferTypes?.map((tab) => (
        <FilterTab key={tab.type} tab={tab} />
      ))}
    </div>
  );
};
