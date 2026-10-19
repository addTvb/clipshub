import { useCallback, useState } from "react";
import LazyHoverVideo from "src/components/ui/lazy-hover-video";
import { LeaderboardPost } from "src/types/leadeerboard";
import { TopThreeGradeBlock } from "./TopThreeGradeBlock";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";
import EyeIcon from "@icons/eye-icon.svg";
import clsx from "clsx";
import Image from "next/image";

interface IProps {
  post: LeaderboardPost;
}

export const TopThreeItem = ({ post }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="relative flex items-center min-[1570px]:min-w-[302px] min-[1570px]:max-w-[302px] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LazyHoverVideo
        src={post.media_channel_post?.video_file?.link || ""}
        poster={post.media_channel_post?.preview_image?.link || ""}
        alt={post.media_channel_post?.title || ""}
        className={clsx(
          "w-full max-w-[155px] h-[340px] object-cover shadow-leaderboardWidgetItemShadow",
          "min-[1570px]:border-4 min-[1570px]:border-white"
        )}
        showControls={true}
        isActive={isHovered}
      />
      <div className="flex items-center justify-between gap-[4px] min-[1570px]:hidden py-[4px]">
        <Image
          src={`/static/images/leaderboard/grade${post?.place}.svg`}
          alt={`${post?.place} place`}
          width={50}
          height={17}
        />

        <div className="flex items-center gap-[4px] py-[6px]">
          <EyeIcon className="text-gray350 md:size-[16px] size-[10px]" />
          <span className="md:text-[12px] text-[11px] font-[700]">
            {formatNumberWithCommas(post?.media_channel_post?.view_count || 0)}
          </span>
        </div>
      </div>

      <TopThreeGradeBlock post={post} />
    </div>
  );
};
