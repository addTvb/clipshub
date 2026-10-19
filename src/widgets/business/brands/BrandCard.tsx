import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { CHImage } from "src/components/ui/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import TrashIcon from "@icons/trash-red.svg";
import EditIcon from "@icons/edit.svg";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatDate } from "src/lib/date/formatDate";
import { BrandType } from "src/types/brands";
import { useDeleteBrand } from "src/queries/business/brands/useDeleteBrand";
import { useBrandModalState } from "./model/useBrandModalState";

interface IProps {
  brand: BrandType;
}

export const BrandCard = ({ brand }: IProps) => {
  const t = useTranslations("common");
  const tBusiness = useTranslations("business");

  const { setOpenEditModal, setEditBrandID } = useBrandModalState();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { deleteBrandLoading, deleteBrandMutate } = useDeleteBrand();

  const handleOpenMoreOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMoreOptions(!showMoreOptions);
  };
  const handleEditBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenEditModal(true);
    if (brand.id) setEditBrandID(brand.id);
  };
  const handleDeleteBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (brand.id) deleteBrandMutate(brand.id);
  };
  

  return (
    <div className="flex flex-col h-full gap-[18px] p-[24px] rounded-[12px] shadow-imageShadow bg-white">
      <div className="flex items-center justify-between gap-[12px]">
        <div className="flex items-center gap-[16px]">
          <CHImage
            width={48}
            height={48}
            src={brand?.logo_file?.link}
            alt={brand?.logo_file?.name}
            imagePlaceholder
            className="rounded-full w-[48px] h-[48px] border border-gray700"
          />
          <span className="text-xl font-bold leading-[26px] truncate text-textColor">
            {brand?.title}
          </span>
        </div>

        <Popover open={showMoreOptions} onOpenChange={setShowMoreOptions}>
          <PopoverTrigger
            className="p-[12px] rounded-[6px] bg-white active:scale-95 transition-[background-color, transform] duration-300 border border-gray300"
            onClick={handleOpenMoreOptions}
          >
            <Image
              src="/static/icons/three-dots-black.svg"
              alt="More"
              width={20}
              height={20}
            />
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="flex flex-col gap-[6px] p-[10px] text-gray400 font-medium text-sm w-fit min-w-[140px]"
          >
            <Button
              variant="text"
              className="text-sm font-medium justify-start p-[6px]"
              onClick={handleEditBrand}
            >
              <EditIcon />
              {t("change")}
            </Button>
            <Button
              variant="text"
              className="text-red-500 text-sm font-medium justify-start p-[6px]"
              onClick={handleDeleteBrand}
              loading={deleteBrandLoading}
            >
              <TrashIcon />
              {t("delete")}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {brand?.description ? (
        <div className="text-gray400 text-sm font-medium leading-[20px] font-[Inter] line-clamp-2">
          {brand?.description}
        </div>
      ) : (
        <div className="flex flex-col gap-[2px] font-[Inter]">
          <div className="text-gray350 uppercase font-semibold leading-[16px] text-[10px] tracking-[0.7px]">
            {tBusiness("creationDate")}
          </div>
          <div className="text-textColor font-semibold text-[13px] leading-[19px]">
            {formatDate(brand?.created_at || "-")}
          </div>
        </div>
      )}
    </div>
  );
};
