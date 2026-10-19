"use client";

import { useRef, useState } from "react";
import LandingSectionTitle from "src/features/landing/components/SectionTitle";
import TrandChartImage from "@public/static/images/business/landing/trend-chart.svg";
import TrandChartImage2 from "@public/static/images/business/landing/trend-chart2.svg";
import TiktokIcon from "@icons/social-tiktok.svg";
import ShortsIcon from "@icons/social-shorts.svg";
import ReelsIcon from "@icons/social-reels.svg";
import { useLeaderboardPostsQuery } from "src/queries/leaderboard/posts/useLeaderboardPostsQuery";
import { LeaderboardPost } from "src/types/leadeerboard";
import { useTranslations } from "next-intl";
import { Avatar } from "src/features/auth/Avatar";
import VerticalVideoPlayer, {
  VerticalVideoPlayerRef,
} from "src/components/ui/vertical-video-player";
import clsx from "clsx";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";

interface ShowcaseCardProps {
  post?: LeaderboardPost;
  isLoading?: boolean;
}

const ShowcaseCard = ({ post, isLoading }: ShowcaseCardProps) => {
  const t = useTranslations("business.landing.showcase");
  const videoRef = useRef<VerticalVideoPlayerRef>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isVideoHovered) {
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (!isVideoHovered) {
      videoRef.current?.pause();
    }
  };

  const handleVideoMouseEnter = () => {
    setIsVideoHovered(true);
  };

  const handleVideoMouseLeave = () => {
    setIsVideoHovered(false);
    // При уходе с видео, если курсор все еще на карточке - продолжаем воспроизведение
    // Если курсор ушел с карточки - видео остановится через handleMouseLeave карточки
  };

  if (isLoading) {
    return (
      <div className="w-full lg:max-w-[303px] animate-pulse">
        <div className="h-[22px] w-[73px] bg-gray-200 rounded mb-[19px] mx-auto lg:block hidden "></div>
        <div className="md:rounded-[36px] sm:rounded-[24px] rounded-[16px] bg-gray-200 lg:aspect-[24/70] aspect-[7/3]"></div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "w-full lg:max-w-[303px] transition-all duration-300 group",
        "lg:hover:translate-y-[-24px] hover:translate-y-[-10px]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {post?.media_channel_post.media_channel_type === "tiktok" ? (
        <TiktokIcon className="mb-[19px] mx-auto lg:block hidden h-[24px]" />
      ) : post?.media_channel_post.media_channel_type === "youtube" ? (
        <ShortsIcon className="mb-[19px] mx-auto lg:block hidden h-[24px]" />
      ) : post?.media_channel_post.media_channel_type === "instagram" ? (
        <ReelsIcon className="mb-[19px] mx-auto lg:block hidden h-[24px]" />
      ) : null}

      <div
        className={clsx(
          "md:rounded-[36px] sm:rounded-[24px] rounded-[16px] bg-white overflow-hidden sm:pb-[24px] pb-[12px] lg:block flex flex-row-reverse",
          "transition-shadow duration-300 group-hover:shadow-imageShadow"
        )}
      >
        <div className="flex-1 w-full">
          <div className="flex justify-between gap-[12px] lg:p-[24px] md:pr-[24px] pr-[12px] md:pt-[24px] pt-[12px] pb-0">
            <div>
              <div className="md:text-[14px] text-[12px] font-[600] font-[Inter] text-gray350 md:mb-[4px] mb-[0px]">
                {t("totalViews")}
              </div>
              <div className="md:text-[28px] text-[20px] font-[700] md:mb-[12px] mb-[4px]">
                {formatNumberWithCommas(post?.media_channel_post.view_count)}
              </div>
              <div className="text-[14px] font-[700] bg-white50 rounded-[6px] px-[6px] py-[2px] w-fit">
                <span className="text-gray350 text-[14px] font-[600] font-[Inter]">
                  {t("CPM")}
                </span>{" "}
                $
                {(
                  (post?.post_payment?.sum_paid || 0) /
                    ((post?.post_payment?.view_paid || 1) / 1000) || 0
                ).toFixed(3)}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 flex-shrink-0">
                {post?.media_channel_post.media_channel_type === "tiktok" ? (
                  <TiktokIcon className=" mx-auto block lg:hidden h-[24px]" />
                ) : post?.media_channel_post.media_channel_type ===
                  "youtube" ? (
                  <ShortsIcon className=" mx-auto block lg:hidden h-[24px]" />
                ) : post?.media_channel_post.media_channel_type ===
                  "instagram" ? (
                  <ReelsIcon className="flex-shrink-0 mx-auto block lg:hidden h-[24px]" />
                ) : null}
                <Avatar
                  src={post?.creator.icon?.link || ""}
                  userID={post?.creator.id}
                  className="rounded-full md:size-[44px] size-[32px] border-solid border-[1px] border-gray350"
                />
              </div>
            </div>
          </div>
          <div className="lg:pr-0 md:pr-[24px] pr-[12px]">
            <TrandChartImage className="w-[110%] lg:block hidden" />
            <TrandChartImage2 className="w-[100%] lg:hidden block" />
          </div>
        </div>

        <div
          className="w-full md:px-[24px] pl-[12px] pr-0 md:mr-0 mr-[24px] lg:mt-[12px] md:mt-[24px] mt-[12px] lg:max-w-none max-w-[22%] relative"
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
        >
          <VerticalVideoPlayer
            ref={videoRef}
            src={post?.media_channel_post.video_file?.link}
            poster={post?.media_channel_post.preview_image?.link}
            alt={`${post?.media_channel_post.media_channel_type} video`}
            className="w-full aspect-[9/20]"
            autoPlay={false}
            loop={true}
            muted={true}
          />
        </div>
      </div>
    </div>
  );
};

export default function ShowcaseSection() {
  const t = useTranslations("business.landing.showcase");

  const { posts, isLoading } = useLeaderboardPostsQuery({
    period: "all",
    page: 1,
    per_page: 4,
  });

  // Если есть ошибка или нет данных, не показываем секцию вообще
  // const isEmptyLeaderboard = error || (!isLoading && posts.length === 0);
  const isEmptyLeaderboard = true;

  if (isEmptyLeaderboard) {
    return null;
  }

  return (
    <div className="lg:pt-[64px] pt-[38px] pb-[38px] px-[10px] max-w-screenMaxWidth mx-auto w-full">
      <LandingSectionTitle
        title={t("title")}
        subtitle={t("subtitle")}
        className="lg:text-left text-center lg:mb-[64px] mb-[36px]"
      />
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-[24px]">
          {isLoading
            ? // Показываем скелетоны при загрузке
              Array.from({ length: 4 }).map((_, index) => (
                <ShowcaseCard key={`loading-${index}`} isLoading={true} />
              ))
            : // Показываем реальные данные
              posts
                .slice(0, 4)
                .map((post, index) => (
                  <ShowcaseCard
                    key={`post-${post.post.id}-${index}`}
                    post={post}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
