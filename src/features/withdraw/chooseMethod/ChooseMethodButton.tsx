import VisaIcon from "@icons/visa.svg";
import PaypalIcon from "@icons/paypal.svg";
import UsdtTrc20Icon from "@icons/usdt-trc20.svg";
import { formatWalletAddress } from "src/lib/formatWalletAddress";
import { useWindowSize } from "usehooks-ts";
import clsx from "clsx";
import { PaymentMethodType } from "src/types/base";
import UsdtErc20Icon from "@icons/usdt-erc20.svg";

interface IProps {
  methodType: PaymentMethodType;
  paymentDetail: string;
  comment?: string;
  active?: boolean;
  onClick?: () => void;
}

const ChooseMethodButton = ({
  methodType,
  paymentDetail,
  comment,
  active,
  onClick,
}: IProps) => {
  const { width } = useWindowSize();

  const renderMethodIcon = () => {
    switch (methodType) {
      case "bank_account":
        return <VisaIcon width={26} hanging={26} />;
      case "paypal":
        return <PaypalIcon width={26} hanging={26} />;
      case "usdt_trc20":
        return <UsdtTrc20Icon width={26} hanging={26} />;
      case "usdt_erc20":
        return <UsdtErc20Icon width={26} hanging={26} />;
      default:
        return null;
    }
  };

  const walletCharsLength = width <= 400 ? 4 : 7;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center pr-[9px] rounded-[6px] border-solid border-[1px] relative transition-bg duration-300",
        active ? "bg-dark100 border-[#3F4C62]" : "bg-white border-blue100"
      )}
    >
      <div
        className={clsx(
          "p-[8px] mr-[12px] rounded-tl-[6px] rounded-bl-[6px] transition-bg duration-300",
          active ? "bg-black400" : "bg-white50"
        )}
      >
        <div className="px-[6px] py-[2px] rounded-[6px] bg-white">
          {renderMethodIcon()}
        </div>
      </div>
      <div
        className={clsx(
          "text-[14px] font-[600] font-[Inter] truncate transition-color duration-300 mr-[20px] min-w-0",
          active ? "text-white" : "text-gray400"
        )}
      >
        {methodType === "usdt_trc20" && width <= 600
          ? formatWalletAddress(
              paymentDetail,
              walletCharsLength,
              walletCharsLength
            )
          : paymentDetail}
      </div>
      <div className="text-gray550 text-[14px] font-[500] font-[Inter] ml-auto truncate w-full max-w-[100px] text-right">
        {comment}
      </div>
      <div className="opacity-[0] hover:opacity-[1] transition-opacity duration-300 border-[3px] border-solid border-[rgba(49,136,170,0.15)] rounded-[9px] absolute w-[calc(100%+8px)] h-[calc(100%+8px)] top-[-4px] left-[-4px]"></div>
    </button>
  );
};

export default ChooseMethodButton;
