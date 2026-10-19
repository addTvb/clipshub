import { UiLink } from "src/components/ui/link/link";
import { useTranslations } from "next-intl";
import ArrowLeftIcon from "@icons/long-arrow-left-icon.svg";
import { Avatar } from "src/features/auth/Avatar";
import { BrandType } from "src/types/brands";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface IProps {
  brand?: BrandType;
}

export const BrandOffersHeading = ({ brand }: IProps) => {
  const { id } = useParams();
  const t = useTranslations("influencer");
  const tCommon = useTranslations("common");

  const [brandData, setBrandData] = useState(() => ({
    name: brand?.title,
    avatar: brand?.logo_file?.link ?? "",
    description: brand?.description ?? "",
  }));

  useEffect(() => {
    if (brand) {
      setBrandData({
        name: brand.title,
        avatar: brand.logo_file?.link ?? "",
        description: brand.description ?? "",
      });
    }
  }, [brand]);

  return (
    <div className="flex flex-col gap-[6px]">
      <UiLink
        href="/influencers/offers"
        className="text-base font-bold text-textColor flex items-center gap-[6px] w-fit my-[11px]"
      >
        <ArrowLeftIcon className="text-[20px] text-textColor" />
        <span>{t("availableOffers")}</span>
      </UiLink>

      <div className="flex items-center gap-[20px]">
        <Avatar
          src={brandData?.avatar}
          alt=""
          width={100}
          height={100}
          userID={Number(id)}
          className="size-[100px] border-gray700"
        />

        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-textColor text-[40px] leading-[48px] font-bold ">
              {brandData?.name} {tCommon("offers")}
            </h1>
            {/* <CategoryBadge
              name="Category"
              iconPath="/static/icons/category-influencer.svg"
              className="border-none w-fit max-[1024px]:text-xs bg-[#E6EBF2!important]"
            /> */}
          </div>

          <p className="text-gray350 text-[13px] leading-[19px] font-medium">
            {brandData?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
