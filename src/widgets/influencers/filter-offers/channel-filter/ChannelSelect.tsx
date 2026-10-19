"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { useMediaChannels } from "src/queries/influencers/useMediaChannels";
import { socialPlatformIcons } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";
import { useFilterStore } from "../model/useFilterStore";

export const ChannelSelect = () => {
  const { mediaChannels } = useMediaChannels();

  const { setFilters, media_channel_id, ...filters } = useFilterStore();

  const handleChangeSelect = (value: string) =>
    setFilters({ ...filters, page: 1, media_channel_id: value });

  return (
    <Select onValueChange={handleChangeSelect} value={String(media_channel_id)}>
      <SelectTrigger className="rounded-full px-[4px] h-auto py-0 bg-black400 border-black400 text-sm font-bold text-[#F8FCFF] max-w-[170px] truncate">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {mediaChannels?.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            <span className="flex items-center gap-[4px] text-xs font-medium px-[4px] py-0">
              <Image
                src={socialPlatformIcons[option.media_channel_type]}
                alt={option.media_channel_type}
                width={14}
                height={14}
              />
              <span>{option.title}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
