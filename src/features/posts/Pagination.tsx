"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";
import { PaginationType } from "src/types/base";
import { useFilterStore } from "src/widgets/influencers/filter-offers/model/useFilterStore";

interface IProps {
  paginate?: PaginationType;
}

export const Pagination = memo(({ paginate }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = paginate?.page || 0;
  const { setFilters, ...filters } = useFilterStore();

  const generateVisiblePages = () => {
    const total = paginate?.total_pages || 0;
    let pages: Array<number | string> = [];

    if (total <= 6) {
      pages = Array.from({ length: total }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", total];
      } else if (currentPage >= total - 2) {
        pages = [1, "...", total - 3, total - 2, total - 1, total];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          total,
        ];
      }
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setFilters({ ...filters, page: newPage });
  };

  const isActivePage = (page: number) => currentPage === page;

  return (
    <div className="flex items-center gap-[16px]">
      <button
        className="py-[12px]"
        disabled={!paginate?.has_prev}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <Image
          src="/static/icons/arrow-left-blue.svg"
          alt="Previous"
          width={14}
          height={14}
        />
      </button>

      {paginate && (
        <div className="flex items-center gap-[8px]">
          {generateVisiblePages().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                className={clsx(
                  "px-[12px] py-[6px] rounded-[8px] font-medium text-sm",
                  isActivePage(page)
                    ? "bg-blue300 text-white"
                    : "text-textColor bg-white hover:bg-gray100"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                className="px-[12px] py-[6px] text-blue300 text-sm font-medium"
              >
                {page}
              </span>
            )
          )}
        </div>
      )}

      <button
        className="py-[12px]"
        disabled={!paginate?.has_next}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <Image
          src="/static/icons/arrow-right-blue.svg"
          alt="Next"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
});
Pagination.displayName = "Pagination";
