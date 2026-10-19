import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { VideoCard } from "src/features/leaderboard/videos/components/VideoCard";
import { createCategoryMap } from "src/lib/dictionaries/createCategoryMap";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { LeaderboardPost } from "src/types/leadeerboard";

interface IProps {
  posts?: LeaderboardPost[];
}

export const PostsSection = ({ posts }: IProps) => {
  const { businessCategories } = useBusinessCategory();
  const { mediaChannelCategories } = useMediaChannelCategory();
  const tLeaderboard = useTranslations("leaderboard");
  const tCommon = useTranslations("common");
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const collapsedHeight = 420;

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const element = containerRef.current;

    const updateHeight = () => {
      window.requestAnimationFrame(() => {
        setContentHeight(element.scrollHeight);
      });
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [posts]);

  const businessCategoryMap = useMemo(
    () => createCategoryMap(businessCategories),
    [businessCategories]
  );
  const mediaChannelCategoryMap = useMemo(
    () => createCategoryMap(mediaChannelCategories),
    [mediaChannelCategories]
  );

  const translations = useMemo(
    () => ({
      placeSuffix: tLeaderboard("placeSuffix"),
      contentCategory: tLeaderboard("contentCategory"),
      businessCategory: tLeaderboard("businessCategory"),
      offer: tLeaderboard("offer"),
      back: tCommon("back"),
    }),
    [tCommon, tLeaderboard]
  );

  if (!posts || posts?.length === 0) {
    return null;
  }

  const isShowMore = posts && posts?.length > 3;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex flex-wrap justify-start justify-items-center gap-[9px] transition-[max-height] ease-out max-[768px]:grid max-[768px]:grid-cols-3",
        isShowMore || expanded ? "overflow-hidden" : "overflow-visible"
      )}
      style={{
        transition: "max-height 1s ease-in-out",
        maxHeight: isShowMore
          ? `${Math.max(
              expanded ? contentHeight ?? collapsedHeight : collapsedHeight,
              collapsedHeight
            )}px`
          : "none",
      }}
    >
      {posts?.map((post) => (
        <VideoCard
          key={post?.post?.id}
          post={post}
          businessCategoryMap={businessCategoryMap}
          mediaChannelCategoryMap={mediaChannelCategoryMap}
          translations={translations}
          isPlaceVisible
          className="max-w-[159px!important] self-center mx-[0px!important]"
        />
      ))}

      {isShowMore && (
        <button
          type="button"
          className="h-[68px] sticky bottom-[-5px] flex w-full col-span-3 flex-col items-center justify-center gap-[2px] bg-leaderboardWidgetShowMoreGrad pb-[12px] pt-[29px] transition-colors duration-500 ease-out"
          onClick={toggleExpanded}
          aria-expanded={expanded}
        >
          <span className="text-textColor text-sm font-bold">
            {expanded ? tLeaderboard("showLess") : tLeaderboard("showMore")}
          </span>
          <Image
            src="/static/icons/arrow-down-black.svg"
            alt=""
            width={14}
            height={14}
            className={clsx(
              "transform transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </button>
      )}
    </div>
  );
};
