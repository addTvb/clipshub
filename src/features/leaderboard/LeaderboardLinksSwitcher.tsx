"use client";

import { Link, usePathname } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import clsx from "clsx";

export const LeaderboardLinksSwitcher = () => {
  const t = useTranslations("leaderboard");
  const pathname = usePathname();
  const isPosts = pathname.includes("/posts");
  const isMediaChannels = pathname.includes("/media-channels");

  return (
    <div className="border border-white rounded-[36px] p-[6px] flex gap-[6px] items-center text-center">
      <Link
        href="/leaderboard/posts"
        className={clsx(
          "text-xs sm:text-[16px] font-bold leading-[22px] px-[12px] py-[6px] rounded-[22px] transition-all duration-200",
          isPosts ? "bg-white text-black" : "bg-transparent text-white"
        )}
      >
        {t("posts.title")}
      </Link>
      <Link
        href="/leaderboard/media-channels"
        className={clsx(
          "text-xs sm:text-[16px] font-bold leading-[22px] px-[12px] py-[6px] rounded-[22px] transition-all duration-200",
          isMediaChannels ? "bg-white text-black" : "bg-transparent text-white"
        )}
      >
        {t("mediaChannels.title")}
      </Link>
    </div>
  );
};
