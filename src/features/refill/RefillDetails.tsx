import CardsForm from "./methodsForms/CardsForm";
import TetherForm from "./methodsForms/TetherForm";
import { PaymentMethodType } from "src/types/base";
import { useTranslations } from "next-intl";

interface IProps {
  selectedMethod: PaymentMethodType | null;
}

export default function RefillDetails({ selectedMethod }: IProps) {
  const t = useTranslations("refill");
  switch (selectedMethod) {
    case "bank_account":
      return <CardsForm method="bank_account" />;
    case "credit_card":
      return <CardsForm method="credit_card" />;
    case "apple_pay":
      return <CardsForm method="apple_pay" />;
    case "paypal":
      return <CardsForm method="paypal" />;
    case "usdt_trc20":
      return <TetherForm currency="usdt_trc_20" />;
    case "usdt_erc20":
      return <TetherForm currency="usdt_erc_20" />;
    default:
      return (
        <div className="bg-white50 rounded-[8px] p-[18px] text-[14px] font-[500] font-[inter]">
          {t("choosePaymentMethod")}
        </div>
      );
  }
}
