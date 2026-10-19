import { Checkbox } from "src/components/ui/checkbox";
import { calculateWatermarkCommission } from "src/lib/numbers/calculateWatermarkCommission";
import type { Translate } from "../../types";

type WatermarkSectionProps = {
  t: Translate;
  fee?: number;
  discount?: number;
};

export const WatermarkSection = ({ t, fee, discount }: WatermarkSectionProps) => (
  <div className="flex flex-col gap-[10px]">
    <div className="flex items-center gap-[10px]">
      <Checkbox name="enableWatermark" id="enableWatermark" />
      <label htmlFor="enableWatermark" className="text-sm font-medium">
        {t("influencer.enableWatermark")}
      </label>
    </div>
    <div className="text-gray600 text-sm font-medium">
      {t("influencer.enableWatermarkDesc", {
        fee,
        feeWithDiscount: calculateWatermarkCommission({
          fee,
          discount,
          allowDiscount: true,
        }),
      })}
    </div>
  </div>
);

