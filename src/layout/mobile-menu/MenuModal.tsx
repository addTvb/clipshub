"use client";

import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import { useCallback } from "react";
import { useAuthStore } from "src/store/auth";
import HowItWorksIcon from "@icons/how-it-works-icon.svg";
import ClipperIcon from "@icons/influencer-icon.svg";
import CompanyIcon from "@icons/company-icon.svg";
import MobileDrawer from "src/components/ui/mobile-drawer";
import CrownIcon from "@icons/crown.svg";
// import { useGetUser } from "src/queries/useGetUser";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
  bottomOffset: number;
}

export const MenuModal = ({ open, onClose, bottomOffset }: MenuModalProps) => {
  const t = useTranslations();
  // const { user } = useGetUser();
  const { isAuthenticated } = useAuthStore();
  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <MobileDrawer
      open={open}
      onClose={handleClose}
      title={t("common.menu")}
      bottomOffset={bottomOffset}
      className="py-[14px] px-[16px] bg-white"
      zIndex={50}
    >
      <div>
        {isAuthenticated && (
          <Link
            href="/clipper"
            className="p-[10px] text-gray400 text-sm font-medium flex items-center gap-[8px]"
            onClick={handleClose}
          >
            <ClipperIcon fontSize={20} className="text-gray400" />
            <span>{t("footer.iAmClipper")}</span>
          </Link>
        )}
        {isAuthenticated && (
          <Link
            href="/business"
            className="p-[10px] text-gray400 text-sm font-medium flex items-center gap-[8px]"
            onClick={handleClose}
          >
            <CompanyIcon fontSize={20} className="text-gray400" />
            <span>{t("footer.forBusiness")}</span>
          </Link>
        )}
        <Link
          href="/clipper/how-it-works"
          className="p-[10px] text-gray400 text-sm font-medium flex items-center gap-[8px]"
          onClick={handleClose}
        >
          <HowItWorksIcon fontSize={20} className="text-gray400" />
          <span>{t("common.howItWorks")}</span>
        </Link>
        <Link
          href="/leaderboard/posts"
          className="p-[10px] text-gray400 text-sm font-medium flex items-center gap-[8px]"
          onClick={handleClose}
        >
          <CrownIcon fontSize={20} className="text-gray400 w-[20px]" />
          <span>{t("leaderboard.title")}</span>
        </Link> 
      </div>
    </MobileDrawer>
  );
};
