import { Input } from "src/components/ui/input";
import type { Translate } from "../../types";

type CampaignNameSectionProps = {
  t: Translate;
};

export const CampaignNameSection = ({ t }: CampaignNameSectionProps) => (
  <div className="flex flex-col gap-[10px]">
    <h4 className="text-base font-bold">{t("business.enterCampaignName")}</h4>
    <Input
      name="campaignName"
      placeholder={t("business.campaignName")}
      icon="/static/icons/black-flag.svg"
    />
    <div className="font-[Inter] text-gray400 font-medium text-sm leading-[20px]">
      {t("business.campaignSubtitle")}
    </div>
  </div>
);

