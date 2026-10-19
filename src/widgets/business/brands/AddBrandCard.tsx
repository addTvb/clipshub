import { useTranslations } from "next-intl";
import PlusIcon from "@icons/plus-icon.svg";
import { useBrandModalState } from "./model/useBrandModalState";

export const AddBrandCard = () => {
  const t = useTranslations("business.brand");

  const { setOpen } = useBrandModalState();
  const handleOpen = () => setOpen(true);
  
  return (
    <div className="flex flex-col h-full gap-[16px] p-[24px] rounded-[12px] shadow-cardShadow bg-white cursor-pointer">
      <div className="text-textColor text-base font-bold leading-[22px]">
        {t("createABrand")}
      </div>
      <button
        className="h-full min-h-[88px] w-full py-[20px] flex flex-col gap-[4px] rounded-[6px] bg-white50 items-center font-[Inter] text-gray400 font-semibold text-sm leading-[20px] justify-center hover:bg-white200 transition-colors"
        onClick={handleOpen}
      >
        <PlusIcon className="size-[24px]" />
        <span>{t("createBrand")}</span>
      </button>
    </div>
  );
};
