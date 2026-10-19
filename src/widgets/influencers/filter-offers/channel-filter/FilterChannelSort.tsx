"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMediaChannels } from "src/queries/influencers/useMediaChannels";
import { memo } from "react";
import { useFilterStore } from "../model/useFilterStore";
import { useWindowSize } from "usehooks-ts";
import { ChannelSelect } from "./ChannelSelect";
import { MobileChannelSelect } from "./MobileChannelSelect";
import { useAuthStore } from "src/store/auth";
import { FilterChannelSortSkeleton } from "./FilterChannelSortSkeleton";

interface IProps {
  className?: string;
  btnBg?: string;
}

export const FilterChannelSort = memo(
  ({ className, btnBg = "#f3f6fa" }: IProps) => {
    const t = useTranslations("influencer");
    const { width } = useWindowSize();
    const { mediaChannels, isLoading: isMediaChannelsLoading } =
      useMediaChannels();
    const { isAuthenticated } = useAuthStore();

    const { setFilters, media_channel_id, ...filters } = useFilterStore();

    const handleChangeSelect = (value: string) => {
      setFilters({ ...filters, page: 1, media_channel_id: value });
    };

    if (isMediaChannelsLoading) {
      return <FilterChannelSortSkeleton className={className} />;
    }
    if (!isAuthenticated || !mediaChannels || mediaChannels?.length === 0)
      return null;

    return (
      <div
        className={clsx(
          "p-[16px] flex gap-[10px] border-b-[1px] sm:border-b-0 sm:border-r-2 flex-wrap min-[400px]:flex-nowrap border-gray200",
          className
        )}
      >
        <button
          className={clsx(
            "flex gap-[8px] items-center py-[16px] px-[10px] rounded-[6px] bg-gray100 text-black400 font-semibold text-sm min-w-max w-full justify-center sm:justify-start sm:w-auto transition-colors",
            media_channel_id === "all" && "bg-textColor text-white"
          )}
          style={
            btnBg && media_channel_id !== "all"
              ? { backgroundColor: btnBg }
              : { backgroundColor: "#010d22" }
          }
          onClick={() => handleChangeSelect("all")}
        >
          <Image
            src="/static/icons/megaphone-gray.svg"
            alt=""
            width={20}
            height={20}
          />
          <span className="min-w-max">{t("allOffers")}</span>
        </button>

        {mediaChannels.length > 0 && (
          <button
            className={clsx(
              "rounded-[6px] flex flex-col gap-[4px] bg-gray100 min-w-[170px] w-full justify-center sm:min-w-auto sm:w-auto items-center min-[400px]:items-start transition-colors",
              media_channel_id !== "all" &&
                "bg-textColor text-white p-[7px] pt-[3px]",
              media_channel_id === "all" && "justify-center px-[10px] py-[16px]"
            )}
            disabled={!mediaChannels}
            style={
              btnBg && media_channel_id === "all"
                ? { backgroundColor: btnBg }
                : { backgroundColor: "#010d22" }
            }
            onClick={() => handleChangeSelect(String(mediaChannels[0].id))}
          >
            <span className="flex items-center gap-[8px]">
              <Image
                src="/static/icons/like-gray.svg"
                alt=""
                width={media_channel_id === "all" ? 20 : 12}
                height={media_channel_id === "all" ? 20 : 12}
              />
              <span
                className={clsx(
                  media_channel_id === "all"
                    ? "text-sm font-semibold text-[#303948]"
                    : "text-gray550 text-[11px] font-semibold"
                )}
              >
                {t("forYourChannels")}
              </span>
            </span>
            {media_channel_id !== "all" &&
              (width <= 1024 ? <MobileChannelSelect /> : <ChannelSelect />)}
          </button>
        )}
      </div>
    );
  }
);
FilterChannelSort.displayName = "FilterChannelSort";
