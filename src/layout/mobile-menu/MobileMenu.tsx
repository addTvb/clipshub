"use client";

import { useTranslations } from "next-intl";
import { useAuthStore } from "src/store/auth";
import { MenuModal } from "./MenuModal";
import { ProfileModal } from "./ProfileModal";
import ClipperIcon from "@icons/influencer-icon.svg";
import CompanyIcon from "@icons/company-icon.svg";
import HomeIcon from "@icons/home-icon.svg";
import ToDoIcon from "@icons/to-do-icon.svg";
import { MenuButton } from "./MenuButton";
import { usePathname } from "next/navigation";
import NotificationIcon from "@icons/notification-icon.svg";
import { NotificationDrawer } from "src/features/notification/NotificationDrawer";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import BurgerIcon from "@icons/burger-icon.svg";
import clsx from "clsx";
import { useGetUser } from "src/queries/useGetUser";
import { Avatar } from "src/features/auth/Avatar";
import UserIcon from "@icons/user-icon.svg";
import { useNotificationsCount } from "src/hooks/useNotifications";

type ModalType = "menu" | "notification" | "profile" | false;

export const MobileMenu = () => {
  const t = useTranslations();
  const { isAuthenticated } = useAuthStore();

  const pathname = usePathname();
  const isOnClipper = pathname.endsWith("/clipper");
  const isOnBusiness = pathname.endsWith("/business");
  const isOnOffers = pathname.endsWith("/offers");
  const isOnDashboard =
    pathname.endsWith("/influencers") ||
    pathname.endsWith("/business/campaigns");

  const menuRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const [showModal, setShowModal] = useState<ModalType>(false);
  const handleClose = () => setShowModal(false);

  const toggleModal = (modalName: ModalType) => {
    if (showModal === modalName) setShowModal(false);
    else setShowModal(modalName);
  };

  const { unreadCount } = useNotificationsCount();

  const isOnLogin = pathname.includes("/auth/login");
  const { user } = useGetUser();

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <>
      {width < 768 && (
        <NotificationDrawer
          open={showModal === "notification"}
          onClose={handleClose}
          bottomOffset={menuRef.current?.offsetHeight || 56}
        />
      )}
      <MenuModal
        open={showModal === "menu"}
        onClose={handleClose}
        bottomOffset={menuRef.current?.offsetHeight || 56}
      />
      <ProfileModal
        open={showModal === "profile"}
        onClose={handleClose}
        bottomOffset={menuRef.current?.offsetHeight || 56}
      />

      <div className="sticky bottom-0 left-0 z-[50]">
        <div
          ref={menuRef}
          className={clsx(
            "bg-white w-full border-t border-gray300 md:hidden",
            isAuthenticated ? "grid grid-cols-5" : "grid grid-cols-5"
          )}
        >
          <MenuButton
            onClick={() => toggleModal("menu")}
            IconComponent={BurgerIcon}
          >
            {t("common.menu")}
          </MenuButton>
          {isAuthenticated ? (
            <MenuButton
              href="/"
              IconComponent={HomeIcon}
              isActive={isOnDashboard}
              onClick={handleClose}
            >
              {t("influencer.dashboard")}
            </MenuButton>
          ) : (
            <MenuButton
              href="/clipper"
              IconComponent={ClipperIcon}
              isActive={isOnClipper}
              onClick={handleClose}
            >
              {t("footer.iAmClipper")}
            </MenuButton>
          )}
          {!isAuthenticated && (
            <MenuButton
              IconComponent={CompanyIcon}
              href="/business"
              isActive={isOnBusiness}
              onClick={handleClose}
            >
              {t("footer.forBusiness")}
            </MenuButton>
          )}
          <MenuButton
            href="/offers"
            IconComponent={ToDoIcon}
            isActive={isOnOffers}
            onClick={handleClose}
          >
            {t("common.offers")}
          </MenuButton>
          {isAuthenticated && (
            <MenuButton
              className="stroke-[#3188AA] [&_svg]:size-[20px] relative"
              IconComponent={NotificationIcon}
              isActive={false}
              onClick={() => toggleModal("notification")}
            >
              {t("notification.activity")}
              {unreadCount > 0 && (
                <span className="text-white text-[11px] leading-[14px] font-bold rounded-[5px] bg-dark100 px-[3px] flex items-center justify-center absolute top-[5px] left-[50%]">
                  {unreadCount}
                </span>
              )}
            </MenuButton>
          )}

          {isAuthenticated ? (
            <MenuButton onClick={() => toggleModal("profile")}>
              <Avatar
                src={user?.icon?.link}
                userID={user?.id}
                width={36}
                height={36}
              />
            </MenuButton>
          ) : (
            <MenuButton
              href="/auth/login"
              IconComponent={UserIcon}
              isActive={isOnLogin}
              onClick={handleClose}
            >
              {t("common.login")}
            </MenuButton>
          )}
        </div>
      </div>
    </>
  );
};
