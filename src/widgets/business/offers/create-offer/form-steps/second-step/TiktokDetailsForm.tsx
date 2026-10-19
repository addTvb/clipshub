"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FieldErrors, FormProvider, Resolver, useForm } from "react-hook-form";
import { Button } from "src/components/ui/button/button";
import { DragAndDrop } from "src/components/ui/drag-and-drop";
import { Textarea } from "src/components/ui/textarea";
import { AdPositionSelector } from "src/features/business/offers/AdPositionSelector";
import { useCreateOfferStore } from "../../model/useCreateOfferStore";
import { Divider } from "src/components/ui/divider";
import {
  AdPosition,
  useAdPositionSelectorState,
} from "src/features/business/offers/model/useAdPositionSelectorState";
import { FormSelect } from "src/components/ui/form-select";
import { tikTokSecondStepSchema } from "../model/schemas";
import { useEffect, useRef } from "react";
import { useFormErrorScroll } from "src/hooks/useFormErrorScroll";
import { Input } from "src/components/ui/input";
import { AdTypeSelector } from "src/features/business/offers/AdTypeSelector";
import { HalfScreenPositionSelector } from "src/features/business/offers/HalfScreenPositionSelector";
import { AdType } from "src/types/base";
import { DynamicLinksInput } from "src/features/business/offers/DynamicLinksInput";

const DYNAMIC_LINK_ONLY_AD_TYPES: ReadonlyArray<AdType> = [
  "influencer_content",
  "challenge",
  "dedicate"
];

interface SecondStepForm {
  adFileID: number;
  adPosition: AdPosition;
  adDuration: string;
  tikTokDescriptionBio: string;
  tikTokLinkBio: string;
  descriptionTikTok: string;
  adType: AdType;
  dynamicLinks?: Array<{ title: string; link: string }>;
  clipperAvatarFileID: number;
}

