"use client";

import { useTranslations } from "next-intl";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { OfferStatusBadge } from "src/features/business/offers/OfferStatusBadge";
import { AdOfferDetailForBusiness } from "src/types/offers";

interface IProps {
  offerDetail: AdOfferDetailForBusiness;
}

export const OfferHeader = ({ offerDetail }: IProps) => {
  const t = useTranslations("common");

  // const handlePrint = () => window.print();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[14px]">
        <h1 className="m-0 text-[28px] max-w-[200px] truncate sm:max-w-[300px] lg:max-w-[500px] lg:text-[40px] font-bold">
          {offerDetail.ad_offer.name}
        </h1>
        <OfferStatusBadge status={offerDetail.ad_offer.status} />
      </div>

      <div className="flex gap-[12px] items-center">
        {/* <Button
          variant="outline"
          onClick={handplePrint}
          icon={
            <Image
              src="/static/icons/print-black.svg"
              alt=""
              width={20}
              height={20}
            />
          }
        >
          <span>{t("print")}</span>
        </Button> */}
        {/* TODO change to reusable component created by Alexander */}
        <Popover>
          <PopoverTrigger>
            <Image
              src="/static/icons/three-dots.svg"
              alt="More"
              width={24}
              height={24}
            />
          </PopoverTrigger>
          <PopoverContent className="p-[6px] max-w-[150px] ">
            <Button
              variant="text"
              className="w-full justify-start p-[6px]"
              icon={
                <Image
                  src="/static/icons/trash-red.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              }
            >
              <span>{t('delete')}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
