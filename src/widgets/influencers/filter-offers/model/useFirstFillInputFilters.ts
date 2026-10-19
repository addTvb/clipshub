import { useEffect } from "react";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { FilterItems } from "./types";

interface IParams {
  filterItems: FilterItems;
  setFilterItems: React.Dispatch<React.SetStateAction<FilterItems>>;
}

export const useFirstFillInputFilters = ({ setFilterItems }: IParams) => {
  const { businessCategories } = useBusinessCategory();
  const { languages } = useLanguagesDictionary();
  const { mediaChannelCategories } = useMediaChannelCategory();

  useEffect(() => {
    const update = async () => {
      const updates: Partial<FilterItems> = {};

      if (businessCategories) {
        updates.business_category_ids = businessCategories.map((category) => ({
          key: "business_category_ids",
          title: category.name,
          value: String(category.id),
        }));
      }

      if (languages) {
        updates.language_ids = languages.map((lang) => ({
          key: "language_ids",
          title: lang.name,
          value: String(lang.id),
        }));
      }

      if (mediaChannelCategories) {
        updates.media_channel_category_ids = mediaChannelCategories.map(
          (category) => ({
            key: "media_channel_category_ids",
            title: category.name,
            value: String(category.id),
          })
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFilterItems((prev: any) => ({
        ...prev,
        ...updates,
      }));
    };

    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessCategories, languages, mediaChannelCategories]);

  return {
    isLoading: !businessCategories || !languages || !mediaChannelCategories,
  };
};
