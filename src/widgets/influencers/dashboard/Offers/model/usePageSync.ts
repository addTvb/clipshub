"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "src/widgets/influencers/filter-offers/model/useFilterStore";

interface UsePageSyncOptions {
  hash: string;
  setHashOriginal: (hash: string) => void;
}

/**
 * Хук для синхронизации параметра page с URL
 * Сохраняет hash при изменении page и сохраняет page при изменении hash
 */
export const usePageSync = ({ hash, setHashOriginal }: UsePageSyncOptions) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, setFilters } = useFilterStore();
  const [isPageInitialized, setIsPageInitialized] = useState(false);

  // Кастомная функция для установки hash с сохранением query параметров
  const setHash = useCallback(
    (newHash: string) => {
      const hashWithoutHash = newHash.startsWith("#")
        ? newHash.slice(1)
        : newHash;

      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Сохраняем page если он не равен 1
      if (page && page !== 1) {
        newSearchParams.set("page", page.toString());
      }

      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}#${hashWithoutHash}`
        : `${pathname}#${hashWithoutHash}`;

      router.replace(newUrl, { scroll: false });
      setHashOriginal(newHash);
    },
    [pathname, router, searchParams, page, setHashOriginal]
  );

  // Инициализация page из URL при монтировании
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (pageNumber > 0 && pageNumber !== page) {
        setFilters({ page: pageNumber });
      }
    }
    setIsPageInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Синхронизация изменений page с URL (сохраняя hash)
  useEffect(() => {
    if (!isPageInitialized) return;

    const currentPageParam = searchParams.get("page");
    const currentPageNumber = currentPageParam
      ? parseInt(currentPageParam, 10)
      : 1;

    // Обновляем URL только если page изменился
    if (page !== currentPageNumber) {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        // Удаляем page=1 из URL для чистоты
        newSearchParams.delete("page");
      } else if (page) {
        newSearchParams.set("page", page.toString());
      }

      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}${hash ? `#${hash}` : ""}`
        : `${pathname}${hash ? `#${hash}` : ""}`;

      router.replace(newUrl, { scroll: false });
    }
  }, [page, isPageInitialized, pathname, router, searchParams, hash]);

  return { setHash };
};

