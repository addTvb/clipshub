"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FileTypeForBusiness } from "src/types/offers";

interface IProps {
  offerFile?: FileTypeForBusiness;
}

export const OfferUploadedFiles = ({ offerFile }: IProps) => {
  const t = useTranslations("business");

  if (offerFile)
    return (
      <div className="rounded-[8px] flex flex-col gap-[16px] p-[24px] pt-[32px] bg-white h-fit">
        <div className="text-textColor text-lg sm:text-xl font-bold flex items-center gap-[8px]">
          <Image
            src="/static/icons/upload-file-gray.svg"
            alt=""
            width={20}
            height={20}
          />
          <span>{t("offer.uploadedFiles")}</span>
        </div>

        <div className="flex flex-wrap gap-[24px] items-center">
          <a
            href={offerFile?.link}
            download
            className="flex flex-col gap-[8px] items-center text-blue300 underline font-medium text-sm"
          >
            <Image
              src="/static/images/file-video-placeholder.svg"
              alt=""
              width={48}
              height={48}
            />
            <span className="truncate max-w-[150px]">{offerFile.name}</span>
          </a>
        </div>
      </div>
    );
};
