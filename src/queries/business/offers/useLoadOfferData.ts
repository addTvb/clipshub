import { useEffect } from "react";
import { getOfferByID } from "src/api/business/offers";
import { useCreateOfferStore } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { AvgChannelViewsType } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

const viewMap = {
  0: "any",
  5000: "5k",
  50000: "50k",
  200000: "200k",
  500000: "500k",
};

export const useLoadOfferData = (
  offerID: string | number,
  offerType: "active" | "draft" = "active"
) => {
  const resetForm = useCreateOfferStore((state) => state.resetForm);
  const setOfferName = useCreateOfferStore((state) => state.setOfferName);
  const setSocialPlatform = useCreateOfferStore(
    (state) => state.setSocialPlatform
  );
  const setAdPosition = useCreateOfferStore((state) => state.setAdPosition);
  const setAdDuration = useCreateOfferStore((state) => state.setAdDuration);
  const setAdFileID = useCreateOfferStore((state) => state.setAdFileID);
  const setAdFileType = useCreateOfferStore((state) => state.setAdFileType);
  const setAdFileLink = useCreateOfferStore((state) => state.setAdFileLink);
  const setAdFileName = useCreateOfferStore((state) => state.setAdFileName);
  const setDescriptionBio = useCreateOfferStore(
    (state) => state.setDescriptionBio
  );
  const setLinkBio = useCreateOfferStore((state) => state.setLinkBio);
  const setDescriptionPost = useCreateOfferStore(
    (state) => state.setDescriptionPost
  );
  const setPinnedComment = useCreateOfferStore(
    (state) => state.setPinnedComment
  );
  const setMediaChannelCategories = useCreateOfferStore(
    (state) => state.setMediaChannelCategories
  );
  const setLanguage = useCreateOfferStore((state) => state.setLanguage);
  const setContentBrief = useCreateOfferStore((state) => state.setContentBrief);
  const setAvgChannelViews = useCreateOfferStore(
    (state) => state.setAvgChannelViews
  );
  const setPayoutAmount = useCreateOfferStore((state) => state.setPayoutAmount);
  const setLifetimePost = useCreateOfferStore((state) => state.setLifetimePost);
  const setMaxPayoutPerPost = useCreateOfferStore(
    (state) => state.setMaxPayoutPerPost
  );
  const setViewBonuses = useCreateOfferStore((state) => state.setViewBonuses);
  const setAdType = useCreateOfferStore((state) => state.setAdType);
  const setDynamicLinks = useCreateOfferStore((state) => state.setDynamicLinks);
  const setClipperAvatarFileID = useCreateOfferStore((state) => state.setClipperAvatarFileID);
  const setClipperAvatarFileLink = useCreateOfferStore((state) => state.setClipperAvatarFileLink);
  const setClipperAvatarFileName = useCreateOfferStore((state) => state.setClipperAvatarFileName);

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const offerData = await getOfferByID(Number(offerID));
        
        // Извлекаем данные для удобства
        const { active_adoffer_detail, pending_adoffer_detail } = offerData.ad_offer_detail;
        
        // Определяем offerDetail с fallback логикой
        // Приоритет: сначала тип, затем наличие данных
        const offerDetail = offerType === "active"
          ? active_adoffer_detail ?? pending_adoffer_detail
          : pending_adoffer_detail ?? active_adoffer_detail;

        if (!offerDetail) {
          console.error(
            `${offerType === "active" ? "Active" : "Pending"} offer detail not found`
          );
          return;
        }

        // Populate the store with fetched data
        setOfferName(offerDetail.ad_offer.name);
        setSocialPlatform(offerDetail.ad_offer.media_channel_type);
        setAdPosition(offerDetail.spec.banner_position);
        setAdDuration(String(offerDetail.spec.banner_duration));
        setAdFileID(offerDetail.spec.ban_file_id);
        setAdFileType(offerDetail.spec.banner_type);
        setAdFileLink(offerDetail.spec_banner_file?.link || "");
        setAdFileName(offerDetail.spec_banner_file?.name || "");
        setDescriptionBio(offerDetail.spec.profile_description_text || "");
        setLinkBio(offerDetail.spec.bio_url || "");
        setDescriptionPost(offerDetail.spec.post_description_text || "");
        setPinnedComment(offerDetail.spec.pinned_comment_text || "");
        setMediaChannelCategories(offerDetail.media_channel_category_ids || []);
        setLanguage(offerDetail.language_ids?.[0]?.toString() || "");
        setContentBrief(offerDetail.spec.description || "");
        setAvgChannelViews(
          (viewMap[
            offerDetail.ad_offer.min_avg_view_for_post_count as keyof typeof viewMap
          ] || "any") as AvgChannelViewsType
        );
        setPayoutAmount(offerDetail.pricing.cmp_price || 0);
        setLifetimePost(offerDetail.pricing.ttl_days || 0);
        setMaxPayoutPerPost(offerDetail.pricing.max_profit || 0);
        setAdType(offerDetail.spec.integration_type);
        setDynamicLinks(
          offerDetail.spec.content_sources.map((source) => ({
            title: source.description,
            link: source.url,
          }))
        );
        setClipperAvatarFileID(offerDetail.spec.clipper_avatar_file_id ?? 0);
        setClipperAvatarFileLink(offerDetail.spec_clipper_avatar?.link ?? "");
        setClipperAvatarFileName(offerDetail.spec_clipper_avatar?.name ?? "");
        
        // Загружаем бонусы из нового поля
        if (
          offerDetail.pricing.view_bonuses &&
          Array.isArray(offerDetail.pricing.view_bonuses)
        ) {
          setViewBonuses(offerDetail.pricing.view_bonuses);
        } else {
          setViewBonuses([]);
        }
      } catch (error) {
        console.error("Failed to fetch offer data:", error);
      }
    };

    if (offerID) {
      fetchOfferData();
    }

    // Clear the store when component unmounts
    return () => {
      resetForm();
    };
  }, [
    offerID,
    offerType,
    resetForm,
    setOfferName,
    setSocialPlatform,
    setAdPosition,
    setAdDuration,
    setAdFileID,
    setAdFileType,
    setAdFileLink,
    setAdFileName,
    setDescriptionBio,
    setLinkBio,
    setDescriptionPost,
    setPinnedComment,
    setMediaChannelCategories,
    setLanguage,
    setContentBrief,
    setAvgChannelViews,
    setPayoutAmount,
    setLifetimePost,
    setMaxPayoutPerPost,
    setViewBonuses,
    setAdType,
    setDynamicLinks,
    setClipperAvatarFileID,
    setClipperAvatarFileLink,
    setClipperAvatarFileName,
  ]);
};
