import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { FILTER_CONFIG } from "../../model/filter-config";
import { FilterItem, FilterItems } from "../../model/types";
import { useFilterStore } from "../../model/useFilterStore";

export const isLastItem = (index: number, arr: unknown[]) =>
  index + 1 < arr.length;

export const useFilterColumns = (filterItems: FilterItems) => {
  const filters = useFilterStore();

  const getSelectedItems = (key: string) => {
    if (key === "media_channel_type") {
      const value = filters.media_channel_type;
      return value
        ? filterItems[key]?.filter((item) => item.value === value) || []
        : [];
    }

    const value = filters[key as keyof typeof filters];
    if (!value || !Array.isArray(value)) return [];

    return filterItems[key]?.filter((item) => value.includes(item.value)) || [];
  };

  const handleFilterChange = (key: string) => (item: FilterItem) => {
    if (key === "media_channel_type") {
      const newValue =
        filters.media_channel_type === item.value
          ? "all"
          : (item.value as SocialPlatform);
      filters.setFilters({ page: 1, [key]: newValue });
      return;
    }

    const currentValues =
      (filters[key as keyof typeof filters] as string[]) || [];
    const newValues = currentValues.includes(item.value)
      ? currentValues.filter((v) => v !== item.value)
      : [...currentValues, item.value];

    // Для integration_types проверяем, что не удаляем последний элемент
    if (key === "integration_types" && newValues.length === 0) {
      return; // Не позволяем удалить последний integration_type
    }

    filters.setFilters({ page: 1, [key]: newValues });
  };

  const filterArr = Object.entries(FILTER_CONFIG);

  return { filterArr, getSelectedItems, handleFilterChange };
};
