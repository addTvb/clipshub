import EducationIcon from "@icons/education.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { AdType } from "src/types/base";
import HowItWorksSection from "./HowItWorksSection";
import HowItWorksStepBlock from "./HowItWorksStepBlock";
import HowItWorksStepContent from "./HowItWorksStepContent";
import VerticalVideoPlayer from "src/components/ui/vertical-video-player";
import clsx from "clsx";

interface HowItWorksContentProps {
  adType: AdType;
}

export default function HowItWorksContent({ adType }: HowItWorksContentProps) {
  const t = useTranslations("influencer.howItWorks");

  // Определяем, находимся ли мы на мобильном/планшетном экране
  const isMobileOrTablet = useMediaQuery("(max-width: 1023px)"); // lg breakpoint

  // Типы с инструкциями (challenge не имеет инструкций "how it works")
  type AdTypeWithInstructions = Exclude<AdType, 'challenge'>;

  // Если тип не поддерживается, возвращаем null
  if (adType === 'challenge') {
    return null;
  }

  const dynamicContent: Record<AdTypeWithInstructions, Record<string, string | null>> = {
    banner: {
      titleAdType: "bannerAds",
      step4Description: "steps.goToOffers.description",
      step7Title: "steps.downloadBanner.title",
      step8Video: "/static/videos/how-it-works/Banner.mp4",
      step8Description: "steps.editVideo.description",
      step7Image: "/static/images/how-it-works/image6.webp",
      step11Title: "steps.includeTexts.title",
      step8Image: "/static/images/how-it-works/image7.webp",
    },
    half_screen: {
      titleAdType: "halfScreenAds",
      step4Description: "steps.goToOffers.descriptionHalfScreen",
      step7Title: "steps.downloadBanner.titleHalfScreen",
      step8Video: "/static/videos/how-it-works/Half-Screen.mp4",
      step8Description: "steps.editVideo.description",
      step7Image: "/static/images/how-it-works/image6.webp",
      step11Title: "steps.includeTexts.title",
      step8Image: "/static/images/how-it-works/image7.webp",
    },
    influencer_content: {
      titleAdType: "influencerContentAds",
      step4Description: "steps.goToOffers.description",
      step7Title: "steps.downloadBanner.titleInfluencerContent",
      step7Image: "/static/images/how-it-works/image7-influencerContent.webp",
      step8Description: "steps.editVideo.descriptionInfluencerContent",
      step8Video: null,
      step8Image: "/static/images/how-it-works/image8-influencerContent.webp",
      step11Title: "steps.includeTexts.titleInfluencerContent",
    },
    dedicate: {
      titleAdType: "dedicateAds",
      step4Description: "steps.goToOffers.description",
      step7Title: "steps.downloadBanner.title",
      step8Video: "/static/videos/how-it-works/Banner.mp4",
      step8Description: "steps.editVideo.description",
      step7Image: "/static/images/how-it-works/image6.webp",
      step11Title: "steps.includeTexts.title",
      step8Image: "/static/images/how-it-works/image7.webp",
    },
    integration: {
      titleAdType: "integrationAds",
      step4Description: "steps.goToOffers.description",
      step7Title: "steps.downloadBanner.title",
      step8Video: "/static/videos/how-it-works/Banner.mp4",
      step8Description: "steps.editVideo.description",
      step7Image: "/static/images/how-it-works/image6.webp",
      step11Title: "steps.includeTexts.title",
      step8Image: "/static/images/how-it-works/image7.webp",
    },
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {/* Заголовок секции */}
      <div className="flex flex-col items-center gap-[8px] mb-11">
        <div className="flex items-center gap-[5px] text-gray550 text-[16px] font-bold">
          <EducationIcon />
          {t("duration")}
        </div>
        <h2 className="md:text-[28px] sm:text-[22px] text-[20px] font-bold text-center text-textColor">
          <div>{t("detailedInstructions.title")}</div>
          {t.rich(`detailedInstructions.${adType}`, {
            span: (chunks) => <span className="text-blue300">{chunks}</span>,
          })}
        </h2>
      </div>

      {/* Секция с шагами */}
      <HowItWorksSection>
        {/* Первый ряд */}
        <div className="grid xl:grid-cols-[3fr_5fr_8fr] lg:grid-cols-[1fr_1fr] grid-cols-1 divide-y divide-[#97A8C6] lg:divide-y-0 lg:divide-x xl:divide-x">
          <HowItWorksStepBlock
            stepNumber={1}
            title={t("steps.register.title")}
            className="flex-1 xl:col-span-1 lg:col-span-2 col-span-1 xl:border-b-0 lg:border-b-[1px]  border-b-solid border-b-[#97A8C6]"
          />
          <HowItWorksStepBlock
            stepNumber={2}
            title={t("steps.linkChannel.title")}
            description={t("steps.linkChannel.description")}
            background="light"
            contentPosition="bottom"
            className="flex-1"
          >
            <HowItWorksStepContent>
              <div className="w-full h-full bg-gray-200 rounded-[12px] flex items-center justify-center text-gray-500">
                <Image
                  src="/static/images/how-it-works/image1.webp"
                  alt="Link Channel"
                  width={375}
                  height={122}
                />
              </div>
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
          <HowItWorksStepBlock
            stepNumber={3}
            title={t("steps.selectCategory.title")}
            description={t("steps.selectCategory.description")}
            contentPosition="bottom"
            className="flex-1"
          >
            <HowItWorksStepContent>
              <Image
                src="/static/images/how-it-works/image2.webp"
                alt="Select Category"
                width={316}
                height={230}
              />
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
        </div>

        {/* Второй ряд */}
        <div className="grid lg:grid-cols-[1fr_1fr] grid-cols-1 divide-y divide-[#97A8C6] lg:divide-y-0 lg:divide-x">
          <HowItWorksStepBlock
            stepNumber={4}
            title={t("steps.goToOffers.title")}
            description={t(dynamicContent[adType].step4Description)}
            contentPosition="bottom"
            className="flex-1"
          >
            <HowItWorksStepContent>
              <Image
                src="/static/images/how-it-works/image3.webp"
                alt="Go To Offers"
                width={394}
                height={166}
              />
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
          <HowItWorksStepBlock
            stepNumber={5}
            title={t("steps.acceptOffer.title")}
            description={t("steps.acceptOffer.description")}
            background="light"
            contentPosition="bottom"
            className="flex-1"
          >
            <HowItWorksStepContent>
              <Image
                src="/static/images/how-it-works/image4.webp"
                alt="Accept Offer"
                width={316}
                height={85}
              />
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
        </div>

        {/* Третий ряд */}
        <div className="grid lg:grid-cols-[1fr_1fr] grid-cols-1 divide-y divide-[#97A8C6] lg:divide-y-0 lg:divide-x">
          <HowItWorksStepBlock
            stepNumber={6}
            title={t("steps.selectCorrectChannel.title")}
            background="light"
            contentPosition="bottom"
            className="flex-1 py-11"
          >
            <HowItWorksStepContent>
              <Image
                src="/static/images/how-it-works/image5.webp"
                alt="Select Correct Channel"
                width={394}
                height={238}
              />
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
          <HowItWorksStepBlock
            stepNumber={7}
            title={t(dynamicContent[adType].step7Title)}
            contentPosition="bottom"
            className="flex-1 md:py-11 sm:py-6 py-3"
          >
            <HowItWorksStepContent>
              {dynamicContent[adType].step7Image && (
                <Image
                  src={dynamicContent[adType].step7Image}
                  alt="Download Banner"
                  width={316}
                  height={252}
                />
              )}
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
        </div>

        {/* Восьмой шаг - полная ширина */}
        <HowItWorksStepBlock
          stepNumber={8}
          title={t("steps.editVideo.title")}
          description={t(dynamicContent[adType].step8Description)}
          contentPosition={isMobileOrTablet ? "bottom" : "right"}
          alignContent="center"
        >
          <div
            className={clsx(
              dynamicContent[adType].step8Video && "py-[15%]",
              "flex gap-9 justify-center relative lg:pl-[36px]"
            )}
          >
            <HowItWorksStepContent>
              <Image
                className="sm:w-[472px] w-[222px] sm:h-[147px] h-[69px] object-cover"
                src={dynamicContent[adType].step8Image || ""}
                alt="Edit Video"
                width={472}
                height={147}
              />
            </HowItWorksStepContent>
            {dynamicContent[adType].step8Video && (
              <div className="absolute sm:right-[14px] right-[-20px] top-1/2 -translate-y-1/2">
                <VerticalVideoPlayer
                  src={dynamicContent[adType].step8Video}
                  alt="Mobile video editing example"
                  placeholder="Mobile Video Preview"
                  className="sm:w-[157px] w-[102px]"
                />
              </div>
            )}
          </div>
        </HowItWorksStepBlock>

        {/* Девятый и десятый ряд */}
        <div className="grid lg:grid-cols-[1fr_1fr] grid-cols-1 divide-y divide-[#97A8C6] lg:divide-y-0 lg:divide-x">
          <HowItWorksStepBlock
            stepNumber={9}
            title={t("steps.checkBrief.title")}
            description={t("steps.checkBrief.description")}
            contentPosition="bottom"
            className="flex-1"
          >
            <HowItWorksStepContent>
              <Image
                src="/static/images/how-it-works/image8.webp"
                alt="Check Brief"
                width={394}
                height={132}
              />
            </HowItWorksStepContent>
          </HowItWorksStepBlock>
          <HowItWorksStepBlock
            stepNumber={10}
            title={t("steps.createVideo.title")}
            description={t("steps.createVideo.description")}
            background="light"
            contentPosition="bottom"
            className="flex-1"
            alignContent="center"
          />
        </div>

        {/* Одиннадцатый и двенадцатый ряд */}
        <div className="grid lg:grid-cols-[1fr_1fr] grid-cols-1 divide-y divide-[#97A8C6] lg:divide-y-0 lg:divide-x">
          <HowItWorksStepBlock
            stepNumber={11}
            title={t(dynamicContent[adType].step11Title)}
            description={t.rich("steps.includeTexts.description", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
            background="light"
            contentPosition="right"
            className="flex-1"
            stepNumberWrapping={true}
          >
            <div className="pl-[36px]">
              <VerticalVideoPlayer
                src="/static/videos/how-it-works/Text-Bio.mp4"
                alt="Social media text example"
                placeholder="Social Media Example"
                className="sm:w-[157px] w-[102px]"
              />
            </div>
          </HowItWorksStepBlock>
          <HowItWorksStepBlock
            stepNumber={12}
            title={t("steps.copyVideoLink.title")}
            description={t("steps.copyVideoLink.description")}
            contentPosition="right"
            stepNumberWrapping={true}
          >
            <div className="pl-[36px]">
              {/* Заменили на изображение т.к. в видео была русская раскладка клавиатуры */}
              {/* <VerticalVideoPlayer
                src="/static/videos/how-it-works/Copy-Link.mp4"
                alt="Video link copy example"
                placeholder="Video Link Example"
                className="sm:w-[157px] w-[102px]"
              /> */}
              <Image
                src="/static/images/how-it-works/image12.webp"
                alt="Copy Video Link"
                width={316}
                height={252}
                className="sm:w-[157px] w-[102px] relative overflow-hidden bg-gray-200 [border-radius:11.5%/5.2%] flex items-center justify-center aspect-[157/349]"
              />
            </div>
          </HowItWorksStepBlock>
        </div>
      </HowItWorksSection>
    </div>
  );
}
