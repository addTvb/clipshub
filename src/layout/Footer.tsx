"use client";

import React from "react";
import { Link } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { UiLink } from "src/components/ui/link/link";
import { FooterLangSelect } from "src/features/lang/FooterLangSelect";

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className="bg-[#222936] text-white md:py-16 p-8 mt-auto">
      <div className="container mx-auto md:px-4">
        <div className="w-full flex flex-wrap justify-between gap-12">
          <div className="flex flex-col gap-4 md:w-auto w-full order-last md:order-1">
            <Image
              src="/static/icons/logo-white.svg"
              alt="logo"
              width={116}
              height={20}
            />
          </div>

          <div className="flex flex-col gap-6 order-3">
            <h4 className="text-light-blue font-bold text-gray550">
              {t("footer.forInfluencers")}
            </h4>
            <div className="flex flex-col gap-3">
              <UiLink
                href="/clipper"
                className="text-white font-medium text-sm w-fit"
                underlineColor="light"
              >
                {t("footer.about")}
              </UiLink>
            </div>
          </div>

          <div className="flex flex-col gap-6 order-4">
            <h4 className="text-light-blue font-bold text-gray550">
              {t("footer.forBusiness")}
            </h4>
            <div className="flex flex-col gap-3">
              <UiLink
                href="/business"
                className="text-white font-medium text-sm w-fit"
                underlineColor="light"
              >
                {t("footer.about")}
              </UiLink>
            </div>
          </div>

          <div className="flex flex-col md:gap-[24px] order-first md:order-6 w-full md:w-auto items-start md:items-end">
            <div className="flex md:flex-row flex-col items-center gap-[26px] w-full md:w-auto">
              <Link
                href="/clipper"
                className="text-textColor text-base font-bold leading-relaxed px-[12px] py-[8px] bg-white rounded-md justify-center items-center inline-flex min-w-max transition-colors hover:bg-gray300"
              >
                {t("footer.iAmClipper")}
              </Link>
              <FooterLangSelect />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
