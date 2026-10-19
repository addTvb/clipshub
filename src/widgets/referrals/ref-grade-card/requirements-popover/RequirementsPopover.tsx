import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import InfoPopoverIcon from "public/static/icons/info-popover-icon.svg";
import { ReferralLevelItem } from "src/types/referrals";
import { RequirementsContent } from "./RequirementsContent";
import { useWindowSize } from "usehooks-ts";
import { Modal } from "src/components/ui/dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface IProps {
  referral: ReferralLevelItem;
}

export const RequirementsGradesInfo = ({ referral }: IProps) => {
  const t = useTranslations("influencer.referralProgram");
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  if (width <= 900) {
    return (
      <div >
        <button
          className="p-[12px] absolute top-0 right-0"
          onClick={handleOpen}
        >
          <InfoPopoverIcon className="w-[20px] h-[20px] transition-colors duration-300 text-gray600 hover:text-textColor" />
        </button>
        <Modal
          open={open}
          setIsOpen={setOpen}
          mobileBreakpoint={900}
          className="h-auto p-[8px]"
          title={`${referral.slug} ${t("clipperRequirements")}`}
        >
          <RequirementsContent referral={referral} isMobile />
        </Modal>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="p-[12px] absolute top-0 right-0">
        <InfoPopoverIcon className="w-[20px] h-[20px] transition-colors duration-300 text-gray600 hover:text-textColor" />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-5}
        className="text-gray400 text-sm font-medium p-[10px] max-w-[336px] w-full"
      >
        <RequirementsContent referral={referral} />
      </PopoverContent>
    </Popover>
  );
};
