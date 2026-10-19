import { useQuery } from "@tanstack/react-query";
import { getPostsByMediaChannel } from "src/api/influencers/posts";
import { queryKeys } from "src/config/queryKeys";
import {
  GetPostsByMediaChannelParams,
  GetPostsByMediaChannelResponse,
} from "src/types/influencers";

interface UsePostsByMediaChannelProps {
  mediaChannelId: number;
  params: GetPostsByMediaChannelParams;
}

export const usePostsByMediaChannel = ({
  mediaChannelId,
  params,
}: UsePostsByMediaChannelProps) => {
  const { data, isLoading, error, refetch } = useQuery<
    GetPostsByMediaChannelResponse,
    Error
  >({
    queryKey: queryKeys.influencers.posts.getPostsByMediaChannel(
      mediaChannelId,
      params.status,
      params.page,
      params.per_page,
    ),
    queryFn: () => getPostsByMediaChannel(mediaChannelId, params),
    enabled: !!mediaChannelId,
  });

  return {
    posts: data?.list || [],
    paginate: data?.paginate,
    isLoading,
    error,
    refetch,
  };
};
