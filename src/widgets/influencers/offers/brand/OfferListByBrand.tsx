import { NotFoundBlock } from "src/components/ui/not-found-block";
import OfferCard from "../../dashboard/offer-card/OfferCard";
import { InfluencerOfferType } from "src/types/offers";
import { Button } from "src/components/ui/button/button";
import { useFilterStore } from "../../filter-offers/model/useFilterStore";
import { useTranslations } from "next-intl";
import { SpinnerBlock } from "src/components/ui/spinner-block";

interface IProps {
  offers: InfluencerOfferType[];
  isLoading: boolean;
}
export const OfferListByBrand = ({ offers, isLoading }: IProps) => {
  const t = useTranslations("common");

  const { media_channel_id, reset } = useFilterStore();
  const handleResetFilters = () => {
    reset();
  };

  if (isLoading) {
    return <SpinnerBlock className="w-full" />;
  }

  if (!offers || offers?.length <= 0)
    return (
      <NotFoundBlock
        className="w-full"
        renderSubBlock={
          media_channel_id !== "all" && (
            <div className="flex justify-center mt-[10px]">
              <Button variant="outline" onClick={handleResetFilters}>
                {t("resetFilters")}
              </Button>
            </div>
          )
        }
      />
    );

  return (
    <div className="space-y-[16px]">
      {offers?.map((offer) => (
        <OfferCard
          key={offer.ad_offer_detail.ad_offer.id}
          offer={offer.ad_offer_detail}
          campaignDetail={offer.ad_campaign_detail}
          mediaChannelResponseInformations={
            offer.media_channel_response_informations
          }
        />
      ))}
    </div>
  );
};
