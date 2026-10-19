import { useMemo, useCallback, useEffect } from "react";
import { PostStatusType } from "src/types/posts";
import { TabValue, DEFAULT_STATUS } from "../constants";
import { getStatusFromHash, getTabFromStatus, isValidHash } from "../utils";
import { useHash } from "src/hooks/useHash";
import { usePageSync } from "./usePageSync";
import { useFilterStore } from "src/widgets/influencers/filter-offers/model/useFilterStore";

interface UseOfferTabsResult {
  currentStatus: PostStatusType;
  activeTab: TabValue;
  hash: string;
  handleTabChange: (tab: TabValue) => void;
}

/**
 * Хук для управления табами офферов
 * Обрабатывает синхронизацию между хешем URL, табами UI и статусами API
 */
export const useOfferTabs = (): UseOfferTabsResult => {
  const [hash, setHashOriginal] = useHash();
  const { setFilters } = useFilterStore();
  const { setHash: setHashWithSync } = usePageSync({ hash, setHashOriginal });

  const currentStatus = useMemo(() => getStatusFromHash(hash || ""), [hash]);
  const activeTab = useMemo(
    () => getTabFromStatus(currentStatus),
    [currentStatus]
  );

  // Устанавливаем дефолтный хеш только если хеш отсутствует или не валиден
  useEffect(() => {
    if (!hash || !isValidHash(hash)) {
      setHashWithSync(DEFAULT_STATUS);
    }
  }, [hash, setHashWithSync]);

  const handleTabChange = useCallback(
    (tab: TabValue) => {
      const newStatus = getStatusFromHash(tab);
      setHashWithSync(newStatus);
      setFilters({ page: 1 });
    },
    [setHashWithSync, setFilters]
  );

  return {
    currentStatus,
    activeTab,
    hash: hash || "",
    handleTabChange,
  };
};
