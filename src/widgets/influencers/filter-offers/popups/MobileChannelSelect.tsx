"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MobileModal } from "src/components/ui/mobile-modal";
import { useMediaChannels } from "src/queries/influencers/useMediaChannels";
import { socialPlatformIcons } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";

interface IProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const MobileChannelSelect = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (value: number) => {
    onChange(String(value));
    setOpen(false);
  };

  const { mediaChannels } = useMediaChannels();

  const selectedChannel = useMemo(() => {
    const langArr = mediaChannels?.filter(
      (channel) => String(channel.id) === value
    );
    return langArr?.[0];
  }, [value, mediaChannels]);

  return (
    <>
      <button
        className="w-full text-sm font-medium border border-gray300 rounded-[4px] py-[10px] pl-[8px] pr-[12px] flex items-center justify-between"
        onClick={handleOpen}
      >
        <span className="flex items-center gap-[8px]">
          {selectedChannel ? (
            <>
              <Image
                src={socialPlatformIcons[selectedChannel.media_channel_type]}
                alt=""
                width={24}
                height={24}
              />
              <span>{selectedChannel.title}</span>
            </>
          ) : (
            <span className="text-gray-500">
              {
                //TODO: add text placeholder
              }
            </span>
          )}
        </span>
        <Image
          src="/static/icons/arrow-down-black.svg"
          alt=""
          width={14}
          height={14}
        />
      </button>
      <MobileModal
        open={open}
        setOpen={setOpen}
        title={t("influencer.channelSettings.enterChannelLanguage")}
        drawerClassName="h-auto"
        className="h-auto pb-[10px]"
      >
        {mediaChannels?.map((option) => (
          <button
            className="p-[10px] w-full font-medium text-sm flex items-center justify-between gap-[12px] rounded-[4px] transition-colors active:bg-white50"
            onClick={() => handleChange(option.id)}
            key={`mobile-channel-select-${option.id}`}
          >
            <span className="flex items-center gap-[6px]">
              <Image
                src={socialPlatformIcons[option.media_channel_type]}
                alt=""
                width={24}
                height={24}
              />
              <span>{option.title}</span>
            </span>
            {value === String(option.id) && (
              <Image
                src="/static/icons/marker-green.svg"
                alt=""
                width={20}
                height={20}
              />
            )}
          </button>
        ))}
      </MobileModal>
    </>
  );
};
