import { useTranslations } from "next-intl";
import React from "react";
import { ReferralGradeCard } from "./ref-grade-card/ReferralGradeCard";
import { useGetReferralsInfo } from "./model/useGetReferralsInfo";
import { Spinner } from "src/components/ui/spinner";
import { useWindowSize } from "usehooks-ts";
import { GradeCardsCarousel } from "./grade-cards-carousel/GradeCardsCarousel";

export const ReferralGradesBlock = () => {
  const t = useTranslations("influencer.referralProgram");
  const { width } = useWindowSize();

  const { referrals, isLoading } = useGetReferralsInfo();

  if (
    (!isLoading && !referrals) ||
    (referrals?.items && referrals?.items?.length <= 0)
  )
    return null;

  return (
    <div className="flex flex-col gap-[24px] ">
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-textColor font-bold lg:text-[28px] text-xl">
          {t("referralGrade")}
        </h2>
        <p className="text-gray400 font-[Inter] font-medium ">
          {t("referralGradeDesc")}
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[343px] items-center justify-center bg-white">
          <Spinner color="dark" />
        </div>
      ) : (
        <div>
          {width <= 590 ? (
            <GradeCardsCarousel referrals={referrals} />
          ) : (
            <div className="flex items-stretch gap-[12px] flex-wrap justify-center">
              {referrals?.items.map((referral) => (
                <ReferralGradeCard
                  key={`${referral.slug}-ref-card`}
                  referral={referral}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
