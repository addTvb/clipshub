"use client";

import { Fragment, memo } from "react";
import { Divider } from "src/components/ui/divider";
import { CheckboxFilter } from "./CheckboxFilter";
import { FilterItems } from "../model/types";
import { isLastItem, useFilterColumns } from "./model/useFilterColumns";

interface IProps {
  filterItems: FilterItems;
}

export const FiltersColumn = memo<IProps>(({ filterItems }) => {
  const { filterArr, getSelectedItems, handleFilterChange } =
    useFilterColumns(filterItems);

  return (
    <div className="space-y-[12px] bg-white rounded-[12px] p-[12px] h-fit">
      {filterArr.map(([filterKey, config], index) => (
        <Fragment key={filterKey}>
          <CheckboxFilter
            title={config.title}
            iconPath={config.icon}
            allItems={filterItems[filterKey] || []}
            selected={getSelectedItems(filterKey)}
            setSelected={handleFilterChange(filterKey)}
            placeholder={config.placeholder}
          />
          {isLastItem(index, filterArr) && <Divider color="#DFE3EA" />}
        </Fragment>
      ))}
    </div>
  );
});
FiltersColumn.displayName = "FiltersColumn";
