import { Divider } from "src/components/ui/divider";
import { Spinner } from "src/components/ui/spinner";
import { WidgetTitle } from "./WidgetTitle";
import { TopThreePosts } from "./top-three-posts/TopThreePosts";
import { PostsSection } from "./posts-section/PostsSection";
import { useLeaderboardPostsByGroupQuery } from "src/queries/leaderboard/posts/useLeaderboardPostsByGroupQuery";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

interface IProps {
  offerId?: number;
}

export const LeaderboardWidget = ({ offerId }: IProps) => {
  const { topThree, posts, isLoading } = useLeaderboardPostsByGroupQuery(
    "ad-offer",
    offerId ?? 0,
    {
      period: "all",
      page: 1,
      per_page: 10,
    }
  );

  const { width } = useWindowSize();

  const postsList = useMemo(() => {
    if (width < 1570) return [...topThree, ...posts];
    return posts;
  }, [posts, topThree, width]);

  if (isLoading) {
    return (
      <div className="p-[24px] flex flex-col gap-[32px] shadow-leaderboardWidgetShadow rounded-[8px] bg-leaderboardWidgetGradMobile md:bg-leaderboardWidgetGrad">
        <WidgetTitle />

        <Spinner color="dark" wrapperClassName="w-full min-h-[300px]" />
      </div>
    );
  }

  if (topThree && topThree?.length === 0 && posts && posts?.length === 0)
    return null;

  return (
    <div className="pt-[16px] px-[4px] max-[768px]:mx-[-10px] min-[768px]:p-[24px] flex flex-col gap-[16px] sm:gap-[32px] shadow-leaderboardWidgetShadow rounded-[8px] bg-leaderboardWidgetGradMobile md:bg-leaderboardWidgetGrad">
      <WidgetTitle />

      <TopThreePosts posts={topThree} />

      {posts && posts?.length !== 0 && (
        <Divider color="#DFE3EA" className="hidden min-[1570px]:block" />
      )}

      <PostsSection posts={postsList} />
    </div>
  );
};
