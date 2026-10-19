"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

type Variant = "default" | "landing";

interface IProps {
  variant?: Variant;
}

/** Visual-only social buttons (no OAuth / backend in landings build). */
export const SocialMediaLogin = ({ variant = "default" }: IProps) => {
  const t = useTranslations("common");

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-3",
        variant === "landing" && "w-full"
      )}
    >
      <p className="text-sm text-gray550 font-medium">{t("orSignUpWith")}</p>
      <div className="flex items-center gap-4">
        <img
          src="/static/icons/social-shorts.svg"
          alt="YouTube"
          width={28}
          height={28}
        />
        <img
          src="/static/icons/social-reels.svg"
          alt="Instagram"
          width={28}
          height={28}
        />
        <img
          src="/static/icons/social-tiktok.svg"
          alt="TikTok"
          width={28}
          height={28}
        />
      </div>
    </div>
  );
};
