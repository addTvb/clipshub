"use client";

import { useTranslations } from "next-intl";
import InstagramIcon from "@icons/instagram-icon.svg";
import YoutubeIcon from "@icons/youtube-icon.svg";
import TiktokIcon from "@icons/tiktok-icon.svg";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

interface AddChannelButtonProps {
  type: SocialPlatform;
  onClick: () => void;
  disabled?: boolean;
}

const AddChannelButton = ({ type, onClick, disabled }: AddChannelButtonProps) => {
  const t = useTranslations("influencer");

  const icons = {
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    tiktok: TiktokIcon,
    google: YoutubeIcon,
  };

  const Icon = icons[type];

  return (
    <button 
      className="rounded-[8px] group w-1/3 flex flex-col gap-[4px] items-center justify-center p-[12px] bg-gray100 hover:bg-blueLight active:scale-95 transition-[background-color,color,transform] duration-300"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="group-hover:fill-blue300 fill-gray400 transition-colors duration-300 size-[24px]" width={24} height={24}/>
      <div className="text-sm text-gray400 font-medium group-hover:text-blue300 transition-colors duration-300 font-[Inter]">
        {t(type)}
      </div>
    </button>
  );
};

export default AddChannelButton;
