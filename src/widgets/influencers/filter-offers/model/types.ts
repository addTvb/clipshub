export interface FilterItem {
  key: string;
  title: string;
  value: string;
}
export type FilterItems = {
  [key: string]: FilterItem[];
};
export const PLATFORMS = ["tiktok", "instagram", "youtube"] as const;
