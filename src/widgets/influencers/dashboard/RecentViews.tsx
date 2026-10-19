import SocialMediaIcon from "src/components/ui/social-media-icon";
import DollarIcon from "@icons/dollar-coin-blue.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Массив данных для кнопок
const recentViewsData = [
  {
    id: 1,
    name: "GGPICK",
    viewRange: "200K – 500K",
    platform: "youtube",
    price: "$5.00",
  },
  {
    id: 2,
    name: "BeautyBlog",
    viewRange: "100K – 300K",
    platform: "instagram",
    price: "$7.50",
  },
  {
    id: 3,
    name: "TechReviews",
    viewRange: "500K – 1M",
    platform: "tiktok",
    price: "$10.00",
  },
];

const RecentViews = () => {
  const t = useTranslations("influencer.recentViews");

  return (
    <div className="shadow-dropdownShadow p-[24px] flex flex-col gap-[24px] h-fit bg-white rounded-[6px]">
      <div className="text-[20px] font-bold">{t("title")}</div>
      <div className="flex flex-col gap-[8px]">
        {recentViewsData.map((item) => (
          <button
            key={item.id}
            className="flex items-center justify-between p-[8px] text-left rounded-[8px] hover:bg-[#FAFBFD] active:bg-white50 transition-colors duration-300"
          >
            <div className="flex items-center gap-[12px]">
              <div className="relative size-[36px]">
                <Image
                  src={"https://assets.gds.it/2015/01/Avatar-970x485.jpg"}
                  alt="company logo"
                  width={36}
                  height={36}
                  className="size-[36px] rounded-full border border-gray700 object-cover"
                />
                <SocialMediaIcon
                  className="size-[20px] absolute right-[-7px] bottom-[-4px] "
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  socialPlatform={item.platform as any}
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="text-[16px] font-bold truncate leading-[20px]">
                  {item.name}
                </div>
                <div className="text-xs text-gray350 font-[500] leading-[18px]">
                  {item.viewRange}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[2px]">
              <div className="text-[#97A8C6] text-xs font-[600] flex items-center gap-[6px]">
                <DollarIcon
                  viewBox="0 0 20 20"
                  className="size-[12px] flex-none"
                />
                {t("perThousandViews", { count: 1000 })}
              </div>
              <div className="text-[14px] font-bold text-right">
                {item.price}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentViews;
