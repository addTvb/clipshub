"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, ReactNode, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Button } from "src/components/ui/button/button";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import { IconCheckbox } from "src/components/ui/icon-checkbox";
import { FormSelect } from "src/components/ui/form-select";
import { MobileLangSelect } from "./MobileLangSelect";

import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { useHoverCategory } from "src/hooks/useHoverCategory";
import { useUpdateChannelSettings } from "src/queries/influencers/useUpdateChannelSettings";

import { channelSettingsSchema } from "./model/channel-settings-schemas";
import WarningIcon from "@icons/warning-notification.svg";
import { MediaChannel, MediaChannelDetails } from "src/types/influencers";

import { useWindowSize } from "usehooks-ts";
import { HintLabel } from "src/components/ui/hint-label";
import { ChannelUpdateWarningModal } from "./ChannelUpdateWarningModal";

export interface ChannelSettingsFormData {
  selectedCategories: number | null;
  selectedLanguage: number | null;
}

interface IProps {
  mediaChannel: MediaChannel;
  mediaChannelDetails?: MediaChannelDetails;
  onSuccess?: () => void;
  showChannelInfo?: boolean;
  showProvideInfo?: boolean;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  className?: string;
  isNewChannel?: boolean;
}

export const ChannelSettingsForm = ({
  mediaChannel,
  mediaChannelDetails,
  onSuccess,
  showChannelInfo = false,
  showProvideInfo = false,
  customHeader,
  customFooter,
  className,
  isNewChannel = false,
}: IProps) => {
  const t = useTranslations();
  const { width } = useWindowSize();

  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleOpenWarningModal = () => {
    if (isNewChannel) {
      updateChannelSettings(methods.getValues());
    } else {
      setShowWarningModal(true);
    }
  };
  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };

  // Хуки для данных
  const { mediaChannelCategories } = useMediaChannelCategory();
  const { languages } = useLanguagesDictionary();
  const { hoveredCategory, handleHover, handleUnHover } = useHoverCategory();

  // Настройка формы
  const methods = useForm<ChannelSettingsFormData>({
    resolver: valibotResolver(
      channelSettingsSchema
    ) as Resolver<ChannelSettingsFormData>,
    defaultValues: {
      selectedLanguage: mediaChannelDetails?.language_ids?.[0] || null,
      selectedCategories: mediaChannelDetails?.category_ids?.[0] || null,
    },
  });

  const { updateChannelSettings, isPending } = useUpdateChannelSettings({
    mediaChannelId: mediaChannel.id,
    onSuccess,
  });

  const onSubmit = (form: ChannelSettingsFormData) => {
    updateChannelSettings(form);
  };

  // Опции для языков
  const langOptions = useMemo(
    () =>
      languages?.map((lang) => ({
        id: lang.id,
        name: lang.name,
        value: lang.id,
        icon: lang.icon,
        slug: lang.slug,
      })) || [],
    [languages]
  );

  // Обновляем значения формы после загрузки данных канала
  useEffect(() => {
    if (mediaChannelDetails && mediaChannelDetails.language_ids?.length > 0) {
      methods.setValue("selectedLanguage", mediaChannelDetails.language_ids[0]);
      methods.setValue(
        "selectedCategories",
        mediaChannelDetails.category_ids?.[0] || null
      );
    }
  }, [mediaChannelDetails, methods]);

  const renderChannelInfo = () => {
    if (!showChannelInfo || !mediaChannel || !mediaChannelDetails) return null;

    return (
      <div className="bg-gray100 flex items-center justify-center gap-[10px] py-[6px] rounded-[51px]">
        <div className="relative size-[36px]">
          <Image
            src={
              mediaChannelDetails?.cover_file?.link ||
              "/static/images/default-avatar.svg"
            }
            alt="channel avatar"
            width={36}
            height={36}
            onError={(e) => {
              e.currentTarget.src = "/static/images/default-avatar.svg";
            }}
            className="size-[36px] rounded-[50%] object-cover"
          />
          <SocialMediaIcon
            socialPlatform={mediaChannel.media_channel_type}
            className="size-[20px] absolute right-[-7px] bottom-[-4px]"
          />
        </div>
        <div className="text-[16px] font-bold">{mediaChannel.title}</div>
      </div>
    );
  };

  const renderModerationIssues = () => {
    if (!mediaChannel?.moderation_reject_reasons?.length) return null;

    return (
      <div className="flex flex-col gap-[16px] p-[16px] bg-red-50 rounded-[8px] border border-red-200">
        <div className="flex items-center gap-[8px]">
          <WarningIcon className="size-[20px] text-error flex-none" />
          <div className="text-error text-[16px] font-bold">
            {t("influencer.channelSettings.moderationIssues")}
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          {mediaChannel.moderation_reject_reasons.map((reason) => (
            <div key={reason.id} className="flex gap-[12px] items-start">
              <div className="text-error text-[16px] mt-[2px] flex-none">
                ❌
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="text-error text-[14px] font-semibold">
                  {reason.name}
                </div>
                <div className="text-gray600 text-[14px] leading-[1.4]">
                  {reason.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <ChannelUpdateWarningModal
        open={showWarningModal}
        onClose={handleCloseWarningModal}
        mediaChannelId={mediaChannel.id}
        formData={methods.getValues()}
      />
      <FormProvider {...methods}>
        <form
          className={clsx("flex flex-col gap-[24px]", className)}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {customHeader}

          {renderChannelInfo()}
          {renderModerationIssues()}

          {showProvideInfo && (
            <div className="text-[14px]">
              {t("influencer.channelSettings.provideInfo")}
            </div>
          )}

          <div className="text-[16px] font-extrabold flex items-center gap-[6px]">
            {t("influencer.channelSettings.chooseChannelTopic")}
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-wrap gap-[10px] relative">
              {mediaChannelCategories?.map((category) => (
                <div key={category.id}>
                  <IconCheckbox
                    name="selectedCategories"
                    id={category.id}
                    title={category.name}
                    iconPath={category.icon}
                    onHover={() => handleHover(category)}
                    onHoverLeave={handleUnHover}
                  />
                </div>
              ))}
              {methods.formState.errors.selectedCategories &&
                !hoveredCategory && (
                  <div className="text-red-500 text-sm pl-1 absolute left-0 top-[100%] mt-1">
                    {t(
                      methods.formState.errors.selectedCategories.message ||
                        "form.requiredField"
                    )}
                  </div>
                )}
            </div>

            <p
              className={clsx(
                "text-sm text-gray600 min-h-[20px] transition-opacity opacity-0 capitalize",
                hoveredCategory?.description && "opacity-100"
              )}
            >
              {hoveredCategory?.description || ""}
            </p>
          </div>

          <div className="flex flex-col gap-[10px] justify-start">
            <div className="text-[16px] font-extrabold">
              {t("influencer.channelSettings.chooseChannelLanguage")}
            </div>
            {width <= 700 ? (
              <MobileLangSelect name="selectedLanguage" />
            ) : (
              <FormSelect<number>
                name="selectedLanguage"
                options={langOptions}
                placeholder={t("common.language")}
                optionIcon={true}
                className="w-full"
                valueType="number"
                key={`lang-select-${mediaChannelDetails?.language_ids?.[0]}`}
              />
            )}
          </div>

          <HintLabel>
            {t("influencer.channelSettings.warningMessage")}
          </HintLabel>

          {customFooter || (
            <Button
              loading={isPending}
              onClick={() => handleOpenWarningModal()}
            >
              {t("common.confirm")}
            </Button>
          )}
        </form>
      </FormProvider>
    </>
  );
};
