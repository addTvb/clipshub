import { useTranslations } from "next-intl";
import ChooseMethodButton from "src/features/refill/chooseMethod/ChooseMethodButton";
import { PaymentMethodType } from "src/types/base";

interface IProps {
  onSelect: (method: PaymentMethodType) => void;
  selectedMethod: PaymentMethodType | null;
}

export default function ChooseMethod({ onSelect, selectedMethod }: IProps) {
  const t = useTranslations("refill");

  return (
    <>
      <div className="text-[16px] font-bold">{t("chooseMethod.title")}</div>
      <div className="flex gap-[12px]">
        <ChooseMethodButton
          type="usdt_trc20"
          active={selectedMethod === "usdt_trc20"}
          onClick={() => {
            onSelect("usdt_trc20");
          }}
        />
        <ChooseMethodButton
          type="usdt_erc20"
          active={selectedMethod === "usdt_erc20"}
          onClick={() => {
            onSelect("usdt_erc20");
          }}
        />
        <ChooseMethodButton
          type="credit_card"
          active={selectedMethod === "credit_card"}
          onClick={() => {
            onSelect("credit_card");
          }}
        />
        <ChooseMethodButton
          type="apple_pay"
          active={selectedMethod === "apple_pay"}
          onClick={() => {
            onSelect("apple_pay");
          }}
        />
        <ChooseMethodButton
          type="paypal"
          active={selectedMethod === "paypal"}
          onClick={() => {
            onSelect("paypal");
          }}
        />
      </div>
    </>
  );
}
