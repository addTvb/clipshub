"use client";

import { useMediaChannels } from "src/queries/influencers/useMediaChannels";
import { useFilterStore } from "../model/useFilterStore";
import { MobileModal } from "src/components/ui/mobile-modal";
import { MouseEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { socialPlatformIcons } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";
import Image from "next/image";

export const MobileChannelSelect = () => {
  const t = useTranslations("influencer.channelSettings");

  const [open, setOpen] = useState(false);
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const { mediaChannels } = useMediaChannels();
  const { setFilters, media_channel_id, ...filters } = useFilterStore();

  const handleChangeChannel = (
    e: MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.stopPropagation();
    setFilters({ ...filters, page: 1, media_channel_id: String(value) });
    setOpen(false);
  };

  const selectedChannel = useMemo(() => {
    const channelsArr = mediaChannels.filter(
      (channel) => String(channel.id) === media_channel_id
    );
    return channelsArr[0];
  }, [mediaChannels, media_channel_id]);

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-black400 border-black400 text-[#F8FCFF] rounded-full text-sm font-bold px-[4px] py-[1px] flex items-center justify-between w-full"
      >
        <span className="flex items-center gap-[4px] text-xs font-medium px-[4px] py-0">
          <Image
            src={socialPlatformIcons[selectedChannel.media_channel_type]}
            alt={selectedChannel.media_channel_type}
            width={14}
            height={14}
          />
          <span className="truncate max-w-[87px] min-[430px]:max-w-full">
            {selectedChannel.title}
          </span>
        </span>
        <Image
          src="/static/icons/arrow-down-gray.svg"
          alt=""
          width={14}
          height={14}
        />
      </button>

      <MobileModal open={open} setOpen={setOpen} title={t("chooseChannel")}>
        {mediaChannels?.map((option) => (
          <button
            className="p-[10px] w-full font-medium text-sm flex items-center justify-between gap-[12px]"
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              handleChangeChannel(e, option.id)
            }
            key={`mobile-channel-filter-${option.id}`}
          >
            <span className="flex items-center gap-[6px]">
              <Image
                src={socialPlatformIcons[option.media_channel_type]}
                alt={option.media_channel_type}
                width={14}
                height={14}
              />
              <span>{option.title}</span>
            </span>
            {media_channel_id === String(option.id) && (
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
