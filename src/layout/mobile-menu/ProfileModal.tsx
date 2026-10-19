"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuthStore } from "src/store/auth";
import { useCreateOfferStore } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { useRouter } from "src/i18n/routing";
import { profileMenu } from "../model/profile-menu-content";
import { ProfileMenuItem } from "../ProfileMenuItem";
import { Divider } from "src/components/ui/divider";
import { MobileLangSelect } from "src/features/lang/MobileLangSelect";
import MobileDrawer from "src/components/ui/mobile-drawer";

interface IProps {
  open: boolean;
  onClose: () => void;
  bottomOffset: number;
}

export const ProfileModal = ({ open, onClose, bottomOffset }: IProps) => {
  const t = useTranslations();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { clearStorage } = useCreateOfferStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    push("/auth/login");
    queryClient.clear();
    clearStorage();
    onClose();
  };

  return (
    <MobileDrawer
      open={open}
      onClose={onClose}
      title={t("settings.profile.title")}
      bottomOffset={bottomOffset}
      className="py-[14px] px-[16px] bg-white"
      zIndex={50}
    >
      <div className="bg-white flex flex-col gap-[10px]">
        <div>
          {profileMenu.map((menuItem) => (
            <ProfileMenuItem
              iconPath={menuItem.icon}
              text={t(menuItem.title)}
              href={menuItem?.href}
              onClick={handleLogout}
              onEveryClick={onClose}
              key={`desktop-profile-${menuItem.title}`}
            />
          ))}
        </div>

        <Divider color="#DFE3EA" />

        <MobileLangSelect />
      </div>
    </MobileDrawer>
  );
};
