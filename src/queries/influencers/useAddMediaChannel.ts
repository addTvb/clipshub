import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMediaChannel } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { MediaChannel, MediaChannelDetailResponse } from "src/types/influencers";

interface UseAddMediaChannelProps {
  onSuccess?: (channel: MediaChannel) => void;
}

export const useAddMediaChannel = ({ onSuccess }: UseAddMediaChannelProps = {}) => {
  const t = useTranslations("influencer");
  const queryClient = useQueryClient();

  const { mutate: addChannel, isPending } = useMutation({
    mutationFn: addMediaChannel,
    onSuccess: (data: MediaChannelDetailResponse) => {
      toast.success(t("channelAddSuccess"));
      queryClient.invalidateQueries({ queryKey: queryKeys.influencers.getMediaChannels });
      
      // Извлекаем добавленный канал из ответа
      if (data.media_channel_detail?.media_channel) {
        onSuccess?.(data.media_channel_detail.media_channel);
      }
    }
  });

  return { addChannel, isPending };
}; 