import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useTranslations } from "next-intl";
import { useWindowSize } from "usehooks-ts";
import { useState } from "react";
import { Modal } from "src/components/ui/dialog";
import { AnimatedUpArrowsIcon } from "./AnimatedUpArrowsIcon";
import { UpgradeContent } from "./UpgradeContent";

interface IProps {
  beginnerReward: number;
  smallClipperReward: number;
}

export const UpgradePopover = ({
  beginnerReward,
  smallClipperReward,
}: IProps) => {
  const t = useTranslations("influencer.referralProgram");
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  if (width <= 900) {
    return (
      <div className="flex">
        <button onClick={handleOpen}>
          <AnimatedUpArrowsIcon />
        </button>
        <Modal
          open={open}
          setIsOpen={setOpen}
          mobileBreakpoint={900}
          className="h-auto p-[8px]"
          title={
            <div className="flex items-center gap-[4px]">
              <AnimatedUpArrowsIcon />
              <span>{t("gradeStatus")}</span>
            </div>
          }
        >
          <UpgradeContent
            beginnerReward={beginnerReward}
            smallClipperReward={smallClipperReward}
          />
        </Modal>
      </div>
    );
  }
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <AnimatedUpArrowsIcon />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        className="text-gray400 text-sm font-medium p-[12px] max-w-[380px] w-full flex flex-col gap-[12px]"
      >
        <UpgradeContent
          beginnerReward={beginnerReward}
          smallClipperReward={smallClipperReward}
        />
      </PopoverContent>
    </Popover>
  );
};
