"use client";

import React, { useEffect } from "react";
import Breadcrumb, { BreadcrumbItem } from "src/components/ui/bread-crumb";
import { BrandOffersHeading } from "./BrandOffersHeading";
import { OfferBrandFilter } from "./OfferBrandFilter";
import { OfferListByBrand } from "./OfferListByBrand";
import { useOffersQuery } from "src/queries/useOffersQuery";
import { useParams, useSearchParams } from "next/navigation";
import { useFilterStore } from "../../filter-offers/model/useFilterStore";
import { AdType } from "src/types/base";

interface IProps {
  breadCrumbs: BreadcrumbItem[];
}

export const BrandOffersComponent = ({ breadCrumbs }: IProps) => {
  const { id } = useParams();
  const { setFilters } = useFilterStore();
  const { offers, offersLoading } = useOffersQuery(Number(id));
  const searchParams = useSearchParams();
  const integrationTypesParam = searchParams.get("integration_types");

  useEffect(() => {
    if (integrationTypesParam) {
      setFilters({ integration_types: integrationTypesParam.split(",") as AdType[] });
    }
  }, [integrationTypesParam, setFilters]);

  return (
    <div className="max-w-screenMaxWidth mx-auto w-full py-[32px] px-[10px] flex flex-col gap-[22px] bg-white50">
      <Breadcrumb items={breadCrumbs} />
      <div className="flex flex-col gap-[42px]">
        <BrandOffersHeading
          brand={offers?.list[0]?.ad_campaign_detail?.brand}
        />

        <div className="flex flex-col md:gap-[16px] gap-[24px]">
          <OfferBrandFilter
            adOfferTypes={offers?.ad_offer_types}
            isLoading={offersLoading}
          />

          <OfferListByBrand
            offers={offers?.list || []}
            isLoading={offersLoading}
          />
        </div>
      </div>
    </div>
  );
};
