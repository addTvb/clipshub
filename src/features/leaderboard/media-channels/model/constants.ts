/**
 * Высоты карточек пьедестала для разных мест
 */
export const PEDESTAL_HEIGHTS = {
  1: "md:h-[361px] h-[310px]",
  2: "md:h-[323px] h-[310px]",
  3: "md:h-[323px] h-[310px]",
} as const;

export type PedestalPlace = 1 | 2 | 3;

