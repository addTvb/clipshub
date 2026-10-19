import { AdPositionView } from "src/features/influencers/offers/AdPositionView";
import Image from "next/image";
import TextCard from "src/components/ui/text-card";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button/button";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "use-intl";
import { useState, useEffect, useRef } from "react";
import ArrowIcon from "@icons/arrow-right-white.svg";
import WarningIcon from "@icons/warning-notification.svg";
import { OfferType } from "src/types/offers";
import { PostType } from "src/types/posts";
import { AdOfferCampaignDetail } from "src/types/campaigns";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { useAppendMediaPostMutation } from "src/queries/influencers/useAppendMediaPostMutation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { postLinkSchema } from "./model/post-link-schemas";
import { Link } from "src/i18n/routing";
import { AutoChecksStatus } from "./AutoChecksStatus";
import { HintLabel } from "src/components/ui/hint-label";
import { Divider } from "src/components/ui/divider";
import { HalfScreenPositionSelector } from "src/features/business/offers/HalfScreenPositionSelector";
import {
  AD_TYPES_HINTS,
  AD_TYPES_OBJ,
} from "src/features/business/offers/model/adTypes";
import { BannerPreview } from "src/components/ui/banner-preview";
import { WaterMark } from "src/features/watermark/WaterMark";
import HelpIcon from "@public/static/icons/help-icon.svg";
import LinkIcon from "@public/static/icons/link-icon.svg";
import DOMPurify from "isomorphic-dompurify";

interface IProps {
  offer: OfferType;
  post: PostType;
  campaignDetail: AdOfferCampaignDetail;
}

interface SubmitFormData {
  shortsLink: string;
}

const makePostGuide = {
  youtube: {
    pageTitle: "influencer.takeOfferForm.youtubeShortsPageTitle",
    postDescription: {
      title: "influencer.takeOfferForm.makeDescription",
      imageURL: "/static/images/youtube-shorts-screen.webp",
      imageDesc: "influencer.takeOfferForm.descriptionInShorts",
      imageWidth: 187,
      imageHeight: 332,
    },
    channelBio: {
      bioTitle: "influencer.takeOfferForm.updateDescription",
      linkTitle: "influencer.takeOfferForm.updateLink",
      linkTitleDesc: "",
      imageURL: "/static/images/youtube-channel-screen.webp",
      imageDesc: "influencer.takeOfferForm.descAndLinkInBio",
      imageWidth: 282,
      imageHeight: 267,
    },
    comment: {
      title: "influencer.takeOfferForm.makePinnedComment",
      imageURL: "/static/images/youtube-comment-screen.webp",
      imageDesc: "influencer.takeOfferForm.pinnedComment",
      imageWidth: 153,
      imageHeight: 331,
    },
    postLink: {
      title: "influencer.takeOfferForm.enterShortsLink",
      placeholder: "influencer.takeOfferForm.shortsLinkPlaceholder",
    },
  },
  instagram: {
    pageTitle: "influencer.takeOfferForm.instagramReelsPageTitle",
    postDescription: {
      title: "influencer.takeOfferForm.instagramReelsTitle",
      imageURL: "/static/images/insta-reels-screen.webp",
      imageDesc: "influencer.takeOfferForm.instagramReelsTitleImageDesc",
      imageWidth: 153,
      imageHeight: 330,
    },
    channelBio: {
      bioTitle: "influencer.takeOfferForm.instagramChannelBioTitle",
      linkTitle: "influencer.takeOfferForm.instagramLinkBioTitle",
      linkTitleDesc: "",
      imageURL: "/static/images/insta-bio-screen.webp",
      imageDesc: "influencer.takeOfferForm.instagramChannelBioImageDesc",
      imageWidth: 254,
      imageHeight: 182,
    },
    comment: null,
    // comment: {
    //   title: "influencer.takeOfferForm.instagramPinnedCommentTitle",
    //   imageURL: "/static/images/insta-comment-screen.webp",
    //   imageDesc: "influencer.takeOfferForm.instagramCommentImageDesc",
    //   imageWidth: 153,
    //   imageHeight: 330,
    // },
    postLink: {
      title: "influencer.takeOfferForm.instagramUploadLinkTitle",
      placeholder: "influencer.takeOfferForm.instagramUploadLinkPlaceholder",
    },
  },
  tiktok: {
    pageTitle: "influencer.takeOfferForm.tiktokPageTitle",
    postDescription: {
      title: "influencer.takeOfferForm.tiktokDescPostTitle",
      imageURL: "/static/images/tiktok-post-screen.webp",
      imageDesc: "influencer.takeOfferForm.tiktokPostDescImageDesc",
      imageWidth: 153,
      imageHeight: 294,
    },
    channelBio: {
      bioTitle: "influencer.takeOfferForm.tiktokBioTitle",
      linkTitle: "influencer.takeOfferForm.tiktokBioLinkTitle",
      linkTitleDesc: "influencer.takeOfferForm.tiktokBioLinkTitleDesc",
      imageURL: "/static/images/tiktok-profile-screen.webp",
      imageDesc: "influencer.takeOfferForm.tiktokChannelBioImageDesc",
      imageWidth: 252,
      imageHeight: 283,
    },
    comment: null,
    postLink: {
      title: "influencer.takeOfferForm.tiktokUploadLinkTitle",
      placeholder: "influencer.takeOfferForm.tiktakUploadLinkPlaceholder",
    },
  },
};

