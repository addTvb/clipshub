"use client";

import { OfferCardSkeleton } from "./active-offers/OfferCardSkeleton";

export const OfferListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <OfferCardSkeleton key={`skeleton-list-${index}`} />
      ))}
    </div>
  );
};
