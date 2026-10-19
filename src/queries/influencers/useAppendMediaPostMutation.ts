import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appendMediaPost } from "src/api/influencers/posts";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { AppendMediaPostRequest, AppendMediaPostResponse } from "src/types/influencers";

interface AppendMediaPostParams {
  postId: number;
  body: AppendMediaPostRequest;
}

export const useAppendMediaPostMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: appendMediaPostMutate, isPending: appendMediaPostPending, data } =
    useMutation<AppendMediaPostResponse, Error, AppendMediaPostParams>({
      mutationKey: mutationKeys.influencers.posts.appendMediaPost,
      mutationFn: ({ postId, body }: AppendMediaPostParams) =>
        appendMediaPost(postId, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      }
    });

  return { 
    appendMediaPostMutate, 
    appendMediaPostPending,
    appendMediaPostData: data 
  };
}; 