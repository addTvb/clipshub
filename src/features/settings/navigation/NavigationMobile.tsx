"use client";

import { Link, usePathname } from "src/i18n/routing";
import { useTranslations } from "next-intl";

const links = [
  { href: "/settings/profile", translationKey: "settings.navigation.profile.title" },
/*   { href: "#", translationKey: "settings.navigation.security.title" },
  { href: "#", translationKey: "settings.navigation.finance.title" },
  { href: "#", translationKey: "settings.navigation.businessProfile.title" },
  { href: "#", translationKey: "settings.navigation.transactionsHistory.title" }, */
];

const NavigationMobile = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div className="lg:hidden flex gap-[32px] text-[20px] font-bold  mb-[24px] w-full scroll-x overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    style={{ scrollbarWidth: "thin" }}>
      {links.map(({ href, translationKey }) => {
        const isActive = pathname.includes(href);
        return (
          <Link
            key={href}
            href={href}
            className={`${isActive ? "text-textColor" : "text-gray550"}`}
          >
            {t(translationKey)}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationMobile;
