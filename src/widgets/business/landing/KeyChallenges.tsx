import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const KeyChallenges = () => {
  const t = useTranslations("business.landing.keyChallenges");

  const challenges = [
    {
      title: t("challenges.standOutFromCompetitors"),
      description: t("challenges.standOutFromCompetitorsDesc"),
      icon: "/static/icons/eye-white.svg",
    },
    {
      title: t("challenges.simplifyTrafficManagement"),
      description: t("challenges.simplifyTrafficManagementDesc"),
      icon: "/static/icons/robot-white.svg",
    },
    {
      title: t("challenges.avoidRisingAdCosts"),
      description: t("challenges.avoidRisingAdCostsDesc"),
      icon: "/static/icons/medal-white.svg",
    },
    {
      title: t("challenges.goBeyondTraditionalInfluencers"),
      description: t("challenges.goBeyondTraditionalInfluencersDesc"),
      icon: "/static/icons/influencer-white.svg",
    },
  ];

  return (
    <div className="relative flex flex-col gap-[36px] md:gap-[72px] pt-[82px] pb-[240px] bg-textColor px-[10px] md:px-[30px] max-w-screenMaxWidth mx-auto">
      <div 
        className="absolute -top-[20%] left-0 size-[868px] bg-no-repeat bg-cover z-0"
        style={{
          backgroundImage: "url('/static/images/blur-key-challenges.webp')",
          transform: 'translateX(-50%)'
        }}
      ></div>

      <div className="flex flex-col gap-0 md:gap-[8px] z-10 items-center md:items-start">
        <span className="text-gray550 text-lg md:text-xl font-bold">
          {t("painpoints")}
        </span>
        <h2 className="text-white text-[28px] md:text-[40px] font-bold">
          {t("title")}
        </h2>
      </div>

      <div className="flex flex-col gap-[12px] lg:grid lg:grid-cols-11 lg:grid-rows-2 lg:gap-[24px] z-10">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            style={{ backgroundColor: "#12162D" }}
            className={clsx(
              "grid grid-cols-[auto_1fr] items-center md:items-start md:flex md:flex-col gap-[10px] p-[24px] max-[1024px]:bg-keyChallengesGrad lg:bg-[#12162D] rounded-[24px]",
              index === 0 && "col-span-5",
              index === 1 && "col-span-6",
              index === 2 && "col-span-6",
              index === 3 && "col-span-5"
            )}
          >
            <Image
              src={challenge.icon}
              alt=""
              width={80}
              height={80}
              className="w-[24px] h-[24px] md:w-[80px] md:h-[80px] row-[1/1]"
            />

            <h3 className="col-[2/3] row-[1/1] text-white text-lg md:text-xl font-bold">
              {challenge.title}
            </h3>

            <p className="text-gray550 text-sm md:text-base col-span-2">
              {challenge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
