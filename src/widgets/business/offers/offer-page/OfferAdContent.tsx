"use client";

import { useTranslations } from "next-intl";
import { AdOfferDetailForBusiness } from "src/types/offers";
import DOMPurify from "isomorphic-dompurify";

interface IProps {
  offerDetail: AdOfferDetailForBusiness;
}

const socialPlatformTitle = {
  youtube: "YouTube (Shorts)",
  instagram: "Instagram (Reels)",
  tiktok: "TikTok",
};
const descPlatformBio = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
};
const linkPlatformBio = {
  youtube: "Channel",
  instagram: "Profile",
  tiktok: "Profile",
};
const descPlatform = {
  youtube: "Shorts",
  instagram: "Reels",
  tiktok: "Video",
};

export const OfferAdContent = ({ offerDetail }: IProps) => {
  const t = useTranslations("business");

  const platform = offerDetail.ad_offer.media_channel_type;
  return (
    <div className="bg-white px-[12px] py-[24px] sm:p-[24px] sm:pt-[32px] rounded-[8px] flex flex-col gap-[24px]">
      <div className="text-xl sm:text-[28px] font-bold">
        {t("offer.uploadedAdContentForPlatform", {
          platform: socialPlatformTitle[platform],
        })}
      </div>

      {(offerDetail.spec.banner_duration ||
        offerDetail.spec.banner_duration === 0) && (
        <AdContentItem
          title={t("offerForm.adDuration")}
          value={
            offerDetail.spec.banner_duration === 0
              ? t("offer.entireVideo")
              : String(offerDetail.spec.banner_duration)
          }
        />
      )}

      {!!offerDetail.spec.profile_description_text && (
        <AdContentItem
          title={t("offer.descriptionPlatformBio", {
            platform: descPlatformBio[platform],
          })}
          value={offerDetail.spec.profile_description_text}
        />
      )}

      {!!offerDetail.spec.bio_url && (
        <AdContentItem
          title={t("offer.linkChannelBio", {
            platform: linkPlatformBio[platform],
          })}
          value={offerDetail.spec.bio_url}
        />
      )}

      {!!offerDetail.spec.post_description_text && (
        <AdContentItem
          title={t("offer.descriptionPlatform", {
            platform: descPlatform[platform],
          })}
          value={offerDetail.spec.post_description_text}
        />
      )}

      {!!offerDetail.spec.pinned_comment_text && (
        <AdContentItem
          title={t("offerForm.pinnedComment")}
          value={offerDetail.spec.pinned_comment_text}
        />
      )}
    </div>
  );
};

const AdContentItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col gap-[10px] sm:gap-[16px] text-textColor">
      <div className="text-lg sm:text-xl font-bold">{title}</div>
      <div
        className="rounded-[8px] bg-white50 p-[18px] text-sm break-words font-medium"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      />
    </div>
  );
};
