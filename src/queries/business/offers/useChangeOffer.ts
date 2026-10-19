import { useState } from "react";
import { changeOfferByID } from "src/api/business/offers";
import { CreateOfferRequest, OfferByIDResponse } from "src/types/offers";

interface ChangeOfferParams {
  id: number;
  body: CreateOfferRequest;
}

export const useChangeOffer = () => {
  const [changeOfferPending, setChangeOfferPending] = useState(false);

  const changeOfferMutate = async (
    params: ChangeOfferParams,
    options?: {
      onSuccess?: (data: OfferByIDResponse) => void;
      onError?: (error: Error) => void;
    }
  ) => {
    try {
      setChangeOfferPending(true);
      const response = await changeOfferByID(params.id, params.body);
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      options?.onError?.(error as Error);
      throw error;
    } finally {
      setChangeOfferPending(false);
    }
  };

  return {
    changeOfferMutate,
    changeOfferPending,
  };
}; 