import { useTranslations } from "next-intl";
import { BusinessDashboardTabs } from "src/widgets/business/dashboard/BusinessDashboardTabs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("business");
  return (
    <div className="flex flex-col gap-[24px] max-w-screenMaxWidth mx-auto w-full py-[28px] px-[10px] lg:gap-[32px] lg:py-[74px]">
      <h1 className="text-textColor flex items-center gap-[10px] font-bold text-[28px] lg:text-[40px] ">
        {t("dashboard")}
      </h1>

      <BusinessDashboardTabs />

      {children}
    </div>
  );
}
