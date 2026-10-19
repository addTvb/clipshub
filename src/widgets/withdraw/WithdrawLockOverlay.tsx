import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PAYMENT_METHODS = [
  { icon: "/static/icons/paypal-circle.svg" },
  { icon: "/static/icons/trc20-circle.svg" },
  { icon: "/static/icons/erc20-circle.svg" },
];

interface IProps {
  shouldShowOverlay: boolean;
}

export const WithdrawLockOverlay = ({ shouldShowOverlay }: IProps) => {
  const t = useTranslations("withdraw");
  const withdrawal = 10;

  if (shouldShowOverlay)
    return (
      <div className="absolute top-[-40px] left-[-20px] w-[calc(100%+30px)] h-[calc(100%+50px)] z-[40] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F3F6FACC] backdrop-blur-[3px]"></div>
        <div className="relative z-10 flex items-center gap-[6px] p-[8px]">
          <Image
            src="/static/icons/lock-blue.svg"
            alt="lock"
            width={24}
            height={24}
          />
          <div className="text-sm font-medium text-gray400">
            {t("minWithdrawal")} <b className="font-bold">${withdrawal}</b>
          </div>
          <div className="flex items-center justify-center">
            {PAYMENT_METHODS.map((method, index) => (
              <Image
                src={method.icon}
                alt=""
                width={62}
                height={62}
                key={method.icon}
                className={clsx(index !== 0 ? "ml-[-40px]" : "")}
              />
            ))}
          </div>
        </div>
      </div>
    );
};