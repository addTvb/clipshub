import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostOnOffer } from "src/api/influencers/posts";
import { mutationKeys } from "src/config/mutationKeys";
import { queryKeys } from "src/config/queryKeys";
import { CreatePostOnOfferRequest, GetPostByIdResponse } from "src/types/influencers";

interface CreatePostOnOfferParams {
  mediaChannelId: number;
  body: CreatePostOnOfferRequest;
}

// Определяем тип данных, возвращаемых из API
interface CreatePostOnOfferResponse {
  data: GetPostByIdResponse;
  mediaChannelId: number;
}

interface UseCreatePostOnOfferProps {
  onSuccess?: (response: CreatePostOnOfferResponse) => void;
}

export const useCreatePostOnOfferMutation = (props?: UseCreatePostOnOfferProps) => {
  const queryClient = useQueryClient();
  
  const { mutate: createPost, isPending, data, error } = useMutation<
    CreatePostOnOfferResponse, 
    Error, 
    CreatePostOnOfferParams
  >({
    mutationKey: mutationKeys.influencers.posts.createPostOnOffer,
    mutationFn: ({ mediaChannelId, body }: CreatePostOnOfferParams) => 
      createPostOnOffer(mediaChannelId, body),
    onSuccess: (response) => {
      
      // Инвалидация соответствующих запросов
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.influencers.posts.getPostsByMediaChannel(
          response.mediaChannelId, 
          'created'
        )
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      
      // Вызов колбека, если он предоставлен
      if (props?.onSuccess) {
        props.onSuccess(response);
      }
    },
  });

  return { 
    createPost, 
    isPending,
    data,
    error
  };
}; 