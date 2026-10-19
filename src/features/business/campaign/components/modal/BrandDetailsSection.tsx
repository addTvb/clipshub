import type { Translate } from "../../types";
import type { BrandAvatarState } from "../../model/useBrandPrefill";
import { CompanyAvatarField } from "./CompanyAvatarField";
import { CompanyInfoFields } from "./CompanyInfoFields";
import { WatermarkSection } from "./WatermarkSection";

type BrandDetailsSectionProps = {
  t: Translate;
  brandAvatar: BrandAvatarState;
  onAvatarChange: (patch: Partial<BrandAvatarState>) => void;
  watermarkFee?: number;
  watermarkDiscount?: number;
};

export const BrandDetailsSection = ({
  t,
  brandAvatar,
  onAvatarChange,
  watermarkFee,
  watermarkDiscount,
}: BrandDetailsSectionProps) => (
  <div className="flex flex-col gap-[32px]">
    <CompanyAvatarField
      t={t}
      brandAvatar={brandAvatar}
      onAvatarChange={onAvatarChange}
    />
    <CompanyInfoFields t={t} />
    <WatermarkSection
      t={t}
      fee={watermarkFee}
      discount={watermarkDiscount}
    />
  </div>
);

