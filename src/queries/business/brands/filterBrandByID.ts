import type { BrandType } from "src/types/brands";

export const filterBrandByID = (id?: number, brands?: BrandType[] | null) => {
  if (!Array.isArray(brands) || id === undefined) return undefined;

  return brands.find((item) => Number(item.id) === Number(id));
};
