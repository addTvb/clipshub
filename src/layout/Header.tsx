"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { UiLink } from "src/components/ui/link/link";
import { useEffect, useState } from "react";
import { headerID } from "src/config/app";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isClipper = pathname.includes("/clipper");
  const isBusiness = pathname.includes("/business") || pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id={headerID}
      className={clsx(
        "sticky top-0 left-0 w-full flex px-[10px] pl-[16px] py-[6px] min-[870px]:px-[38px] items-center justify-between z-[51] transition-all duration-200 ease-in-out bg-white shadow-cardShadow",
        isScrolled ? "sm:py-[6px]" : "sm:py-[18px]"
      )}
    >
      <nav className="flex gap-[20px] sm:gap-[30px] min-[950px]:gap-[42px] items-center">
        <Link href="/business" className="flex items-center gap-2">
          <Image
            src="/static/icons/clipshub-beta.svg"
            alt="ClipsHub"
            width={113}
            height={33}
            className="hidden sm:block"
          />
          <Image
            src="/static/icons/clipshub-beta-mobile.svg"
            alt="ClipsHub"
            width={32}
            height={32}
            className="sm:hidden"
          />
        </Link>
        <UiLink
          href="/business"
          underlineColor="dark"
          className={clsx(
            "font-medium leading-relaxed transition-all text-textColor",
            isScrolled ? "text-sm" : "text-base",
            isBusiness && !isClipper && "underline"
          )}
        >
          {t("footer.forBusiness")}
        </UiLink>
        <UiLink
          href="/clipper"
          underlineColor="dark"
          className={clsx(
            "font-medium leading-relaxed transition-all text-textColor",
            isScrolled ? "text-sm" : "text-base",
            isClipper && "underline"
          )}
        >
          {t("footer.iAmClipper")}
        </UiLink>
      </nav>
    </div>
  );
};
