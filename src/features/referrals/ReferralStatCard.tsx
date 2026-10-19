import PeopleIcon from "@public/static/images/stats/man-blue.svg";
import PepleCashIcon from "@public/static/images/stats/man-green-cash.svg";
/* import TrandIcon from "@public/static/images/stats/trend-arrow-up.svg"; */
import { useTranslations } from "next-intl";

type StatCardType = "profit" | "referrals";

interface IProps {
  cardType: StatCardType;
  value: string | number;
  /*  subValue?: string | number; */
}

export const ReferralStatCard = ({
  cardType,
  value,
  /* subValue */
}: IProps) => {
  const tReferralProgram = useTranslations("influencer.referralProgram");

  return (
    <div className="shadow-cardShadow p-[16px] flex flex-col gap-[30px] rounded-[8px] bg-white">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[18px]">
          <div className="text-[16px] font-[700] text-gray400">
            {cardType === "referrals"
              ? tReferralProgram("totalReferrals")
              : tReferralProgram("totalProfit")}
          </div>
          <div className="text-[28px] font-[700] text-textColor">
            {cardType === "profit" ? `$${value}` : value}
          </div>
        </div>

        {cardType === "referrals" ? (
          <PeopleIcon className="size-[60px]" />
        ) : (
          <PepleCashIcon className="size-[60px]" />
        )}
      </div>

      {/* The functionality is not implemented in the AP*/}
      {/* <div className="flex items-center gap-[8px]">
        <TrandIcon />
        <div className="text-[16px] font-[600] text-gray600">
          <span className="text-green100">{subValue} </span> {tReferralProgram("upFromYesterday")}
        </div>
      </div> */}
    </div>
  );
};
