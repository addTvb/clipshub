import { useTranslations } from "next-intl";
import Image from "next/image";

export const TrustPilotBadge = () => {
  const t = useTranslations("landing.trustpilot");
  return (
    <a
      href="https://www.trustpilot.com/review/clipshub.com"
      target="_blank"
      className="flex items-center gap-[10px] px-[12px] py-[6px] rounded-[12px] border border-[#A8CAD8] w-fit"
    >
      <span className="font-[Inter] font-medium text-sm">{t("excellent")}</span>

      <Image
        src="/static/icons/trustpilot-5-stars.svg"
        alt=""
        width={107}
        height={20}
      />

      <Image
        src="/static/icons/trustpilot-logo.svg"
        alt="Trustpilot"
        width={87}
        height={20}
      />
    </a>
  );
};
