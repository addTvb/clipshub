"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "src/i18n/routing";
import { useCreateOfferStore } from "../../offers/create-offer/model/useCreateOfferStore";

export const AddOffer = () => {
  const t = useTranslations("business");
  const pathname = usePathname();
  const { clearStorage } = useCreateOfferStore();

  return (
    <Link
      href={`${pathname}/create-offer`}
      onClick={clearStorage}
      className="no-underline border border-dashed border-gray500 p-[12px] shadow-cardShadow rounded-[8px] group"
    >
      <span className="bg-[#E6EBF2] flex flex-col items-center gap-[8px] rounded-[6px] px-[12px] py-[46px] transition-colors group-hover:bg-gray300">
        <Image
          src="/static/icons/plus-gray.svg"
          alt=""
          width={32}
          height={32}
        />
        <span className="text-gray400 text-base font-medium">
          {t("makeOffer")}
        </span>
      </span>
    </Link>
  );
};
