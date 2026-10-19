import clsx from "clsx";
import { IconCheckbox } from "src/components/ui/icon-checkbox";
import type { DictionaryType } from "src/types/category";
import type { Translate } from "../../types";

type BusinessCategorySelectorProps = {
  t: Translate;
  categories?: DictionaryType[];
  hoveredCategory: DictionaryType | null;
  handleHover: (category: DictionaryType) => void;
  handleUnHover: () => void;
  categoryErrorKey?: string;
};

export const BusinessCategorySelector = ({
  t,
  categories,
  hoveredCategory,
  handleHover,
  handleUnHover,
  categoryErrorKey,
}: BusinessCategorySelectorProps) => (
  <div className="flex flex-col gap-[10px]">
    <h4 className="text-base font-bold">{t("business.businessCategory")}</h4>
    <div className="flex flex-wrap gap-[10px]">
      {categories?.map((category) => (
        <IconCheckbox
          key={category.id}
          name="selectedCategories"
          id={category.id}
          title={category.name}
          iconPath={category.icon}
          onHover={() => handleHover(category)}
          onHoverLeave={handleUnHover}
          selectionType="radio"
        />
      ))}
    </div>
    <div className="flex gap-[14px]">
      {categoryErrorKey && (
        <span className="text-sm text-red-500">{t(categoryErrorKey)}</span>
      )}
      <span
        className={clsx(
          "text-sm text-gray600 transition-opacity opacity-0 min-h-[20px]",
          hoveredCategory?.description && "opacity-100"
        )}
      >
        {hoveredCategory?.description || ""}
      </span>
    </div>
  </div>
);

