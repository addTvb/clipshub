import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { Avatar } from "src/features/auth/Avatar";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { PaginationType } from "src/types/base";
import { DictionaryType } from "src/types/category";
import { LeaderboardMediaChannelItem } from "src/types/leadeerboard";
import { socialPlatformIcons } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";
import { MediaChannelsTableSkeleton } from "./MediaChannelsTableSkeleton";
import { MediaChannelCard } from "./MediaChannelCard";
import { formatNumberWithSpaces } from "src/lib/numbers/formatNumberWithSpaces";
import { LeaderboardPagination } from "../../LeaderboardPagination";

const tableHeadCells = [
  { label: "leaderboard.table.#", className: "rounded-l-[8px]" },
  { label: "leaderboard.table.nickname" },
  { label: "leaderboard.table.platform" },
  { label: "leaderboard.table.views" },
  { label: "leaderboard.table.qtyPosts" },
  { label: "leaderboard.table.contentCategory" },
  { label: "leaderboard.table.paid", className: "rounded-r-[8px]" },
];

interface IProps {
  mediaChannels?: LeaderboardMediaChannelItem[];
  paginate?: PaginationType;
  isLoading: boolean;
  hasMediaChannels: boolean;
}

export const MediaChannelsTable = ({
  mediaChannels,
  paginate,
  isLoading,
  hasMediaChannels,
}: IProps) => {
  const t = useTranslations();

  const { mediaChannelCategories } = useMediaChannelCategory();

  const getCategory = (categoryID: number): DictionaryType | null => {
    const arr = mediaChannelCategories?.filter(
      (category) => category.id === categoryID
    );
    return arr && arr.length > 0 ? arr[0] : null;
  };

  if (isLoading) {
    return <MediaChannelsTableSkeleton />;
  }
  if (!hasMediaChannels) return null;

  return (
    <div className="bg-white50 pb-[100px] w-full px-[10px]">
      <div className="max-w-screenMaxWidth mx-auto flex flex-col gap-[24px] items-center rounded-[8px] md:bg-white md:p-[24px] mt-[-40px]">
        {/* Desktop Table */}
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
              {mediaChannels?.map((row) => {
                const category = getCategory(row?.content_category_id);
                return (
                  <TableRow
                    key={`${row?.cash}-${row?.views}-${row?.posts_count}`}
                  >
                    <TableCell className="text-gray350 font-bold rounded-l-[8px]">
                      /{row?.place}
                    </TableCell>
                    <TableCell className="text-black400">
                      <span className="flex items-center gap-[12px]">
                        <Avatar
                          src={row?.user_avatar?.link || ""}
                          alt=""
                          width={44}
                          height={44}
                          userID={row?.media_channel_id}
                        />
                        <span>{row?.user_masked_nick || "-"}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-black400">
                      {row?.platform ? (
                        <Image
                          src={socialPlatformIcons[row?.platform || ""]}
                          alt=""
                          width={32}
                          height={32}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-black400">
                      <span className="flex items-center gap-[4px]">
                        <Image
                          src="/static/icons/eye-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span>{formatNumberWithSpaces(row?.views) || "-"}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-black400">
                      <span className="flex items-center gap-[4px]">
                        <Image
                          src="/static/icons/hashtag-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span>
                          {formatNumberWithSpaces(row?.posts_count) || "-"}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="text-black400">
                      <span className="flex items-center gap-[4px]">
                        <Image
                          src={category?.icon || ""}
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span>{category ? category?.name : "-"}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-black400 rounded-r-[8px]">
                      <span className="cash-bg-clip font-bold">
                        ${formatNumberWithSpaces(row?.cash)} USD
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden w-full">
          <div className="flex flex-col gap-[12px]">
            {mediaChannels?.map((row, index) => (
              <MediaChannelCard
                key={`${row?.cash}-${row?.views}-${row?.posts_count}`}
                mediaChannel={row}
                index={index}
              />
            ))}
          </div>
        </div>

        {paginate && paginate.total_pages > 1 && (
          <div className="flex justify-center">
            <LeaderboardPagination paginate={paginate} />
          </div>
        )}
      </div>
    </div>
  );
};
