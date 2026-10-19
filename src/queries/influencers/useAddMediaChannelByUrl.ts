import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";
import {
  MediaChannel,
  MediaChannelDetailResponse,
} from "src/types/influencers";
import {
  addMediaChannelByUrl,
  AddMediaChannelByUrlRequest,
} from "src/api/influencers/media-channels";
import { mutationKeys } from "src/config/mutationKeys";

interface UseAddMediaChannelByUrlProps {
  onSuccess?: (channel: MediaChannel) => void;
}

export const useAddMediaChannelByUrl = ({
  onSuccess,
}: UseAddMediaChannelByUrlProps = {}) => {
  const queryClient = useQueryClient();

  const {
    mutate: addChannel,
    isPending,
    error,
  } = useMutation({
    mutationKey: mutationKeys.influencers.channels.addMediaChannelByUrl,
    mutationFn: (body: AddMediaChannelByUrlRequest) =>
      addMediaChannelByUrl(body),
    onSuccess: (data: MediaChannelDetailResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.getMediaChannels,
      });

      // Извлекаем добавленный канал из ответа
      if (data.media_channel_detail?.media_channel) {
        onSuccess?.(data.media_channel_detail.media_channel);
      }
    },
  });

  return { addChannel, isPending, error };
};
