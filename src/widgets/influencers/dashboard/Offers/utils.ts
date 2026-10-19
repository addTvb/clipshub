import { PostStatusType } from "src/types/posts";
import {
  TAB_TO_STATUS_MAP,
  STATUS_TO_TAB_MAP,
  TabValue,
  DEFAULT_STATUS,
  ALL_STATUSES,
  ALL_TABS,
  DEFAULT_TAB,
} from "./constants";

/**
 * Преобразует хеш (может быть табом или статусом) в статус API
 */
export const getStatusFromHash = (hash: string | null | undefined): PostStatusType => {
  if (!hash) return DEFAULT_STATUS;

  // Если хеш является валидным табом, преобразуем его в статус
  if (hash in TAB_TO_STATUS_MAP) {
    return TAB_TO_STATUS_MAP[hash as TabValue];
  }

  // Если хеш является валидным статусом, возвращаем его
  if (ALL_STATUSES.includes(hash as PostStatusType)) {
    return hash as PostStatusType;
  }

  return DEFAULT_STATUS;
};

/**
 * Преобразует статус API в таб UI
 */
export const getTabFromStatus = (status: PostStatusType): TabValue => {
  return STATUS_TO_TAB_MAP[status] || DEFAULT_TAB;
};

/**
 * Проверяет, является ли хеш валидным (табом или статусом)
 */
export const isValidHash = (hash: string | null | undefined): boolean => {
  if (!hash) return false;
  return ALL_TABS.includes(hash as TabValue) || ALL_STATUSES.includes(hash as PostStatusType);
};

