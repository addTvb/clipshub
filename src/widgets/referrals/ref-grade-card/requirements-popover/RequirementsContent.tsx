import { useTranslations } from "next-intl";
import React from "react";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { formatRangeNumbers } from "src/lib/numbers/formatRangeNumbers";
import { ReferralLevelItem } from "src/types/referrals";

interface IProps {
  referral: ReferralLevelItem;
  isMobile?: boolean;
}

export const RequirementsContent = ({ referral, isMobile }: IProps) => {
  const t = useTranslations("influencer.referralProgram");
  return (
    <div className="text-gray400 text-sm font-medium max-w-[336px] w-full font-[Inter]">
      {isMobile
        ? t.rich("clipperRequirementsTextMobile", {
            inviteReward: () => (
              <strong className="font-[900]">${formatCurrency(referral.invite_reward)}</strong>
            ),
            followers: () => (
              <strong className="font-[900]">
                {formatRangeNumbers(
                  referral.min_followers_count,
                  referral.max_followers_count
                )}
              </strong>
            ),
            views: () => (
              <strong className="font-[900]">
                {formatRangeNumbers(referral.min_avg_views_count, null)}
              </strong>
            ),
            clipsHubPosts: () => (
              <strong className="font-[900]">
                {formatRangeNumbers(referral.approved_post_count, null)}{" "}
                {t("clipViaClipsHub")}
              </strong>
            ),
            br: () => <br></br>,
          })
        : t.rich("clipperRequirementsText", {
            grade: () => (
              <strong className="capitalize">
                {referral.slug} {t("clipperRequirements")}
              </strong>
            ),
            inviteReward: () => (
              <strong>${formatCurrency(referral.invite_reward)}</strong>
            ),
            followers: () => (
              <strong>
                {formatRangeNumbers(
                  referral.min_followers_count,
                  referral.max_followers_count
                )}
              </strong>
            ),
            views: () => (
              <strong>
                {formatRangeNumbers(referral.min_avg_views_count, null)}
              </strong>
            ),
            clipsHubPosts: () => (
              <strong>
                {formatRangeNumbers(referral.approved_post_count, null)}{" "}
                {t("clipViaClipsHub")}
              </strong>
            ),
            br: () => <br></br>,
          })}
    </div>
  );
};
