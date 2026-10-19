"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "src/i18n/routing";
import { useAllBrands } from "src/queries/business/brands/useAllBrands";
import { useCampaignsQuery } from "src/queries/business/useCampaignsQuery";

const isActiveTab = (pathname: string, href: string) => pathname.includes(href);

export const BusinessDashboardTabs = () => {
  const t = useTranslations("business");
  const pathname = usePathname();

  const { campaigns } = useCampaignsQuery();
  const { brands } = useAllBrands();

  const TABS: { href: string; label: string; count?: number }[] = [
    {
      href: "/business/campaigns",
      label: "campaigns",
      count: campaigns?.list?.length,
    },
    { href: "/business/brands", label: "brand.brands", count: brands?.length },
  ];

  return (
    <div className="flex items-center gap-[32px]">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={clsx(
            "flex items-center gap-[6px] font-bold",
            isActiveTab(pathname, tab.href) ? "text-textColor" : "text-gray550"
          )}
        >
          <span className="text-xl">{t(tab.label)}</span>
          <span className="text-xs text-black400 rounded-[6px] bg-gray300 px-[4px]">
            {tab?.count || '0'}
          </span>
        </Link>
      ))}
    </div>
  );
};
