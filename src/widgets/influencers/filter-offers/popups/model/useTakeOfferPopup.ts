import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreatePostOnOfferMutation } from "src/queries/influencers/useCreatePostOnOfferMutation";
import { MediaChannelResponseInformation } from "src/types/offers";
import { useFilterStore } from "../../model/useFilterStore";
import { queryKeys } from "src/config/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useMediaChannels } from "src/queries/influencers/useMediaChannels";

interface IProps {
  setOpen: (open: boolean) => void;
  mediaChannelResponseInformations?: MediaChannelResponseInformation[];
  offerId: number;
}

export const useTakeOfferPopup = ({
  setOpen,
  mediaChannelResponseInformations,
  offerId,
}: IProps) => {
  const router = useRouter();
  const { media_channel_id } = useFilterStore();
  const queryClient = useQueryClient();
  const { mediaChannels: rawMediaChannels } = useMediaChannels();

  const mediaChannels = rawMediaChannels.map((channel) => {
    if (!mediaChannelResponseInformations) {
      return { ...channel, isNotEligible: true };
    }

    const channelInfo = mediaChannelResponseInformations.find(
      (info) => info.media_channel.id === channel.id
    );

    if (!channelInfo) {
      return { ...channel, isNotEligible: true };
    }

    const isNotEligible = channelInfo.take_check_errors.length > 0;
    return { ...channel, isNotEligible };
  });

  const defaultChannel = (() => {
    // Если есть канал из фильтра, проверяем подходит ли он
    if (media_channel_id && mediaChannelResponseInformations) {
      const channelFromFilter = mediaChannelResponseInformations.find(
        (info) => String(info?.media_channel?.id) === media_channel_id
      );
      if (
        channelFromFilter &&
        channelFromFilter.take_check_errors.length === 0
      ) {
        return media_channel_id;
      }
    }

    // Ищем первый подходящий канал без ошибок
    if (mediaChannelResponseInformations) {
      const eligibleChannel = mediaChannelResponseInformations.find(
        (info) => info.take_check_errors.length === 0
      );
      if (eligibleChannel) {
        return String(eligibleChannel.media_channel.id);
      }

      // Если нет подходящих каналов, берем первый доступный
      return String(mediaChannelResponseInformations[0]?.media_channel?.id);
    }

    return null;
  })();

  const [channel, setChannel] = useState<null | string>(() => defaultChannel);

  const { createPost, isPending } = useCreatePostOnOfferMutation({
    onSuccess: (response) => {
      setOpen(false);
      router.push(
        `/influencers/post/${response.data.post.post_detail.post.id}`
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.statistics.getMediaChannelStatistics(
          Number(channel)
        ),
      });
    },
  });

  const handleChangeSelect = (value: string) => setChannel(value);

  let selectedChannelInfo: MediaChannelResponseInformation | null = null;
  if (
    Array.isArray(mediaChannelResponseInformations) &&
    mediaChannelResponseInformations.length > 0 &&
    channel
  ) {
    selectedChannelInfo =
      mediaChannelResponseInformations.find(
        (info) => String(info?.media_channel?.id) === channel
      ) || null;
  }

  const isNotEligible = () => {
    if (!selectedChannelInfo) {
      return true;
    }

    return (
      selectedChannelInfo && selectedChannelInfo.take_check_errors.length > 0
    );
  };

  const handleTakeOffer = () => {
    if (!channel || isNotEligible()) return;

    const mediaChannelId = Number(channel);

    createPost({
      mediaChannelId,
      body: {
        ad_offer_id: offerId,
      },
    });
  };

  const handleCancel = () => setOpen(false);

  return {
    channel,
    isPending,
    selectedChannelInfo,
    isNotEligible,
    handleChangeSelect,
    handleTakeOffer,
    handleCancel,
    mediaChannels,
  };
};
