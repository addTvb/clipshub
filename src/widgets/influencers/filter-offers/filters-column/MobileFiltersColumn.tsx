"use client";

import { useTranslations } from "next-intl";
import { useOpenMobileFilters } from "./model/useOpenMobileFilters";
import { FilterItems } from "../model/types";
import { isLastItem, useFilterColumns } from "./model/useFilterColumns";
import { Fragment } from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { Divider } from "src/components/ui/divider";
import { Button } from "src/components/ui/button/button";
import { Modal } from "src/components/ui/dialog";

interface IProps {
  filterItems: FilterItems;
}

export const MobileFiltersColumn = ({ filterItems }: IProps) => {
  const t = useTranslations("common");
  const { open, setOpen } = useOpenMobileFilters();
  const handleClose = () => setOpen(false);

  const { filterArr, getSelectedItems, handleFilterChange } =
    useFilterColumns(filterItems);

  return (
    <Modal
      open={open}
      setIsOpen={setOpen}
      title={t("filters")}
      className="space-y-[12px] h-[80vh]"
      withCross
      mobileBreakpoint={1024}
      renderFooter={() => (
        <Button onClick={handleClose} className="w-full">
          {t("apply")}
        </Button>
      )}
    >
      {filterArr.map(([filterKey, config], index) => (
        <Fragment key={`mobile-filter-${filterKey}`}>
          <CheckboxFilter
            title={config.title}
            iconPath={config.icon}
            allItems={filterItems[filterKey] || []}
            selected={getSelectedItems(filterKey)}
            setSelected={handleFilterChange(filterKey)}
            placeholder={config.placeholder}
            defaultOpen
          />
          {isLastItem(index, filterArr) && <Divider color="#DFE3EA" />}
        </Fragment>
      ))}
    </Modal>
  );
};
