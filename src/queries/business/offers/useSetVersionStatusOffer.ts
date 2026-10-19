import { useMutation } from "@tanstack/react-query";
import { setVersionStatusOffer } from "src/api/business/offers";
import { mutationKeys } from "src/config/mutationKeys";
import { OfferSetVersionStatusReq } from "src/types/offers";

export const useSetVersionStatusOffer = () => {
  const { mutate: setVersionStatusOfferMutate, isPending: setVersionStatusOfferPending } =
    useMutation({
      mutationKey: mutationKeys.business.offers.setVersionStatusOffer,
      mutationFn: (params: { offerID: number; body: OfferSetVersionStatusReq }) =>
        setVersionStatusOffer(params.offerID, params.body),
    });

  return { setVersionStatusOfferMutate, setVersionStatusOfferPending };
};

