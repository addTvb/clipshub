"use client";

import { Link, usePathname } from "src/i18n/routing";
import ArrowRightIcon from "@icons/arrow-2.svg";

interface SettingsNavigationItemProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SettingsNavigationItem = ({ href, title, description, icon }: SettingsNavigationItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href) ;

  return (
    <li>
      <Link
        href={href}
        className="w-full flex items-center gap-[20px] py-[16px] border-white200 border-solid border-b-[2px]"
      >
        <div className={`size-[36px] flex-shrink-0 flex items-center justify-center rounded-[10px] ${isActive ? 'bg-primary' : 'bg-white200'}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-black400 font-bold text-[16px]">{title}</div>
          <div className="font-[Inter] font-[500] text-[14px] text-gray400 truncate">
            {description}
          </div>
        </div>
        <ArrowRightIcon width={24} height={24} stroke="black"  className="ml-auto flex-shrink-0"/>
      </Link>
    </li>
  );
};

export default SettingsNavigationItem;
