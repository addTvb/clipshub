import { useTranslations } from "next-intl";
import { BannerPreview } from "src/components/ui/banner-preview";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { FileType } from "src/types/base";

interface IProps {
  watermark: FileType;
}

export const WaterMark = ({ watermark }: IProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[10px]">
        <span className="flex items-center gap-[8px]">
          <Image
            src="/static/icons/download.svg"
            alt="download icon"
            width={20}
            height={20}
          />
          <span className="text-xl font-bold text-textColor">
            {t("common.downloadWatermark")}
          </span>
        </span>
        <span
          className="text-gray600 text-sm font-medium font-[Inter]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t.raw("common.watermarkDesc")),
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-[12px] w-[200px]">
        <BannerPreview
          bannerType={watermark?.type || "image"}
          bannerUrl={watermark?.link}
          bannerName={watermark?.name || "watermark.png"}
          previewUrl={watermark?.preview_file?.link}
          imageClassName="bg-black400 object-contain p-[10px]"
          className="w-[200px]"
        />

        <a
          href={watermark?.link}
          download={true}
          className="flex flex-col items-center duration-200 text-blue300 text-base font-medium mt-[8px] sm:mt-0 underline truncate hover:text-blue400 transition-color font-[Inter]"
        >
          {t("influencer.takeOfferForm.download")}
        </a>
      </div>
    </div>
  );
};
