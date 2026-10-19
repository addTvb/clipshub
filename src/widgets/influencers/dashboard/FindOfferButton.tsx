import SearchIcon from "@icons/search.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";

interface IProps {
  mediaChannelId: number;
}

const FindOfferCard = ({ mediaChannelId }: IProps) => {
  const t = useTranslations("influencer.findOffer");

  return (
    <div className="w-full p-[12px] border-[1px] border-dashed border-gray500 rounded-[8px] h-[282px]">
      <Link
        href={{
          pathname: "/influencers/offers",
          query: { media_channel_id: mediaChannelId },
        }}
        className="relative w-full h-full bg-gray200 rounded-[6px] px-[46px] flex items-center lg:justify-start justify-center flex-col lg:flex-row lg:gap-[0px] gap-[16px] overflow-hidden"
      >
        <div className="lg:absolute top-1/2 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center flex flex-col items-center justify-center gap-[8px] text-gray400 text-[16px] font-semibold">
          <SearchIcon />
          {t("title")}
        </div>
        <div className="text-gray400 text-[14px] font-[500] max-w-[308px] lg:text-left text-center lg:m-0 mx-auto">
          {t("description")}
        </div>
        <Image
          className="h-full w-auto absolute right-0 translate-x-1/2 lg:opacity-100 opacity-30"
          src="/static/images/influencers-search-offer-button.webp"
          alt="sad"
          width={369}
          height={258}
        />
      </Link>
    </div>
  );
};

export default FindOfferCard;
