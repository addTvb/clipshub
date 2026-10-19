import clsx from "clsx";
import { Button } from "src/components/ui/button/button";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { useTranslations } from "use-intl";

interface IProps {
  cmpPrice: number;
  maxProfit: number;
  showButton?: boolean;
  onButtonClick?: () => void;
  buttonText?: string;
  className?: string;
  reward?: number;
  totalReward?: number;
}

export const OfferPricingCard = ({
  cmpPrice,
  maxProfit,
  showButton = false,
  onButtonClick,
  buttonText,
  className = "",
  reward,
  totalReward,
}: IProps) => {
  const tDetail = useTranslations("influencer.offerDetail");

  return (
    <div
      className={clsx(
        "shadow-cardShadow bg-white p-[24px] flex flex-col gap-[24px] rounded-[8px]",
        className
      )}
    >
      <div className="text-[20px] font-bold">{tDetail("cpmRate")}</div>
      <div className="flex flex-col gap-[8px]">
        {cmpPrice && cmpPrice > 0 && (
          <div className="flex justify-between">
            <div className="text-gray400 text-[15px] font-bold">
              {tDetail("per1000Views")}{" "}
              {maxProfit ? `(${tDetail("max")} ${maxProfit}$)` : ""}
            </div>
            <div className="text-[15px] font-bold">
              ${formatCurrency(cmpPrice)}
            </div>
          </div>
        )}
        {!!reward && (
          <div className="flex justify-between">
            <div className="text-gray400 text-[15px] font-bold">
              {tDetail("rewardsPerGoals")}
            </div>
            <div className="text-[15px] font-bold">
              ${formatCurrency(reward)}
            </div>
          </div>
        )}
        {!!maxProfit && (
          <div className="flex justify-between mt-[10px]">
            <div className="text-gray400 text-[20px] font-bold ">
              {tDetail("total")}
            </div>
            <div className="text-[20px] font-bold">
              ${formatCurrency(totalReward)}
            </div>
          </div>
        )}
      </div>
      {showButton && onButtonClick && (
        <Button onClick={onButtonClick}>
          {buttonText || tDetail("takeOffer")}
        </Button>
      )}
    </div>
  );
};
