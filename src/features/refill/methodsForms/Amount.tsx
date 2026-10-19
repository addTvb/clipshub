import { Input } from "src/components/ui/input";
import { useTranslations } from "next-intl";

export default function Amount() {
  const t = useTranslations("refill");
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-[16px] font-[700]">{t("refillForm.amount")}</div>
      <Input
        fieldMode="float"
        name="amount"
        placeholder={t("refillForm.minAmount")}
        icon="/static/icons/dollar-coin-black.svg"
      />
    </div>
  );
}
