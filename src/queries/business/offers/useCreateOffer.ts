import { useMutation } from "@tanstack/react-query";
import { createOffer } from "src/api/business/offers";
import { mutationKeys } from "src/config/mutationKeys";
import { CreateOfferRequest } from "src/types/offers";

interface IParams {
  campaignID: number;
}

export const useCreateOffer = ({ campaignID }: IParams) => {
  const { mutate: createOfferMutate, isPending: createOfferPending } =
    useMutation({
      mutationKey: mutationKeys.business.offers.createOffer,
      mutationFn: (body: CreateOfferRequest) => createOffer(campaignID, body),
    });

  return { createOfferMutate, createOfferPending };
};
