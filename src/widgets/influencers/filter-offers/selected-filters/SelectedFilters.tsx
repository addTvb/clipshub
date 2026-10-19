"use client";

import { memo, useMemo } from "react";
import { SelectedFilterItem } from "./SelectedFilterItem";
import { useFilterStore } from "../model/useFilterStore";
import { FILTER_CONFIG } from "../model/filter-config";
import { useTranslations } from "next-intl";
import { FilterItem, FilterItems } from "../model/types";

interface IProps {
  filterItems: FilterItems;
}

export const SelectedFilters = memo<IProps>(({ filterItems }) => {
  const t = useTranslations();
  const filters = useFilterStore();
  // const { reset } = useFilterParams();

  const selectedFilters = useMemo(() => {
    const result: Array<{ key: string; item: FilterItem }> = [];

    if (filters.media_channel_type) {
      const platform = filterItems.media_channel_type?.find(
        (p) => p.value === filters.media_channel_type
      );
      if (platform) {
        result.push({
          key: "media_channel_type",
          item: platform,
        });
      }
    }

    Object.keys(FILTER_CONFIG).forEach((filterKey) => {
      const currentValues = filters[filterKey as keyof typeof filters];
      if (Array.isArray(currentValues)) {
        currentValues.forEach((value) => {
          const filterItem = filterItems[filterKey]?.find(
            (item) => item.value === value
          );
          if (filterItem) {
            result.push({
              key: filterKey,
              item: filterItem,
            });
          }
        });
      }
    });

    return result;
  }, [filterItems, filters]);

  const handleRemoveFilter = (filterKey: string, value: string) => {
    if (filterKey === "media_channel_type") {
      filters.setFilters({ media_channel_type: "all" });
      return;
    }

    const currentValues = filters[
      filterKey as keyof typeof filters
    ] as string[];
    const newValues = currentValues.filter((v) => v !== value);

    // Для integration_types не позволяем удалить последний элемент
    if (filterKey === "integration_types" && newValues.length === 0) {
      return;
    }

    filters.setFilters({
      [filterKey]: newValues.length > 0 ? newValues : undefined,
    });
  };

  const handleResetAll = () => {
    const resetFilters = Object.keys(FILTER_CONFIG).reduce((acc, key) => {
      // Не сбрасываем integration_types
      if (key !== "integration_types") {
        acc[key] = undefined;
      }
      return acc;
    }, {} as Record<string, undefined>);

    filters.setFilters({
      ...resetFilters,
      media_channel_id: "all",
      media_channel_type: "all",
    });
  };

  if (selectedFilters.length === 0) return <span></span>;

  return (
    <div className="flex flex-wrap gap-[8px]">
      {selectedFilters.map(({ key, item }) => (
        <SelectedFilterItem
          key={`${key}-${item.value}`}
          title={item.title}
          onRemove={() => handleRemoveFilter(key, item.value)}
        />
      ))}
      <button
        onClick={handleResetAll}
        className="p-[6px] pl-[12px] pr-[10px] rounded-[8px] bg-white200 flex items-center gap-[6px] text-textColor text-sm font-semibold transition-colors hover:bg-textColor hover:text-white200"
      >
        {t("common.resetAll")}
      </button>
    </div>
  );
});
SelectedFilters.displayName = "SelectedFilters";
