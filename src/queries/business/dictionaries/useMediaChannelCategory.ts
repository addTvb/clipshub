import { useQuery } from "@tanstack/react-query";
import { getMediaChannelCategory } from "src/api/business/dictionaries/media-channel-category";
import { queryKeys } from "src/config/queryKeys";

export const useMediaChannelCategory = () => {
  const { data: mediaChannelCategories, isLoading: loadingCategories } =
    useQuery({
      queryKey: queryKeys.business.dictionaries.mediaChannelCategories,
      queryFn: getMediaChannelCategory,
    });

  return {
    mediaChannelCategories: mediaChannelCategories?.list,
    loadingCategories,
  };
};
