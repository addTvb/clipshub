import Image from "next/image";
import { useOpenMobileFilters } from "./filters-column/model/useOpenMobileFilters";
import { useOpenSortStore } from "./sort/model/useOpenSortStore";
import { useTranslations } from "next-intl";

export const MobileFiltersTrigger = () => {
  const t = useTranslations("common");

  const { setOpen: setOpenSort } = useOpenSortStore();
  const { setOpen: setOpenFilters } = useOpenMobileFilters();

  const handleOpenMobileSort = () => setOpenSort(true);
  const handleOpenMobileFilters = () => setOpenFilters(true);

  return (
    <div className="flex gap-[10px] sm:hidden">
      <button
        className="p-[6px] flex items-center gap-[6px] rounded-[8px] bg-white200 text-textColor text-xs font-semibold transition-transform active:scale-90"
        onClick={handleOpenMobileFilters}
      >
        <Image
          src="/static/icons/filters-gray.svg"
          alt=""
          width={16}
          height={16}
        />
        <span>{t("filters")}</span>
      </button>
      <button
        className="p-[6px] flex items-center gap-[6px] rounded-[8px] bg-white200 text-textColor text-xs font-semibold transition-transform active:scale-90"
        onClick={handleOpenMobileSort}
      >
        <Image
          src="/static/icons/sort-gray-thin.svg"
          alt=""
          width={16}
          height={16}
        />
        <span>{t("sortBy")}</span>
      </button>
    </div>
  );
};
