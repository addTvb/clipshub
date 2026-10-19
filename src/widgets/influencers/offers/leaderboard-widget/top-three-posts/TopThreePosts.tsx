import { LeaderboardPost } from "src/types/leadeerboard";
import { TopThreeItem } from "./top-three-item/TopThreeItem";

interface IProps {
  posts: LeaderboardPost[];
}

export const TopThreePosts = ({ posts }: IProps) => {
  if (!posts || posts?.length === 0) {
    return null;
  }

  return (
    <div className="hidden min-[1570px]:flex items-center justify-between gap-[10px] min-[1700px]:gap-[40px]">
      {posts.map((post) => (
        <TopThreeItem key={post?.post?.id} post={post} />
      ))}
    </div>
  );
};
