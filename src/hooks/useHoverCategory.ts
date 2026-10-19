import { useState } from "react";
import { DictionaryType } from "src/types/category";

export const useHoverCategory = () => {
  const [hoveredCategory, setHoverItem] = useState<DictionaryType | null>(null);
  const handleHover = (category: DictionaryType) => setHoverItem(category);
  const handleUnHover = () => setHoverItem(null);

  return {
    hoveredCategory,
    handleHover,
    handleUnHover,
  };
};
