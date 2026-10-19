import { ReactNode } from "react";
import { ReferralFeePopover } from "./referral-fee-popover/ReferralFeePopover";

interface IProps {
  title: string;
  value: string | ReactNode;
  isPopover?: boolean;
}

export const GradeCardPriceItem = ({ title, value, isPopover }: IProps) => {
  return (
    <div className="flex items-center justify-between gap-[20px]">
      <div className="text-gray350 font-[Inter] text-sm font-medium flex items-center gap-[4px]">
        <span>{title}</span>
        {isPopover && <ReferralFeePopover />}
      </div>

      <div className="text-textColor text-sm font-bold">{value}</div>
    </div>
  );
};
