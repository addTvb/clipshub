import { OfferBrandCard } from "./OfferBrandCard";
import { useBrandsListWithOffers } from "src/queries/influencers/useBrandsListWithOffers";
import { ListBrandsWithOffersParams } from "src/types/brands";
import { SpinnerBlock } from "src/components/ui/spinner-block";
import { NotFoundBlock } from "src/components/ui/not-found-block";
import { Pagination } from "src/features/posts/Pagination";

interface IProps {
  params?: ListBrandsWithOffersParams;
}

export const OfferBrandList = ({ params: externalParams }: IProps) => {
  const { brands, isLoading, paginate } =
    useBrandsListWithOffers(externalParams);

  if (isLoading) {
    return <SpinnerBlock className="w-full" />;
  }

  if (!brands || brands.length === 0) {
    return <NotFoundBlock className="w-full" />;
  }

  return (
    <div className="w-full flex flex-col gap-[16px] items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] w-full">
        {brands?.map((brandWithOffers) => (
          <OfferBrandCard
            key={brandWithOffers.brand.id}
            brandWithOffers={brandWithOffers}
          />
        ))}
      </div>
      {paginate && <Pagination paginate={paginate} />}
    </div>
  );
};
