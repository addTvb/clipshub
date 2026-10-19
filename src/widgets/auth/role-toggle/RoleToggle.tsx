"use client";

import { useTranslations } from "next-intl";
import { useRoleStore } from "./useRoleStore";
import clsx from "clsx";
import { UserType } from "src/types/base";
import { useEffect } from "react";

interface IProps {
  defaultValue?: UserType;
}

export const RoleToggle = ({ defaultValue }: IProps) => {
  const t = useTranslations("common");
  const { role, changeRole } = useRoleStore((state) => state);
  const handleSetInfluencer = () => changeRole("influencer");
  const handleSetBusiness = () => changeRole("business");

  useEffect(() => {
    if (defaultValue) changeRole(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <div className="flex items-center gap-[6px] p-[6px] rounded-full bg-[#E0EDF2] ">
      <button
        onClick={handleSetInfluencer}
        className={clsx(
          "font-semibold w-full rounded-full text-center py-[6px] px-[12px] text-base transition-colors",
          role === "influencer" && "bg-[#3188AA] text-white"
        )}
      >
        {t("influencer")}
      </button>
      <button
        onClick={handleSetBusiness}
        className={clsx(
          "font-semibold w-full rounded-full text-center py-[6px] px-[12px] text-base transition-colors",
          role === "business" && "bg-[#3188AA] text-white"
        )}
      >
        {t("business")}
      </button>
    </div>
  );
};
