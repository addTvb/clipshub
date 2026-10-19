import { useTranslations } from "next-intl";
import { useOpenSortStore } from "./model/useOpenSortStore";
import { useFilterStore } from "../model/useFilterStore";
import { OfferSortType } from "src/api/influencers/offers";
import { sortOptions } from "./model/sort-options";
import Image from "next/image";
import { Modal } from "src/components/ui/dialog";

export const MobileFiltersSortBy = () => {
  const t = useTranslations("common");
  const { open, setOpen } = useOpenSortStore();
  const handleClose = () => setOpen(false);

  const { setFilters, sort, ...filters } = useFilterStore();
  const handleChangeSort = (value: string) => {
    setFilters({ ...filters, sort: value as OfferSortType });
    handleClose();
  };

  return (
    <Modal
      open={open}
      setIsOpen={setOpen}
      title={t("sortBy")}
      className="h-auto flex flex-col pb-[10px]"
      withCross
      mobileBreakpoint={700}
    >
      {sortOptions.map((option) => (
        <button
          className="p-[10px] w-full font-medium text-sm flex items-center justify-between gap-[12px]"
          onClick={() => handleChangeSort(option.value)}
          key={`mobile-sort-${option.value}`}
        >
          <span>{t(option.name)}</span>
          {sort === option.value && (
            <Image
              src="/static/icons/marker-green.svg"
              alt=""
              width={20}
              height={20}
            />
          )}
        </button>
      ))}
    </Modal>
  );
};
