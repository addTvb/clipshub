import HelpIcon from "@public/static/icons/help-icon.svg";
import LinkIcon from "@public/static/icons/link-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HowItWorksBanner() {
  const t = useTranslations("influencer.howItWorks.banner");

  return (
    <Link href="/clipper/how-it-works" target="_blank">
      <div className="w-full h-[98px] rounded-[12px] overflow-hidden relative bg-[#010070] ">
        {/* <video
          src="/static/images/how-it-works/banner/bg.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        /> */}
        <Image
          src="/static/images/how-it-works/banner/bg.png"
          alt=""  
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          fill
        />
        <div className="relative flex justify-between items-center w-full h-[56px] px-5 mt-2 z-[5] ">
          <div className="flex items-center gap-3 text-white text-[14px] font-bold font-[Manrope]">
            <HelpIcon className="w-5 h-5 text-white" />
            {t("title")}
          </div>
          <div className="relative">
            <Image
              src="/static/images/how-it-works/banner/video-preview.webp"
              alt="How it Works"
              width={72}
              height={40}
              className="w-[72px] h-[40px] object-cover relative z-[5]"
            />
            <Image
              src="/static/images/how-it-works/banner/screenshot.webp"
              alt="How it Works"
              width={78}
              height={51}
              className="rounded-[6px] w-[78px] h-[51px] object-cover absolute right-[30px] top-[7px] z-0"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-white text-[12px] font-bold font-[Manrope] w-full h-[34px] absolute left-0 bottom-0 z-10 bg-white/20 backdrop-blur-[9.65px]">
          {t("description")}
          <LinkIcon className="w-3 h-3 text-white" />
        </div>
      </div>
    </Link>
  );
}
