import clsx from "clsx";
import StarsImage from "@public/static/images/leaderboard/stars.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PedestalInfoCard } from "./PedestalInfoCard";
import { PedestalAvatar } from "./PedestalAvatar";
import { LeaderboardMediaChannelItem } from "src/types/leadeerboard";
import { socialPlatformIconsWithText } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";
import { PEDESTAL_HEIGHTS, PedestalPlace } from "./model/constants";
import { formatNumberWithSpaces } from "src/lib/numbers/formatNumberWithSpaces";

interface IProps {
  mediaChannel: LeaderboardMediaChannelItem;
  place: PedestalPlace;
}

export const PedestalCard = ({ mediaChannel, place }: IProps) => {
  const t = useTranslations();

  return (
    <div className={clsx("relative w-full z-[10]", PEDESTAL_HEIGHTS[place])}>
      {/* Desktop SVG маска */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 467 323"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath
            id={`pedestal-clip-${place}`}
            clipPathUnits="objectBoundingBox"
          >
            <path
              transform="scale(0.00214, 0.0031)"
              d="M0 20C0 8.95431 8.9543 0 20 0H399.666C405.366 0 410.795 2.43183 414.589 6.68472L456.339 53.4758C463.205 61.1714 467 71.1244 467 81.4379V303C467 314.046 458.046 323 447 323H20C8.9543 323 0 314.046 0 303V20Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Desktop контейнер с градиентным фоном и блюром (как в hero) */}
      <div
        className="absolute inset-0 backdrop-blur-[9px] hidden md:block"
        style={{
          clipPath: `url(#pedestal-clip-${place})`,
          background: `linear-gradient(-150deg, ${
            place === 1 ? "#FFD581" : place === 2 ? "#BFBFBF" : "#FFB484"
          } 0%, #FFFFFF 56%)`,
        }}
      />

      {/* Mobile SVG маска */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 123 291"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath
            id={`pedestal-mobile-clip-${place}`}
            clipPathUnits="objectBoundingBox"
          >
            <path
              transform="scale(0.0081300813, 0.0034364261)"
              d="M0.000534393 20.373C0.000542085 16.4779 1.62323 12.7589 4.47865 10.1098L13.6494 1.60147C14.759 0.57204 16.2166 0 17.7302 0H105.271C106.784 0 108.242 0.572042 109.352 1.60148L118.522 10.1098C121.378 12.7589 123.001 16.4779 123.001 20.373L123 285C123 288.314 120.314 291 117 291H6.00002C2.6863 291 5.3045e-06 288.314 1.18479e-05 285L0.000534393 20.373Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Mobile контейнер с градиентным фоном и блюром (как в hero) */}
      <div
        className="absolute inset-0 backdrop-blur-[9px] md:hidden"
        style={{
          clipPath: `url(#pedestal-mobile-clip-${place})`,
          background: `linear-gradient(180deg, ${
            place === 1 ? "#FFD581" : place === 2 ? "#BFBFBF" : "#FFB484"
          } 0%, #FFFFFF 46.49%)`,
        }}
      >
        <StarsImage
          className={clsx(
            "absolute w-[75px] h-[110px] left-[-30px] top-[0px] z-[1] fill-current",
            place === 1
              ? "text-[#B17A3D]"
              : place === 2
              ? "text-[#5C5E61]"
              : place === 3
              ? "text-[#BA5335]"
              : ""
          )}
        />
      </div>

      <PedestalAvatar
        src={mediaChannel?.user_avatar?.link}
        place={place}
        userID={mediaChannel?.media_channel_id}
      />

      {/* Desktop версия контента */}
      <div
        className="hidden md:flex absolute inset-0 overflow-hidden flex-col gap-[25px] justify-end"
        style={{
          clipPath: `url(#pedestal-clip-${place})`,
        }}
      >
        <StarsImage
          className={clsx(
            "absolute w-[31%] right-[0px] top-[-20px] z-[2] fill-current",
            place === 1
              ? "text-[#B17A3D]"
              : place === 2
              ? "text-[#5C5E61]"
              : place === 3
              ? "text-[#BA5335]"
              : ""
          )}
        />
        <div className="flex flex-col gap-[12px] items-center">
          <Image
            src={`/static/images/leaderboard/grade${place}.svg`}
            alt=""
            width={70}
            height={33}
          />
          <div className="text-sm md:text-[28px] font-bold">
            {mediaChannel?.user_masked_nick}
          </div>
        </div>

        {/* Desktop версия - сетка 2x2 */}
        <div className="grid grid-cols-2 border-t border-gray700">
          <PedestalInfoCard
            iconSrc="/static/icons/eye-gray.svg"
            label={t("leaderboard.totalViews")}
            value={formatNumberWithSpaces(mediaChannel?.views)}
            containerClass="border-r"
          />
          <PedestalInfoCard
            iconSrc="/static/icons/hashtag-gray.svg"
            label={t("leaderboard.totalPosts")}
            value={formatNumberWithSpaces(mediaChannel?.posts_count)}
          />
          <PedestalInfoCard
            label={t("leaderboard.table.platform")}
            value={
              <Image
                src={socialPlatformIconsWithText[mediaChannel?.platform]}
                alt=""
                width={70}
                height={24}
                className="md:inline-block md:mb-[5px]"
              />
            }
            containerClass="border-r border-t"
          />
          <PedestalInfoCard
            iconSrc="/static/icons/dollar-gray.svg"
            label={t("leaderboard.table.paid")}
            value={
              <span className="cash-bg-clip font-bold">
                ${formatNumberWithSpaces(mediaChannel?.cash)} USD
              </span>
            }
            containerClass="border-t"
          />
        </div>
      </div>

      {/* Мобильная версия контента */}
      <div
        className="md:hidden absolute inset-0 overflow-hidden p-[0px] pt-[50px] flex flex-col justify-center items-center"
        style={{
          clipPath: `url(#pedestal-mobile-clip-${place})`,
        }}
      >
        <div className="flex flex-col gap-[4px] items-center">
          <Image
            src={`/static/images/leaderboard/grade${place}.svg`}
            alt=""
            width={48}
            height={23}
          />
          <div className="text-sm font-bold">
            {mediaChannel?.user_masked_nick}
          </div>
        </div>

        {/* Мобильная версия - вертикальный список */}
        <div className="md:hidden flex flex-col md:border-t border-gray700 px-[12px] md:px-0">
          <PedestalInfoCard
            iconSrc="/static/icons/eye-gray.svg"
            label={t("leaderboard.totalViews")}
            value={formatNumberWithSpaces(mediaChannel?.views)}
            containerClass="border-b"
          />
          <PedestalInfoCard
            iconSrc="/static/icons/hashtag-gray.svg"
            label={t("leaderboard.totalPosts")}
            value={formatNumberWithSpaces(mediaChannel?.posts_count)}
            containerClass="border-b"
          />
          <PedestalInfoCard
            label={t("leaderboard.table.platform")}
            value={
              <Image
                src={socialPlatformIconsWithText[mediaChannel?.platform]}
                alt=""
                width={70}
                height={24}
                className="w-[46px] h-[16px]"
              />
            }
            containerClass="border-b order-[-1]"
          />
          <PedestalInfoCard
            iconSrc="/static/icons/dollar-gray.svg"
            label={t("leaderboard.table.paid")}
            value={
              <span className="cash-bg-clip font-bold">
                ${formatNumberWithSpaces(mediaChannel?.cash)} USD
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};
