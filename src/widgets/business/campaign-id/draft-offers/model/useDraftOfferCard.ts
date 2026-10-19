import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { queryKeys } from "src/config/queryKeys";
import { useSetStatusOffer, useSetVersionStatusOffer } from "src/queries/business/offers";
import { OfferBusinessType } from "src/types/offers";

export const useDraftOfferCard = (offer: OfferBusinessType) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { setStatusOfferMutate, setStatusOfferPending } = useSetStatusOffer();
  const { setVersionStatusOfferMutate, setVersionStatusOfferPending } = useSetVersionStatusOffer();

  const pendingOfferDetail = offer.pending_adoffer_detail;
  if (!pendingOfferDetail) {
    return {
      setStatusOfferPending: false,
      handleChangeStatus: () => {},
      handleDeleteOffer: () => {},
    };
  }

  const adOffer = pendingOfferDetail.ad_offer;
  const offerId = adOffer.id;
  const offerName = adOffer.name;

  const handleChangeStatus = () => {
    if (!offerId) {
      toast.error(t("business.offer.errorActivatingOffer"));
      return;
    }

    setVersionStatusOfferMutate(
      { offerID: offerId, body: { status: "moderating" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.stats.getStatsByCampaignID(
              Number(id)
            ),
          });
          toast.success(
            t("business.offer.offerStatusChangedToModeration", {
              name: offerName,
            })
          );
        },
      }
    );
  };

  const handleDeleteOffer = () => {
    if (!offerId) {
      toast.error(t("business.offer.errorClosingOffer"));
      return;
    }

    setStatusOfferMutate(
      { offerID: offerId, body: { status: "closed" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
          });
          toast.success(
            t("business.offer.offerStatusChangedToClosed", {
              name: offerName,
            })
          );
        },
      }
    );
  };

  return {
    setStatusOfferPending,
    setVersionStatusOfferPending,
    handleChangeStatus,
    handleDeleteOffer,
  };
};
