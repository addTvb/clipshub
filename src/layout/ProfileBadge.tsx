"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useAuthStore } from "src/store/auth";
import { useGetUser } from "src/queries/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateOfferStore } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { Avatar } from "src/features/auth/Avatar";
import { profileMenu } from "./model/profile-menu-content";
import { ProfileMenuItem } from "./ProfileMenuItem";
import { Divider } from "src/components/ui/divider";
import { HeaderLangSelect } from "src/features/lang/HeaderLangSelect";

export const ProfileBadge = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  const { clearStorage } = useCreateOfferStore();

  const handleLogout = () => {
    logout();
    push("/auth/login");
    queryClient.clear();
    clearStorage();
  };

  return (
    <div className="relative h-[42px] hidden md:block">
      <Popover>
        <PopoverTrigger className="absolute top-[-3px] left-[-48px] transition-all duration-300 rounded-full hover:shadow-inputShadow hover:border-blue100 data-[state=open]:shadow-inputShadowActive data-[state=open]:border-blue100">
          <Avatar src={user?.icon?.link} userID={user?.id} />
        </PopoverTrigger>
        <PopoverContent
          className="mt-[10px] p-[10px] max-w-[336px] w-full flex flex-col gap-[6px]"
          align="end"
        >
          {profileMenu.map((menuItem) => (
            <ProfileMenuItem
              iconPath={menuItem.icon}
              text={t(menuItem.title)}
              href={menuItem?.href}
              onClick={handleLogout}
              key={`desktop-profile-${menuItem.title}`}
            />
          ))}
          
          <Divider color="#DFE3EA" />

          <HeaderLangSelect />
        </PopoverContent>
      </Popover>
    </div>
  );
};
