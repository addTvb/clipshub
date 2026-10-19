"use client";

import { useMemo } from "react";
import { SkeletonCard } from "src/features/business/SkeletonCard";
import { BrandCard } from "./BrandCard";
import { AddBrandCard } from "./AddBrandCard";
import { AdBrandModal } from "./AdBrandModal";
import { Pagination } from "src/features/posts/Pagination";
import { BrandType } from "src/types/brands";
import { PaginationType } from "src/types/base";
import { EditBrandModal } from "./EditBrandModal";

interface IProps {
  brands?: BrandType[];
  paginate?: PaginationType;
}

export const BrandsGrid = ({ brands, paginate }: IProps) => {
  const CARDS_PER_ROW = 3;
  const emptyCardsCount = useMemo(() => {
    if (!brands) return 0;
    const totalCards = brands.length + 1; // +1 для AddCampaignCard
    const cardsInLastRow = totalCards % CARDS_PER_ROW;
    return cardsInLastRow === 0 ? 0 : CARDS_PER_ROW - cardsInLastRow;
  }, [brands]);

  const emptyCards = useMemo(() => {
    return Array.from({ length: emptyCardsCount }, (_, index) => (
      <SkeletonCard key={`empty-brand-${index}`} />
    ));
  }, [emptyCardsCount]);

  return (
    <div className="flex flex-col gap-[24px] items-center">
      <AdBrandModal />
      <EditBrandModal />
      <div className="grid grid-cols-1 grid-rows-[minmax(219px, 1fr)] gap-[16px] sm:grid-cols-2 lg:grid-cols-3 w-full">
        {brands &&
          brands.map((brand, index) => (
            <BrandCard key={`brand-${brand.id || index}`} brand={brand} />
          ))}

        <AddBrandCard />

        {emptyCards}
      </div>
      <Pagination paginate={paginate} />
    </div>
  );
};
