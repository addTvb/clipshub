import { useQuery } from "@tanstack/react-query";
import { getPostById } from "src/api/influencers/posts";
import { queryKeys } from "src/config/queryKeys";

export const usePostById = (postId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.influencers.posts.getPostById(postId),
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  return {
    post: data?.post,
    status: data?.status,
    isLoading,
    error,
  };
};
