import { useMutation } from "@tanstack/react-query";
import { setStatusOffer } from "src/api/business/offers";
import { mutationKeys } from "src/config/mutationKeys";
import { OfferSetStatusReq } from "src/types/offers";

export const useSetStatusOffer = () => {
  const { mutate: setStatusOfferMutate, isPending: setStatusOfferPending } =
    useMutation({
      mutationKey: mutationKeys.business.offers.setStatusOffer,
      mutationFn: (params: { offerID: number; body: OfferSetStatusReq }) =>
        setStatusOffer(params.offerID, params.body),
    });

  return { setStatusOfferMutate, setStatusOfferPending };
};
