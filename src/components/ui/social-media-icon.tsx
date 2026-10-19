"use client";

import { FC, SVGProps } from "react";
import InstagramIcon from "@public/static/images/instagram.svg";
import YoutubeIcon from "@public/static/images/youtube.svg";
import TiktokIcon from "@public/static/images/tiktok.svg";
import type { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

type IconComponent = FC<SVGProps<SVGSVGElement>>;

const icons: Record<string, IconComponent> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

interface IProps {
  socialPlatform?: SocialPlatform | string | null;
  className?: string;
}

const SocialMediaIcon = ({ socialPlatform, className }: IProps) => {
  if (!socialPlatform) {
    return null;
  }

  const Icon = icons[socialPlatform];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} viewBox="0 0 32 32" />;
};

export default SocialMediaIcon;
