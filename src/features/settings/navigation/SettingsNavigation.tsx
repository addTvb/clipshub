"use client";

import UserIcon from "@icons/user-icon.svg";
import { useTranslations } from "next-intl";

import SettingsNavigationItem from "./NavigationItem";
import SupportButton from "./SupportButton";

const SettingsNavigation = () => {
  const t = useTranslations();

  return (
    <div className="p-[24px] bg-white rounded-[12px] shadow-cardShadow lg:flex flex-col hidden w-[345px]">
      <ul>
        <SettingsNavigationItem
          href="/settings/profile"
          title={t("settings.navigation.profile.title")}
          description={t("settings.navigation.profile.description")}
          icon={<UserIcon fontSize={24} color="white" />}
        />
        {/*      <SettingsNavigationItem 
          href="#" 
          title={t("settings.navigation.security.title")} 
          description={t("settings.navigation.security.description")} 
          icon={<UserIcon width={24} height={24} stroke="white" />} 
        />
        <SettingsNavigationItem 
          href="#" 
          title={t("settings.navigation.finance.title")} 
          description={t("settings.navigation.finance.description")} 
          icon={<WalletIcon width={24} height={24} stroke="white" />} 
        />
        <SettingsNavigationItem 
          href="#" 
          title={t("settings.navigation.businessProfile.title")} 
          description={t("settings.navigation.businessProfile.description")} 
          icon={<CompanyIcon width={24} height={24} stroke="white" />} 
        />
        <SettingsNavigationItem 
          href="#" 
          title={t("settings.navigation.transactionsHistory.title")} 
          description={t("settings.navigation.transactionsHistory.description")} 
          icon={<HistoryIcon width={24} height={24} stroke="white" />} 
        /> */}
      </ul>
      <SupportButton />
    </div>
  );
};

export default SettingsNavigation;
