import clsx from "clsx";
import StarsImage from "@public/static/images/leaderboard/stars.svg";
import { PEDESTAL_HEIGHTS, PedestalPlace } from "./model/constants";

interface IProps {
  place: PedestalPlace;
}

export const PedestalCardSkeleton = ({ place }: IProps) => {
  return (
    <div className={clsx("relative w-full z-[10]", PEDESTAL_HEIGHTS[place])}>
      {/* Desktop SVG маска (как в PedestalCard) */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 467 323"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={`pedestal-clip-${place}`} clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.00214, 0.0031)"
              d="M0 20C0 8.95431 8.9543 0 20 0H399.666C405.366 0 410.795 2.43183 414.589 6.68472L456.339 53.4758C463.205 61.1714 467 71.1244 467 81.4379V303C467 314.046 458.046 323 447 323H20C8.9543 323 0 314.046 0 303V20Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Desktop контейнер с градиентным фоном и блюром (как в PedestalCard) */}
      <div
        className="absolute inset-0 backdrop-blur-[9px] hidden md:block"
        style={{
          clipPath: `url(#pedestal-clip-${place})`,
          background: `linear-gradient(-150deg, ${
            place === 1 ? "#FFD581" : place === 2 ? "#BFBFBF" : "#FFB484"
          } 0%, #FFFFFF 56%)`,
        }}
      />

      {/* Mobile SVG маска (как в PedestalCard) */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 123 291"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={`pedestal-mobile-clip-${place}`} clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.0081300813, 0.0034364261)"
              d="M0.000534393 20.373C0.000542085 16.4779 1.62323 12.7589 4.47865 10.1098L13.6494 1.60147C14.759 0.57204 16.2166 0 17.7302 0H105.271C106.784 0 108.242 0.572042 109.352 1.60148L118.522 10.1098C121.378 12.7589 123.001 16.4779 123.001 20.373L123 285C123 288.314 120.314 291 117 291H6.00002C2.6863 291 5.3045e-06 288.314 1.18479e-05 285L0.000534393 20.373Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Mobile контейнер с градиентным фоном и блюром (как в PedestalCard) */}
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

      {/* Skeleton аватар (позиционирование как в PedestalAvatar) */}
      <div
        className={clsx(
          "z-50 w-fit absolute left-1/2 -translate-x-1/2 md:relative md:left-[30px] md:translate-x-0",
          place === 1 && "-top-[40px] md:-top-[55px] lg:-top-[60px]",
          place !== 1 && "-top-[40px] md:-top-[78px] lg:-top-[78px]"
        )}
      >
        <div
          className={clsx(
            "rounded-full bg-gray-300 animate-pulse border border-gray700 min-w-[81px] min-h-[81px] w-[81px] h-[81px]",
            place === 1
              ? "md:w-[125px] md:h-[125px] lg:w-[158px] lg:h-[158px]"
              : "md:w-[110px] md:h-[110px] lg:w-[136px] lg:h-[136px]"
          )}
        />
      </div>

      {/* Desktop версия контента (макет как в PedestalCard, скелетоны вместо контента) */}
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
          <div className="w-[70px] h-[33px] bg-gray-300 rounded animate-pulse" />
          <div className="w-[180px] h-[36px] bg-gray-300 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-2 border-t border-gray700">
          <div className="flex flex-col md:gap-[8px] md:items-center md:px-[12px] md:py-[20px] border-gray700 border-r">
            <div className="flex items-center gap-[4px]">
              <div className="md:w-4 md:h-4 w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[80px] h-[20px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[100px] h-[24px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-col md:gap-[8px] md:items-center md:px-[12px] md:py-[20px] border-gray700">
            <div className="flex items-center gap-[4px]">
              <div className="md:w-4 md:h-4 w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[80px] h-[20px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[60px] h-[24px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-col md:gap-[8px] md:items-center md:px-[12px] md:py-[20px] border-gray700 border-r border-t">
            <div className="w-[80px] h-[20px] bg-gray-300 rounded animate-pulse" />
            <div className="w-[70px] h-[24px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-col md:gap-[8px] md:items-center md:px-[12px] md:py-[20px] border-gray700 border-t">
            <div className="flex items-center gap-[4px]">
              <div className="md:w-4 md:h-4 w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[80px] h-[20px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[90px] h-[24px] bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Мобильная версия контента (как в PedestalCard, скелетоны) */}
      <div
        className="md:hidden absolute inset-0 overflow-hidden p-[0px] pt-[50px] flex flex-col justify-center items-center"
        style={{
          clipPath: `url(#pedestal-mobile-clip-${place})`,
        }}
      >
        <div className="flex flex-col gap-[4px] items-center">
          <div className="w-[48px] h-[23px] bg-gray-300 rounded animate-pulse" />
          <div className="w-[120px] h-[20px] bg-gray-300 rounded animate-pulse" />
        </div>

        <div className="md:hidden flex flex-col md:border-t border-gray700 px-[12px] md:px-0 w-full">
          <div className="flex flex-row items-center justify-between px-[0] py-[8px] border-b border-gray700">
            <div className="flex items-center gap-[4px]">
              <div className="w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[100px] h-[14px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[50px] h-[14px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-row items-center justify-between px-[0] py-[8px] border-b border-gray700">
            <div className="flex items-center gap-[4px]">
              <div className="w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[80px] h-[14px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[40px] h-[14px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-row items-center justify-between px-[0] py-[8px] border-b border-gray700 order-[-1]">
            <div className="w-[70px] h-[14px] bg-gray-300 rounded animate-pulse" />
            <div className="w-[60px] h-[14px] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex flex-row items-center justify-between px-[0] py-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="w-[13px] h-[13px] bg-gray-300 rounded animate-pulse" />
              <div className="w-[70px] h-[14px] bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="w-[60px] h-[14px] bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
