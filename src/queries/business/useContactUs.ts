import { useMutation } from "@tanstack/react-query";
import { submitContactUs } from "src/api/business/contact-us";
import { ContactUsRequest, ContactUsResponse } from "src/types/contact-us";
import { mutationKeys } from "src/config/mutationKeys";

interface UseContactUsProps {
  onSuccess?: (response: ContactUsResponse) => void;
}

export const useContactUs = (props?: UseContactUsProps) => {
  const { mutate: submitContactUsMutate, isPending, error, data } = useMutation<
    ContactUsResponse,
    Error,
    ContactUsRequest
  >({
    mutationKey: mutationKeys.business.contactUs.submit,
    mutationFn: (body: ContactUsRequest) => submitContactUs(body),
    onSuccess: (response) => {
      if (props?.onSuccess) {
        props.onSuccess(response);
      }
    },
  });

  return { 
    submitContactUs: submitContactUsMutate, 
    isPending,
    error,
    data
  };
};
