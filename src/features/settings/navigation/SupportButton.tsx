"use client";

import SupportIcon from "@icons/support.svg";
import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import "src/types/tawk";

const SupportButton = () => {
  const t = useTranslations("common");

  const handleOpenChat = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API?.maximize?.();
    }
  };

  return (
    <Button
      onClick={handleOpenChat}
      variant="text"
      className="flex items-center gap-[8px] pt-[24px] mt-auto border-white200 border-solid border-t-[2px] w-full justify-start"
    >
      <SupportIcon width={20} height={20} stroke="black" />
      <div>
        <div className="text-gray400 font-[Inter] font-[500] text-[16px]">
          {t("support")}
        </div>
      </div>
    </Button>
  );
};

export default SupportButton;
