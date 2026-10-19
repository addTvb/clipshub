import { PaymentMethodType } from "src/types/base";
import VisaMcIcon from "@icons/visa-mc-icon.svg";
import PaypalIcon from "@icons/paypal-mc-icon.svg";
import UsdtTrc20Icon from "@icons/usdt-trc20-colored.svg";
import UsdtErc20Icon from "@icons/usdt-erc20-colored.svg";
interface IProps {
  type: PaymentMethodType;
  onClick?: () => void;
}

const AddMethodButton = ({ type, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-[8px] group w-1/3 flex flex-col gap-[8px] items-center justify-center p-[12px] bg-gray100 hover:bg-blueLight active:scale-95 transition-[background-color,color,transform] duration-300"
    >
      {type === "bank_account" && <VisaMcIcon width={32} height={32} />}
      {type === "paypal" && <PaypalIcon width={32} height={32} />}
      {type === "usdt_trc20" && <UsdtTrc20Icon width={32} height={32} />}
      {type === "usdt_erc20" && <UsdtErc20Icon width={32} height={32} />}
    </button>
  );
};

export default AddMethodButton;
