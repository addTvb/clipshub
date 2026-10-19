import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Amount from "./Amount";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { cardsSchema, CardsFormData } from "../models/refill-schemas";
import { Button } from "src/components/ui/button/button";
import { useCreateDepositMutation } from "src/queries/refill/useCreateDepositMutation";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import { PaymentMethodType } from "src/types/base";

interface IProps {
  method: PaymentMethodType;
}

export default function CardsForm({ method }: IProps) {
  const t = useTranslations("refill");
  const methods = useForm<CardsFormData>({
    resolver: valibotResolver(cardsSchema),
  });
  const currency = "usd";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactionId = useMemo(() => uuidv4(), [method]);
  const mutation = useCreateDepositMutation(transactionId, currency);

  const handleRefill = (data: CardsFormData) => {
    mutation.mutate(
      {
        amount_usd: data.amount,
        currency,
        method,
        transaction_id: transactionId,
      },
       {
         onSuccess: (data) => {
           const paymentUrl = data.deposit.metadata.payment_url;
           if (typeof paymentUrl === "string") {
             window.open(paymentUrl, "_blank");
           }
         },
       }
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleRefill)}
        className="flex flex-col gap-[16px]"
      >
        <Amount />
        {/* <BillingAddress /> */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? t("refillForm.processing")
            : t("refillForm.button")}
        </Button>
      </form>
    </FormProvider>
  );
}
