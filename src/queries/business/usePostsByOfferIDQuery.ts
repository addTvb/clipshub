import { useQuery } from "@tanstack/react-query";
import { getPostsByOfferID } from "src/api/business/posts";
import { queryKeys } from "src/config/queryKeys";
import { useSearchParams } from "next/navigation";

export const usePostsByOfferIDQuery = (offerID: number) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: queryKeys.business.posts.getPostsByOfferID(offerID, page),
    queryFn: () => getPostsByOfferID(offerID, page),
  });

  return {
    posts,
    postsLoading,
    currentPage: page,
  };
};