export const TiktokDetailsForm = () => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToError = useFormErrorScroll<SecondStepForm>(formRef);
  const durationOptions = [
    { value: "entire", name: t("business.offerForm.entire") },
  ];
  const {
    prevStep,
    nextStep,
    setAdPosition,
    setAdDuration,
    setDescriptionBio,
    setDescriptionPost,
    setLinkBio,
    setAdFileType,
    setAdFileID,
    setAdFileLink,
    setAdFileName,
    setAdType,
    setDynamicLinks,
    setClipperAvatarFileID,
    setClipperAvatarFileLink,
    setClipperAvatarFileName,
    adPosition,
    adDuration,
    descriptionBio,
    descriptionPost,
    linkBio,
    adFileID,
    adFileLink,
    adFileName,
    adType,
    dynamicLinks,
    clipperAvatarFileID,
    clipperAvatarFileLink,
    clipperAvatarFileName,
  } = useCreateOfferStore();

  const methods = useForm<SecondStepForm>({
    resolver: valibotResolver(
      tikTokSecondStepSchema
    ) as Resolver<SecondStepForm>,
    defaultValues: {
      adPosition: adPosition || ("left-top" as AdPosition),
      adDuration: "entire",
      tikTokDescriptionBio: "",
      tikTokLinkBio: "",
      descriptionTikTok: "",
      adFileID: undefined,
      adType: "banner",
      dynamicLinks: [],
      clipperAvatarFileID: undefined,
    },
    mode: "onChange", 
  });
  const { changePosition } = useAdPositionSelectorState();

  useEffect(() => {
    if (adPosition) {
      changePosition(adPosition);
      methods.setValue("adPosition", adPosition);
    }
    if (adDuration) {
      methods.setValue(
        "adDuration",
        adDuration === "0" ? "entire" : adDuration
      );
    }
    if (descriptionBio) {
      methods.setValue("tikTokDescriptionBio", descriptionBio);
    }
    if (descriptionPost) {
      methods.setValue("descriptionTikTok", descriptionPost);
    }
    if (linkBio) {
      methods.setValue("tikTokLinkBio", linkBio);
    }
    if (clipperAvatarFileID) {
      methods.setValue("clipperAvatarFileID", clipperAvatarFileID);
    }
    if (adFileID) {
      methods.setValue("adFileID", adFileID);
    }
    if (adType) {
      methods.setValue("adType", adType);
    }
    // Синхронизацию dynamicLinks из стора в форму убрали
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    adPosition,
    adDuration,
    descriptionBio,
    descriptionPost,
    linkBio,
    clipperAvatarFileID,
    adFileID,
    methods,
    dynamicLinks,
  ]);

  // Отслеживаем изменения adFileID в форме и обновляем store
  const watchedAdFileID = methods.watch("adFileID");
  useEffect(() => {
    if (watchedAdFileID && typeof watchedAdFileID === "number") {
      setAdFileID(watchedAdFileID);
    }
  }, [watchedAdFileID, setAdFileID]);

  // Синхронизируем adType из формы в стор, чтобы исключить откаты значения
  const watchedAdType = methods.watch("adType");
  const isDynamicLinkOnlyType = watchedAdType
    ? DYNAMIC_LINK_ONLY_AD_TYPES.includes(watchedAdType)
    : false;
  useEffect(() => {
    if (watchedAdType && watchedAdType !== adType) {
      setAdType(watchedAdType);
    }
  }, [watchedAdType, adType, setAdType]);

  // Одноразово инициализируем значение adType в форме из стора, чтобы не создавать цикл
  const adTypeInitializedRef = useRef(false);
  useEffect(() => {
    if (adTypeInitializedRef.current) return;
    if (adType) {
      methods.setValue("adType", adType);
    }
    adTypeInitializedRef.current = true;
  }, [adType, methods]);

  const onSubmit = (form: SecondStepForm) => {
    if (form.adPosition) setAdPosition(form.adPosition);
    setAdDuration(form.adDuration ?? "");
    setDescriptionBio(form.tikTokDescriptionBio);
    setDescriptionPost(form.descriptionTikTok);
    setLinkBio(form.tikTokLinkBio);
    if (typeof form.adFileID === "number") setAdFileID(form.adFileID);
    if (typeof form.clipperAvatarFileID === "number")
      setClipperAvatarFileID(form.clipperAvatarFileID);
    setAdType(form.adType);
    setDynamicLinks(form.dynamicLinks || []);

    nextStep();
  };

  const onError = (errors: FieldErrors<SecondStepForm>) =>
    scrollToError(errors);

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-[24px]">
          <div className="text-textColor text-xl lg:text-[28px] font-bold">
            {t("business.offerForm.uploadAdContentForTikTok")}
          </div>
          <div className="flex flex-col gap-[24px]">
            <AdTypeSelector name="adType" />
            <Divider />
            <div className=" flex flex-col lg:grid lg:grid-cols-[1fr_auto_auto] gap-[24px] max-[500px]:items-start items-center justify-between w-full">
              {!isDynamicLinkOnlyType ? (
                <>
                  <div className="space-y-[16px] w-full">
                    <div className="text-textColor text-lg lg:text-xl font-bold">
                      {t("business.offerForm.uploadVideoAd")}
                    </div>
                    <DragAndDrop
                      name="adFileID"
                      type="offer-video-and-image"
                      setFileType={setAdFileType}
                      storeActions={{
                        setFileID: setAdFileID,
                        setFileLink: setAdFileLink,
                        setFileName: setAdFileName,
                        fileID: adFileID ?? undefined,
                        fileLink: adFileLink,
                        fileName: adFileName,
                      }}
                    />
                  </div>

                  <Divider vertical className="min-h-[150px]" />

                  {watchedAdType === "half_screen" ? (
                    <HalfScreenPositionSelector />
                  ) : (
                    <AdPositionSelector name="adPosition" />
                  )}
                </>
              ) : (
                <DynamicLinksInput name="dynamicLinks" />
              )}
            </div>
          </div>

          <Divider />

          <div className="grid max-[1042px]:grid-cols-1 max-[1042px]:grid-rows-[auto_auto_auto] grid-cols-[1fr_auto_auto] items-center justify-between gap-[24px]">
            <div className="space-y-[16px] w-full">
              <div className="text-textColor text-lg lg:text-xl font-bold">
                {t("business.offerForm.uploadAvatar")}
              </div>
              <DragAndDrop
                name="clipperAvatarFileID"
                type="clipper-avatar"
                setFileType={setAdFileType}
                storeActions={{
                  setFileID: setClipperAvatarFileID,
                  setFileLink: setClipperAvatarFileLink,
                  setFileName: setClipperAvatarFileName,
                  fileID: clipperAvatarFileID ?? undefined,
                  fileLink: clipperAvatarFileLink,
                  fileName: clipperAvatarFileName,
                }}
              />
            </div>

            <Divider vertical className="max-[1042px]:hidden" />
            <Divider className="max-[1042px]:block hidden" />

            <Image
              src="/static/images/offer-avatar-example.png"
              alt=""
              width={302}
              height={219}
            />
          </div>

          {!isDynamicLinkOnlyType ? (
            <>
              <Divider />

              <div className="space-y-[16px]">
                <div className="text-textColor font-bold text-lg lg:text-xl">
                  {t("business.offerForm.adDuration")}
                </div>
                <div className="space-y-[10px]">
                  <FormSelect
                    name="adDuration"
                    options={durationOptions}
                    defaultValue={adDuration}
                    placeholder={t("business.offerForm.duration")}
                    className="w-[200px]"
                    icon="/static/icons/clock-black.svg"
                  />

                  <p className="text-sm text-gray600 font-medium">
                    {t("business.offerForm.durationDesc")}
                  </p>
                </div>
              </div>
            </>
          ) : null}

          <Divider />

          <div className="flex gap-[32px] flex-col-reverse lg:flex-row items-center">
            <div className="space-y-[16px]">
              <div className="space-y-[10px]">
                <div className="text-textColor font-bold text-lg hidden lg:text-xl lg:block">
                  {t("business.offerForm.descriptionTikTokBio")}
                </div>

                <Textarea
                  name="tikTokDescriptionBio"
                  rows={6}
                  placeholder={t("business.offerForm.formulaDescription")}
                />

                <p className="text-gray600 text-sm font-medium">
                  {t("business.offerForm.followThisFormula")}
                </p>
              </div>

              <div className="space-y-[10px]">
                <div className="text-textColor font-bold text-lg lg:text-xl">
                  {t("business.offerForm.linkTikTokBio")}
                </div>

                <p className="text-gray600 text-sm font-medium">
                  {t.rich("business.offerForm.maskingInterface", {
                    bold: (chunks) => <strong>{chunks}</strong>,
                    linktree: (chunks) => (
                      <a
                        href="https://linktr.ee/"
                        className="text-[#3188AA] underline"
                        target="_blank"
                      >
                        {chunks}
                      </a>
                    ),
                    bitly: (chunks) => (
                      <a
                        href="https://bitly.com/"
                        className="text-[#3188AA] underline"
                        target="_blank"
                      >
                        {chunks}
                      </a>
                    ),
                    taplink: (chunks) => (
                      <a
                        href="https://taplink.ru/"
                        className="text-[#3188AA] underline"
                        target="_blank"
                      >
                        {chunks}
                      </a>
                    ),
                    beacons: (chunks) => (
                      <a
                        href="https://beacons.ai/"
                        className="text-[#3188AA] underline"
                        target="_blank"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>

                <Input
                  icon="/static/icons/link-black.svg"
                  name="tikTokLinkBio"
                  placeholder={t("business.offerForm.linkPlaceholder")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="text-textColor font-bold text-lg block lg:text-xl lg:hidden">
                {t("business.offerForm.descriptionTikTokBio")}
              </div>
              <div className="self-center mt-[16px]">
                <Image
                  src="/static/images/tiktok-profile-screen.webp"
                  alt=""
                  width={282}
                  height={267}
                  className="min-w-[282px] min-h-[267px] rounded-[8px] border border-[#DDDFE4] shadow-imageShadow"
                />
              </div>
              <p className="self-center text-center mt-[8px] text-gray400 font-medium text-xs block lg:hidden">
                {t("business.offerForm.instaBioImageDesc")}
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-[16px] lg:gap-[84px] flex-col-reverse lg:flex-row items-center lg:items-start">
            <div className="space-y-[10px] grow">
              <div className="text-textColor font-bold text-lg lg:text-xl hidden lg:block">
                {t("business.offerForm.descriptionsTikTok")}
              </div>

              <Textarea
                name="descriptionTikTok"
                rows={6}
                placeholder={t("business.offerForm.formulaDescription")}
              />

              <p className="text-gray600 text-sm font-medium">
                {t("business.offerForm.followThisFormula")}
              </p>
            </div>

            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="text-textColor font-bold text-lg lg:text-xl block lg:hidden">
                {t("business.offerForm.descriptionsTikTok")}
              </div>
              <div className="self-center mt-[16px]">
                <Image
                  src="/static/images/tiktok-post-screen.webp"
                  alt=""
                  width={187}
                  height={332}
                  className="min-w-[187px] min-h-[332px] rounded-[8px] border border-[#DDDFE4] shadow-imageShadow"
                />
              </div>
              <p className="self-center text-center mt-[8px] text-gray400 font-medium text-xs block lg:hidden">
                {t("business.offerForm.descriptionsTikTok")}
              </p>
            </div>
          </div>

          <div className="flex items-center self-end gap-[24px]">
            <Button
              className="flex items-center gap-[6px] text-base text-textColor font-bold"
              variant="text"
              onClick={prevStep}
              icon={
                <Image
                  src="/static/icons/long-arrow-left-black.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              <span>{t("common.back")}</span>
            </Button>

            <Button className="flex items-center gap-[6px]" type="submit">
              <span>{t("common.next")}</span>
              <Image
                src="/static/icons/long-arrow-right-white.svg"
                alt=""
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
