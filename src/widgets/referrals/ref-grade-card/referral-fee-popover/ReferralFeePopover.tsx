import InfoPopoverIcon from "public/static/icons/info-popover-icon.svg";
import { useTranslations } from "next-intl";
import { useWindowSize } from "usehooks-ts";
import { Modal } from "src/components/ui/dialog";
import { useState } from "react";
import { InfoPopover } from "src/components/ui/info-popover";

export const ReferralFeePopover = () => {
  const t = useTranslations("influencer.referralProgram");
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  if (width <= 900) {
    return (
      <div className="flex">
        <button onClick={handleOpen}>
          <InfoPopoverIcon className="w-[20px] h-[20px] transition-colors duration-300 text-gray550 hover:text-textColor" />
        </button>
        <Modal
          open={open}
          setIsOpen={setOpen}
          mobileBreakpoint={900}
          className="h-auto p-[8px]"
          title={t("referralFee")}
        >
          <div className="text-gray400 text-sm font-medium font-[Inter]">
            {t("referralFeePopover")}
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <InfoPopover
      contentOffset={6}
      iconClassName="text-gray550 hover:text-textColor"
    >
      {t("referralFeePopover")}
    </InfoPopover>
  );
};
