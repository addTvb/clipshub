import VisaMcIcon from "@icons/visa-mc.svg";
import PaypalIcon from "@icons/paypal-colored.svg";
import UsdtTrc20Icon from "@icons/usdt-trc20-colored.svg";
import UsdtErc20Icon from "@icons/usdt-erc20-colored.svg";
import ApplePayIcon from "@icons/apple-pay-icon.svg";
import clsx from "clsx";
import { PaymentMethodType } from "src/types/base";

interface IProps {
  type: PaymentMethodType;
  active?: boolean;
  onClick?: () => void;
}

const ChooseMethodButton = ({ type, onClick, active }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[8px] group w-1/3 flex flex-col gap-[8px] items-center justify-center p-[12px] hover:bg-blueLight active:scale-95 transition-[background-color,color,transform] duration-300",
        active ? "bg-textColor hover:bg-textColor cursor-default" : "bg-gray100"
      )}
    >
      {(type === "bank_account" || type === "credit_card") && (
        <VisaMcIcon width={32} height={32} />
      )}
      {type === "paypal" && <PaypalIcon width={32} height={32} />}
      {type === "usdt_trc20" && <UsdtTrc20Icon width={32} height={32} />}
      {type === "usdt_erc20" && <UsdtErc20Icon width={32} height={32} />}
      {type === "apple_pay" && (
        <ApplePayIcon
          width={32}
          height={32}
          className={clsx(active ? "text-white" : "text-black")}
        />
      )}
    </button>
  );
};

export default ChooseMethodButton;
