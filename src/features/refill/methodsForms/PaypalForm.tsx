import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import BillingAddress from "./BillingAddress";
import Amount from "./Amount";
import { Input } from "src/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { paypalSchema, PaypalFormData } from "../models/refill-schemas";
import { Button } from "src/components/ui/button/button";

export default function PaypalForm() {
  const t = useTranslations("refill");
  const methods = useForm<PaypalFormData>({ resolver: valibotResolver(paypalSchema) });
  const handleRefill = (data: PaypalFormData) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleRefill)}
        className="flex flex-col gap-[16px]"
      >
        <Amount />
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] font-[700]">{t("refillForm.paypalEmail")}</div>
          <Input
            name="email"
            placeholder={t("refillForm.paypalEmail")}
            icon="/static/icons/email.svg"
          />
        </div>
        <BillingAddress />
        <Button type="submit">{t("refillForm.button")}</Button>
      </form>
    </FormProvider>
  );
}
