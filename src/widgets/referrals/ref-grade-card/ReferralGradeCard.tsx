import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo } from "react";
import { Divider } from "src/components/ui/divider";
import { ReferralLevelItem } from "src/types/referrals";
import { GradeCardInfoItem } from "./GradeCardInfoItem";
import { formatRangeNumbers } from "src/lib/numbers/formatRangeNumbers";
import { GradeCardPriceItem } from "./GradeCardPriceItem";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { formatPercent } from "src/lib/numbers/formatPercent";
import clsx from "clsx";
import { RequirementsGradesInfo } from "./requirements-popover/RequirementsPopover";
import { UpgradePopover } from "./upgrade-popover/UpgradePopover";

const bgColors = {
  beginner: "bg-white",
  small: "bg-refGradeSmallClipper",
  medium: "bg-refGradeMediumClipper",
  big: "bg-refGradeBigClipper",
  influencer: "bg-refGradeInfluencerClipper",
};

interface IProps {
  referral: ReferralLevelItem;
}

export const ReferralGradeCard = ({ referral }: IProps) => {
  const t = useTranslations("influencer.referralProgram");

  return (
    <div
      className={clsx(
        "flex flex-col gap-[24px] p-[24px] rounded-[12px] bg-white w-full relative min-w-full min-[380px]:min-w-[278px] min-[591px]:max-w-[278px]",
        bgColors[referral.slug]
      )}
    >
      <RequirementsGradesInfo referral={referral} />
      <div className="flex flex-col gap-[6px] items-center">
        <Image
          src={`/static/images/ref-grades/${referral.slug}.webp`}
          alt=""
          width={112}
          height={112}
        />

        <h3 className="text-gray350 font-bold text-base text-center">
          {referral.title}
        </h3>
      </div>

      <div className="flex flex-col gap-[10px]">
        <GradeCardInfoItem
          title={t("followers")}
          icon={
            <Image
              src="/static/icons/two-people-gray.svg"
              alt=""
              width={18}
              height={18}
            />
          }
          value={formatRangeNumbers(
            referral.min_followers_count,
            referral.max_followers_count
          )}
        />
        <GradeCardInfoItem
          title={t("avgViewsPerPost")}
          icon={
            <Image
              src="/static/icons/eye-gray.svg"
              alt=""
              width={18}
              height={18}
            />
          }
          value={formatRangeNumbers(referral.min_avg_views_count, null)}
        />
        <GradeCardInfoItem
          title={
            <div className="flex items-center gap-[8px]">
              <span>{t("postedVia")}</span>
              <ClipsHubBadge />
            </div>
          }
          icon={
            <Image
              src="/static/icons/hashtag-gray.svg"
              alt=""
              width={18}
              height={18}
            />
          }
          value={formatRangeNumbers(referral.approved_post_count, null)}
        />
      </div>

      <Divider color="#DFE3EA" />

      <div className="flex flex-col gap-[8px]">
        <GradeCardPriceItem
          title={t("inviteReward")}
          value={
            <div className="flex items-center gap-[2px]">
              <div
                className={clsx(
                  "text-xl",
                  referral.invite_reward === null && "text-white400"
                )}
              >
                $
                {formatCurrency(
                  referral.invite_reward === null ? 0 : referral.invite_reward,
                  2
                )}
              </div>
              {referral.is_upgradable && (
                <UpgradePopover beginnerReward={0} smallClipperReward={0.5} />
              )}
            </div>
          }
        />
        <GradeCardPriceItem
          isPopover
          title={t("referralFee")}
          value={`${formatPercent(referral.fee_pct)}%`}
        />
      </div>
    </div>
  );
};

const ClipsHubBadge = memo(() => {
  return (
    <span className="p-[4px] rounded-[8px] bg-white50 flex items-center gap-[3px]">
      <Image src="/static/icons/small-logo.svg" alt="" width={54} height={10} />
    </span>
  );
});
ClipsHubBadge.displayName = "ClipsHubBadge";
