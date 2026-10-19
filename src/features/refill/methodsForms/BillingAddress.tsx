import { Input } from "src/components/ui/input";
import { useTranslations } from "next-intl";
import { FormSelect } from "src/components/ui/form-select";


// Временный список стран
// TODO: Добавить список стран из API или завести константу
const countries = [
  { value: "RU", name: "Russia" },
  { value: "UA", name: "Ukraine" },
  { value: "KZ", name: "Kazakhstan" },
  { value: "BY", name: "Belarus" },
  { value: "US", name: "USA" },
];

export default function BillingAddress() {
  const t = useTranslations("refill");
  return (
    <div className="grid lg:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[16px]">
      <div className="flex-1 flex flex-col gap-[10px]">
          <label
            htmlFor="country"
            className="text-[16px] font-bold text-textColor "
          >
            {t("refillForm.billingAddress.country")}
          </label>
          <FormSelect
            name="country"
            options={countries}
            placeholder={t("refillForm.billingAddress.country")}
            icon="/static/icons/location-pin-black.svg"
            className="h-[42px]"
          />
        </div>
      <div className="flex-1 flex flex-col gap-[10px]">
        <label htmlFor="city" className="text-[16px] font-bold text-textColor ">
          {t("refillForm.billingAddress.city")}
        </label>
        <Input
          name="city"
          placeholder={t("refillForm.billingAddress.city")}
          icon="/static/icons/location-pin-black.svg"
        />
      </div>
      <div className="flex-1 flex flex-col gap-[10px]">
        <label htmlFor="billingAddress" className="text-[16px] font-bold text-textColor ">
          {t("refillForm.billingAddress.billingAddress")}
        </label>
        <Input
          name="billingAddress"
          placeholder={t("refillForm.billingAddress.billingAddress")}
          icon="/static/icons/location-pin-black.svg"
        />
      </div>
      <div className="flex-1 flex flex-col gap-[10px]">
        <label htmlFor="postalCode" className="text-[16px] font-bold text-textColor ">
          {t("refillForm.billingAddress.postalCode")}
        </label>
        <Input
          name="postalCode"
          placeholder={t("refillForm.billingAddress.postalCode")}
          icon="/static/icons/email.svg"
        />
      </div>
    </div>
  );
}
