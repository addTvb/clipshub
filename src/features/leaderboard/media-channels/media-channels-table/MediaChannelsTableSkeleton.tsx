import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { MediaChannelCardSkeleton } from "./MediaChannelCardSkeleton";

const tableHeadCells = [
  { label: "leaderboard.table.#", className: "rounded-l-[8px]" },
  { label: "leaderboard.table.nickname" },
  { label: "leaderboard.table.platform" },
  { label: "leaderboard.table.views" },
  { label: "leaderboard.table.qtyPosts" },
  { label: "leaderboard.table.contentCategory" },
  { label: "leaderboard.table.paid", className: "rounded-r-[8px]" },
];

export const MediaChannelsTableSkeleton = () => {
  const t = useTranslations();

  // Создаем 7 строк-скелетонов
  const skeletonRows = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-[24px] items-center rounded-[8px] bg-white p-[24px] mt-[-40px]">
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeadCells.map((cell) => (
                <TableHead key={cell.label} className={clsx(cell.className)}>
                  {t(cell.label)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((index) => (
              <TableRow key={index}>
                {/* Номер места */}
                <TableCell className="rounded-l-[8px]">
                  <div className="w-[30px] h-[20px] bg-gray-200 rounded animate-pulse" />
                </TableCell>

                {/* Никнейм с аватаром */}
                <TableCell>
                  <span className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-[120px] h-[20px] bg-gray-200 rounded animate-pulse" />
                  </span>
                </TableCell>

                {/* Платформа */}
                <TableCell>
                  <div className="w-[32px] h-[32px] bg-gray-200 rounded animate-pulse" />
                </TableCell>

                {/* Просмотры */}
                <TableCell>
                  <span className="flex items-center gap-[4px]">
                    <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
                    <div className="w-[80px] h-[20px] bg-gray-200 rounded animate-pulse" />
                  </span>
                </TableCell>

                {/* Количество постов */}
                <TableCell>
                  <span className="flex items-center gap-[4px]">
                    <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
                    <div className="w-[40px] h-[20px] bg-gray-200 rounded animate-pulse" />
                  </span>
                </TableCell>

                {/* Категория контента */}
                <TableCell>
                  <span className="flex items-center gap-[4px]">
                    <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
                    <div className="w-[100px] h-[20px] bg-gray-200 rounded animate-pulse" />
                  </span>
                </TableCell>

                {/* Оплачено */}
                <TableCell className="rounded-r-[8px]">
                  <div className="w-[90px] h-[20px] bg-gray-200 rounded animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="block md:hidden w-full">
        <div className="flex flex-col gap-[12px]">
          {skeletonRows.map((index) => (
            <MediaChannelCardSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Скелетон пагинации */}
      <div className="flex items-center gap-[12px]">
        <div className="w-[36px] h-[36px] bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-[8px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[36px] h-[36px] bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="w-[36px] h-[36px] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

