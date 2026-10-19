import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMediaChannelSettings } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface UpdateChannelSettingsProps {
  selectedCategories: number | null;
  selectedLanguage: number | null;
}

interface IParams {
  mediaChannelId: number;
  onSuccess?: () => void;
}

export const useUpdateChannelSettings = ({
  mediaChannelId,
  onSuccess,
}: IParams) => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: updateChannelSettings, isPending } = useMutation({
    mutationFn: (data: UpdateChannelSettingsProps) =>
      updateMediaChannelSettings(mediaChannelId, {
        category_ids: data.selectedCategories
          ? [Number(data.selectedCategories)]
          : [],
        language_ids: data.selectedLanguage
          ? [Number(data.selectedLanguage)]
          : [],
      }),
    onSuccess: () => {
      toast.success(t("influencer.channelSettings.successMessage"));
      queryClient.invalidateQueries({
        queryKey: queryKeys.influencers.getMediaChannels,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return { updateChannelSettings, isPending };
};