const MakePost = ({ offer, post, campaignDetail }: IProps) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { languages } = useLanguagesDictionary();
  const { appendMediaPostMutate, appendMediaPostPending } =
    useAppendMediaPostMutation();
  const [autoChecks, setAutoChecks] = useState<Record<string, boolean>>({});
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const makePostGuideByChannel =
    makePostGuide[offer.ad_offer.media_channel_type];

  const postStatus = post.post.status;
  const offerStatus = offer.ad_offer.status;

  const bannerDuration = {
    0: t("influencer.takeOfferForm.entireVideo"),
  };

  const methods = useForm<SubmitFormData>({
    resolver: valibotResolver(postLinkSchema),
    defaultValues: {
      shortsLink: "",
    },
  });

  // Эффект для управления таймером
  useEffect(() => {
    if (isTimerActive && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setTimerSeconds(30);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, timerSeconds]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const onSubmit = async (data: SubmitFormData) => {
    // Сбрасываем предыдущие проверки при новой отправке
    setAutoChecks({});

    appendMediaPostMutate(
      {
        postId: post.post.id,
        body: { url: data.shortsLink },
      },
      {
        onSuccess: (responseData) => {
          if (responseData.auto_checks) {
            // Обрабатываем проверки и показываем их пользователю
            setAutoChecks(responseData.auto_checks);

            // Проверяем, есть ли ошибки (false значения)
            const hasErrors = Object.values(responseData.auto_checks).some(
              (check) => !check
            );

            if (hasErrors) {
              // Запускаем таймер на 30 секунд только если есть ошибки
              setIsTimerActive(true);
              setTimerSeconds(30);
            } else {
              // Все проверки прошли успешно
              queryClient.invalidateQueries({
                queryKey: queryKeys.influencers.posts.getPostById(post.post.id),
              });
            }
          } else {
            // Успешная отправка без проверок
            queryClient.invalidateQueries({
              queryKey: queryKeys.influencers.posts.getPostById(post.post.id),
            });
          }
        },
      }
    );
  };

  return (
    <>
      {postStatus === "closed" && offerStatus === "moderated" && (
        <div className="bg-white p-[24px] pt-[32px] rounded-[8px] w-full max-w-contentMaxWidth  flex flex-col gap-[16px]">
          <div className="flex items-start gap-[12px]">
            <WarningIcon className="flex-none size-[24px]" />
            <div className="text-gray400 text-[14px] font-[500]">
              {t.rich("influencer.takeOfferForm.deadlineExpired", {
                time: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="text-[16px] font-bold flex items-center gap-[8px]">
              {t("influencer.takeOfferForm.whatsNext")}
            </div>

            <div className="text-gray400 text-[14px] font-[500]">
              {t("influencer.takeOfferForm.whatNextAfterExpiry")}
            </div>

            <div className="text-gray400 text-[14px] font-[500]">
              {t.rich("influencer.takeOfferForm.retakeRecommendation", {
                retakeLink: (chunks) => (
                  <Link
                    href={`/influencers/offers/${offer.ad_offer.id}`}
                    className="underline text-blue300 font-[500]"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </div>
          </div>
        </div>
      )}
      {postStatus === "closed" && offerStatus !== "moderated" && (
        <div className="bg-white p-[24px] pt-[32px] rounded-[8px] w-full max-w-contentMaxWidth  flex flex-col gap-[16px]">
          <div className="flex items-start gap-[12px]">
            <WarningIcon className="flex-none size-[24px]" />
            <div className="text-gray400 text-[14px] font-[500]">
              {t("influencer.takeOfferForm.budgetRanOut")}
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="text-[16px] font-bold flex items-center gap-[8px]">
              {t("influencer.takeOfferForm.whatsNext")}
            </div>

            <div className="text-gray400 text-[14px] font-[500]">
              {t.rich("influencer.takeOfferForm.browseOtherOffers", {
                link: (chunks) => (
                  <Link
                    href="/influencers/offers"
                    className="underline text-blue300 font-[500]"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative bg-white lg:p-[24px] p-[12px] pt-[32px] rounded-[8px] w-full max-w-contentMaxWidth h-fit ${
          postStatus === "closed" ? "opacity-[0.2]" : ""
        }`}
      >
        <Link
          className="hidden lg:flex absolute top-[-38px] right-0 items-center gap-1.5 whitespace-nowrap text-blue300 font-[Manrope] text-[14px] font-bold"
          href={`/clipper/how-it-works?adType=${offer.spec.integration_type}`}
          target="_blank"
        >
          <HelpIcon className="w-4 h-4 text-blue300" />
          {t("common.howItWorks")}
          <LinkIcon className="w-4 h-4 text-blue300" />
        </Link>

        {postStatus === "closed" && (
          <div className="absolute size-[100%] top-0 left-0 z-10"></div>
        )}

        <div className="absolute -top-[8px] rounded-[8px] bg-primary py-[4px] px-[6px] text-base font-bold text-white capitalize">
          {t("influencer.takeOfferForm.stepNumber", { number: 1 })}
        </div>

        <div className="flex flex-col gap-[24px] relative z-1">
          <div className="text-textColor lg:text-[28px] text-[20px] font-bold">
            {t(makePostGuideByChannel.pageTitle)}
          </div>

          <div className="flex flex-col gap-[24px] pb-[24px]">
            <div className="space-y-[12px]">
              <div className="text-base font-bold">
                {t("common.adType.title")}
              </div>
              <div className="space-y-[8px]">
                <div className="flex items-center gap-[8px]">
                  {(
                    AD_TYPES_OBJ[offer.spec.integration_type] as {
                      icon: string;
                    }
                  ).icon && (
                    <Image
                      src={
                        (
                          AD_TYPES_OBJ[offer.spec.integration_type] as {
                            icon: string;
                          }
                        ).icon
                      }
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  <span>
                    {t(AD_TYPES_OBJ[offer.spec.integration_type].title)}
                  </span>
                </div>
                <div className="text-sm text-gray600">
                  {t.has(AD_TYPES_HINTS[offer.spec.integration_type])
                    ? t(AD_TYPES_HINTS[offer.spec.integration_type])
                    : null}
                </div>
              </div>
            </div>

            <Divider />

            {offer.spec_banner_file?.link && offer.spec?.banner_position && (
              <>
                <div className="grid grid-cols-[1fr_auto_1fr] justify-between gap-[12px]">
                  {offer.spec_banner_file?.link && (
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-[8px] text-textColor lg:text-[20px] text-[16px] font-bold mb-[10px]">
                        <Image
                          src={"/static/icons/download.svg"}
                          alt="download icon"
                          width={20}
                          height={20}
                        />
                        {t("influencer.takeOfferForm.downloadAdAssets")}
                      </div>
                      <div className="text-gray600 text-[14px] font-[500] mb-[16px] md:block hidden">
                        {t("influencer.takeOfferForm.downloadAdDesc")}
                      </div>
                      <div className="flex items-center gap-[64px]">
                        <div className="flex flex-col gap-[12px] w-full max-w-[300px]">
                          <BannerPreview
                            bannerType={
                              offer.spec.banner_type === "video"
                                ? "video"
                                : "image"
                            }
                            bannerUrl={offer.spec_banner_file?.link}
                            bannerName={offer.spec_banner_file?.name}
                          />

                          <a
                            href={offer.spec_banner_file?.link}
                            download={true}
                            className="flex flex-col items-center duration-200 text-blue300 text-base font-medium mt-[8px] sm:mt-0 underline truncate hover:text-blue400 transition-color"
                          >
                            {t("influencer.takeOfferForm.download")}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {offer.spec?.banner_position && (
                    <>
                      <Divider vertical className="min-h-[150px]" />

                      {offer.spec.integration_type === "half_screen" ? (
                        <HalfScreenPositionSelector
                          title={t(
                            "business.offerForm.choosePositionAdHalfScreenForClipper"
                          )}
                        />
                      ) : (
                        <AdPositionView
                          // title={t(
                          //   "business.offerForm.choosePositionAdHalfScreenForClipper"
                          // )}
                          position={offer.spec.banner_position}
                        />
                      )}
                    </>
                  )}
                </div>

                <Divider />
              </>
            )}
            {offer.spec_clipper_avatar?.link && (
              <>
                <div className="grid max-[500px]:grid-cols-1 max-[500px]:grid-rows-[1fr_auto_1fr] grid-cols-[1fr_auto_1fr] items-center justify-between gap-[24px]">
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center gap-[8px] text-textColor lg:text-[20px] text-[16px] font-bold mb-[10px]">
                      <Image
                        src={"/static/icons/download.svg"}
                        alt="download icon"
                        width={20}
                        height={20}
                      />
                      {t("influencer.takeOfferForm.downloadAvatar")}
                    </div>
                    <div
                      className="text-gray600 text-sm font-medium mb-[16px]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          t.raw("influencer.takeOfferForm.downloadAvatarDesc")
                        ),
                      }}
                    />

                    <div className="flex flex-col gap-[12px] w-full max-w-[300px]">
                      <BannerPreview
                        bannerType="image"
                        bannerUrl={offer.spec_clipper_avatar?.link}
                        bannerName={offer.spec_clipper_avatar?.name}
                      />

                      <a
                        href={offer.spec_clipper_avatar?.link}
                        download={true}
                        className="flex flex-col items-center duration-200 text-blue300 text-base font-medium mt-[8px] sm:mt-0 underline truncate hover:text-blue400 transition-color"
                      >
                        {t("influencer.takeOfferForm.download")}
                      </a>
                    </div>
                  </div>

                  <Divider
                    vertical
                    className="min-h-[250px] max-[500px]:hidden"
                  />
                  <Divider className="max-[500px]:block hidden" />

                  <Image
                    src="/static/images/offer-avatar-example.png"
                    alt=""
                    width={302}
                    height={219}
                  />
                </div>
                <Divider />
              </>
            )}

            {campaignDetail?.ad_campaign?.settings
              ?.allow_platform_watermark && (
              <>
                <div className="grid max-[600px]:grid-cols-1 max-[600px]:grid-rows-[1fr_auto_1fr] grid-cols-[1fr_auto_1fr] items-center justify-between gap-[24px]">
                  <WaterMark watermark={offer?.spec_watermark_file} />

                  <Divider
                    vertical
                    className="min-h-[250px] max-[600px]:hidden"
                  />
                  <Divider className="max-[600px]:block hidden" />

                  <div className="flex items-center gap-[10px]">
                    <Image
                      src="/static/images/watermark-example-1.webp"
                      alt=""
                      width={115}
                      height={254}
                    />
                    <Image
                      src="/static/images/watermark-example-2.webp"
                      alt=""
                      width={115}
                      height={254}
                    />
                  </div>
                </div>

                <Divider />
              </>
            )}

            {/* <div className="border-l-[1px] border-gray300 pl-[24px]">
              <div className="text-textColor text-[16px] font-bold mb-[10px]">
                {t("influencer.takeOfferForm.positionAd")}
              </div>
              <AdPositionView position={offer.spec.banner_position} />
            </div> */}
          </div>

          {offer.spec.content_sources &&
            offer.spec.content_sources.filter(
              (source) => source.url || source.description
            ).length > 0 && (
              <>
                <div className="flex flex-col gap-[16px]">
                  <div className="text-[16px] font-bold">
                    {t("influencer.offerDetail.contentSources")}
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    {offer.spec.content_sources
                      .filter((source) => source.url || source.description)
                      .map((source) => (
                        <div
                          key={source.url}
                          className="flex flex-col w-full gap-[4px]"
                        >
                          <TextCard text={source.url} url={source.url} copy />
                          <div className="text-sm text-gray600">
                            {source.description}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <hr className="block h-[1px] bg-gray500" />
              </>
            )}

          <div className="border-b-[1px] border-gray300 pb-[24px] grid gap-[16px] grid-cols-1 min-[440px]:grid-cols-2">
            {offer.spec.integration_type !== "influencer_content" && (
              <div className="flex flex-col lg:gap-[16px] gap-[10px] flex-1">
                <div className="lg:text-[20px] text-[18px] font-bold">
                  {t("influencer.takeOfferForm.adDuration")}
                </div>
                <TextCard text={bannerDuration[offer.spec.banner_duration]} />
              </div>
            )}
            <div className="flex flex-col lg:gap-[16px] gap-[10px] flex-1">
              <div className="lg:text-[20px] text-[18px] font-bold">
                {t("common.language")}
              </div>
              <TextCard
                text={offer.language_ids
                  .map((languageId) => {
                    const language = languages?.find(
                      (lang) => lang.id === languageId
                    );
                    return language?.name || "";
                  })
                  .filter((name) => name)
                  .join(" / ")}
              />
            </div>
          </div>
          {offer.spec.description && (
            <div className="border-b-[1px] border-gray300 pb-[24px]">
              <div className="lg:text-[20px] text-[18px] font-bold mb-[10px]">
                {t("influencer.takeOfferForm.brief")}
              </div>
              <div className="text-gray600 text-[14px] font-[500] mb-[16px]">
                {t.rich("influencer.takeOfferForm.briefDesc", {
                  recommendations: (chunks) => (
                    <span className="font-bold">{chunks}</span>
                  ),
                  considerReflect: (chunks) => (
                    <span className="font-bold">{chunks}</span>
                  ),
                })}
              </div>
              <TextCard text={offer.spec.description} />
            </div>
          )}
          {offer.spec.post_description_text && (
            <div className="flex gap-[32px] w-full border-b-[1px] border-gray300 pb-[24px]  md:flex-row flex-col">
              <div className="flex flex-col gap-[10px] w-full max-w-[677px]">
                <div className="lg:text-[20px] text-[18px] font-bold">
                  {t(makePostGuideByChannel.postDescription.title)}
                </div>
                <TextCard text={offer.spec.post_description_text} copy />
              </div>
              <div className="flex items-center flex-col justify-center gap-[8px] m-auto flex-shrink-0">
                <Image
                  className="rounded-[8px] shadow-statCardShadow"
                  src={makePostGuideByChannel.postDescription.imageURL}
                  alt="youtube shorts screen"
                  width={makePostGuideByChannel.postDescription.imageWidth}
                  height={makePostGuideByChannel.postDescription.imageHeight}
                />
                <div className="text-gray400 text-[12px] font-[500] text-center max-w-[173px]">
                  {t(makePostGuideByChannel.postDescription.imageDesc)}
                </div>
              </div>
            </div>
          )}

          {(offer.spec.profile_description_text || offer.spec.bio_url) && (
            <div className="flex gap-[32px] w-full border-b-[1px] border-gray300 pb-[24px]  md:flex-row flex-col">
              <div className="flex flex-col gap-[10px] w-full max-w-[677px]">
                {offer.spec.profile_description_text && (
                  <>
                    <div className="lg:text-[20px] text-[18px] font-bold">
                      {t(makePostGuideByChannel.channelBio.bioTitle)}
                    </div>
                    <TextCard text={offer.spec.profile_description_text} copy />
                  </>
                )}

                {offer.spec.bio_url && (
                  <>
                    <div className="lg:text-[20px] text-[18px] font-bold">
                      {t(makePostGuideByChannel.channelBio.linkTitle)}
                    </div>
                    {makePostGuideByChannel.channelBio.linkTitleDesc && (
                      <div className="text-gray600 text-[14px] font-[500] mb-[6px]">
                        {t(makePostGuideByChannel.channelBio.linkTitleDesc)}
                      </div>
                    )}
                    <TextCard text={offer.spec.bio_url} copy />
                  </>
                )}
              </div>
              <div className="flex items-center justify-center flex-col gap-[8px] m-auto flex-shrink-0">
                <Image
                  className="rounded-[8px] shadow-statCardShadow"
                  src={makePostGuideByChannel.channelBio.imageURL}
                  alt="youtube channel screen"
                  width={makePostGuideByChannel.channelBio.imageWidth}
                  height={makePostGuideByChannel.channelBio.imageHeight}
                />
                <div className="text-gray400 text-[12px] font-[500] text-center max-w-[173px]">
                  {t(makePostGuideByChannel.channelBio.imageDesc)}
                </div>
              </div>
            </div>
          )}
          {offer.spec?.pinned_comment_text &&
            makePostGuideByChannel?.comment && (
              <div className="flex gap-[32px] w-full border-b-[1px] border-gray300 pb-[24px] md:flex-row flex-col">
                <div className="flex flex-col gap-[10px] w-full max-w-[677px]">
                  <div className="lg:text-[20px] text-[18px] font-bold">
                    {t(makePostGuideByChannel.comment.title)}
                  </div>
                  <TextCard text={offer.spec.pinned_comment_text} copy />
                </div>
                <div className="flex items-center justify-center flex-col gap-[8px] m-auto flex-shrink-0">
                  <Image
                    className="rounded-[8px] shadow-statCardShadow"
                    src={makePostGuideByChannel.comment.imageURL}
                    alt="youtube channel screen"
                    width={makePostGuideByChannel.comment.imageWidth}
                    height={makePostGuideByChannel.comment.imageHeight}
                  />
                  <div className="text-gray400 text-[12px] font-[500] text-center max-w-[173px]">
                    {t(makePostGuideByChannel.comment.imageDesc)}
                  </div>
                </div>
              </div>
            )}

          <div className="flex flex-col gap-[10px]">
            <div className="lg:text-[20px] text-[18px] font-bold">
              {t(makePostGuideByChannel.postLink.title)}
            </div>
            <div className="text-gray600 text-[14px] font-[500]">
              {t("influencer.takeOfferForm.enterShortsLinkDesc")}
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-[16px]"
              >
                <div className="space-y-[10px]">
                  <Input
                    name="shortsLink"
                    icon="/static/icons/link-black.svg"
                    placeholder={t(makePostGuideByChannel.postLink.placeholder)}
                  />
                  {offer.ad_offer.media_channel_type === "instagram" && (
                    <HintLabel>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            t.raw("influencer.takeOfferForm.noticeFbViews")
                          ),
                        }}
                      />
                    </HintLabel>
                  )}
                </div>

                {Object.keys(autoChecks).length > 0 && (
                  <AutoChecksStatus
                    autoChecks={autoChecks}
                    isTimerActive={isTimerActive}
                    timerSeconds={timerSeconds}
                  />
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={appendMediaPostPending}
                    size={"lg"}
                    className="px-[8px] md:w-auto w-full"
                    disabled={postStatus === "closed" || isTimerActive}
                  >
                    <div className="flex items-center gap-[8px] [&_svg]:size-auto">
                      {isTimerActive
                        ? `${t(
                            "influencer.takeOfferForm.submitForModeration"
                          )} ${Math.floor(timerSeconds / 60)
                            .toString()
                            .padStart(2, "0")}:${(timerSeconds % 60)
                            .toString()
                            .padStart(2, "0")}`
                        : t("influencer.takeOfferForm.submitForModeration")}
                      {!isTimerActive && <ArrowIcon className="" />}
                    </div>
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePost;
