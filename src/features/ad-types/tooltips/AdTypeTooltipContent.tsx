"use client";

import { useTranslations } from "next-intl";
import { AdType } from "src/types/base";
import { getAdTypeConfig } from "../config";
import Link from "next/link";
import HelpIcon from "@public/static/icons/help-icon.svg";
import LinkIcon from "@public/static/icons/link-icon.svg";
import DOMPurify from "isomorphic-dompurify";

interface AdTypeTooltipContentProps {
  adType: AdType;
  translationNamespace?: string;
  showLink?: boolean;
}

export default function AdTypeTooltipContent({
  adType,
  translationNamespace = "business",
  showLink = false,
}: AdTypeTooltipContentProps) {
  const t = useTranslations(translationNamespace);
  const config = getAdTypeConfig(adType);

  if (!config) return null;

  const Icon = config.icon;
  const MockupComponent = config.mockupComponent as React.ComponentType;

  return (
    <div className="flex flex-col gap-3">
      {/* Header with icon and title */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            {Icon && <Icon />}
          </div>
          <span className="text-[#586781] text-sm font-bold whitespace-nowrap">
            {t(`landing.heroCarousel.${adType}.title`)}
          </span>
        </div>
        {showLink && (
          <Link
            className="flex items-center gap-1.5 whitespace-nowrap text-blue300 font-[Manrope] text-[14px] font-bold"
            href={`/clipper/how-it-works?adType=${adType}`}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
          >
            <HelpIcon className="w-4 h-4 text-blue300" />
            {t("landing.heroCarousel.howItWorks")}
            <LinkIcon className="w-4 h-4 text-blue300" />
          </Link>
        )}
      </div>

      {/* Description */}
      <div className="text-[#586781] text-sm font-medium leading-[20px]">
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              t.raw(`landing.heroCarousel.${adType}.tooltip.description`)
            ),
          }}
        />
        <br />
        <br />
        <span className="font-semibold">
          {t(`landing.heroCarousel.${adType}.tooltip.example`)}
        </span>
      </div>

      {/* Mockup */}
      <div className="flex justify-center">
        {MockupComponent && <MockupComponent />}
      </div>
    </div>
  );
}
