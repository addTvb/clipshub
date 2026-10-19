import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveMediaChannel } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface UseArchiveMediaChannelProps {
  channelName?: string;
  onSuccess?: () => void;
}

export const useArchiveMediaChannel = ({ 
  channelName, 
  onSuccess 
}: UseArchiveMediaChannelProps = {}) => {
  const t = useTranslations("influencer");
  const queryClient = useQueryClient();

  const { mutate: archiveChannel, isPending } = useMutation({
    mutationFn: (mediaChannelId: number) => archiveMediaChannel(mediaChannelId),
    onSuccess: () => {
      toast.success(t("archivedSuccessfully", { name: channelName }));
      queryClient.invalidateQueries({ queryKey: queryKeys.influencers.getMediaChannels });
      
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return { archiveChannel, isPending };
}; 