"use client";

import { Button } from "src/components/ui/button/button";
import { RotateGear } from "./RotateGear";
import CloseIcon from "@icons/close.svg";
import { RewardGuide } from "./RewardGuide";
import Image from "next/image";
import CheckIcon from "@icons/check-icon.svg";
import { RewardState } from "src/types/base";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import TextUnderline from "@public/static/images/text-uderline.svg";
import { Modal } from "src/components/ui/dialog";

interface IProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  currentState?: RewardState;
}
const stepLinks = {
  registered: "/influencers",
  channel_configured: "/offers",
  post_created: "#",
  post_moderating: "#",
  post_approved: "#",
  nul: "#",
};

export const FirstVideoRewardModal = ({
  open,
  setIsOpen,
  currentState,
}: IProps) => {
  const t = useTranslations("common.rewardModal");

  const handleClose = () => setIsOpen(false);

  // Отключаем скролл страницы при открытии модалки
  useEffect(() => {
    // Сохраняем текущее значение overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Отключаем скролл
    document.body.style.overflow = "hidden";

    // Восстанавливаем скролл при размонтировании
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <Modal
      setIsOpen={setIsOpen}
      open={open}
      className="p-0 h-screen border-none rounded-[24px] bg-transparent"
      mobileClassName="p-0 rounded-[24px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="overflow-y-auto md:p-[36px] p-[10px] absolute bg-textColor  w-full md:max-w-[560px] overflow-hidden max-h-[100%] h-screen"
      >
        <RotateGear className="md:translate-x-[40%] md:translate-y-[-40%] translate-x-[55%] translate-y-[-52%]" />
        <Button
          onClick={handleClose}
          variant="text"
          className="absolute top-[18px] right-[18px] p-0 [&_svg]:size-[28px] size-[28px] z-[1]"
        >
          <CloseIcon className="size-[28px]" />
        </Button>
        <div className="flex flex-col gap-[24px] md:h-auto min-h-full justify-between">
          <div className="md:text-[40px] text-[24px] font-bold text-white relative md:ml-0 ml-[10px] md:mt-0 mt-[18px]">
            {t("titleStart")}{" "}
            <Image
              className="inline-block md:w-[91px] md:h-[81px] w-[55px] h-[49px]"
              src="/static/images/3-dollars.svg"
              alt="reward icon"
              width={91}
              height={81}
            />{" "}
            <span className="inline-block relative ">
              {t("titleEnd")}
              <span
                className="block absolute left-0 top-full w-[180%]  pointer-events-none"
                aria-hidden="true"
              >
                <TextUnderline className="w-full" />
              </span>
            </span>
          </div>
          <RewardGuide currentState={currentState} onClose={handleClose} />
          <Button
            onClick={handleClose}
            href={currentState ? stepLinks[currentState] : "/auth/register"}
            variant="outline"
            className="min-h-[50px] h-full p-[12px] w-full bg-transparent leading-[22px] text-white text-[16px] font-[700] md:mt-[18px] mt-auto border-white hover:text-[#DFE3EA] hover:border-[#DFE3EA] transition-colors duration-300"
          >
            {t("button")}
            <CheckIcon className="size-[20px]" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
