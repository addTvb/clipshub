"use client";

import dayjs from "dayjs";
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
import { formatDate } from "src/lib/date/formatDate";
import { usePostsByOfferIDQuery } from "src/queries/business/usePostsByOfferIDQuery";
import relativeTime from "dayjs/plugin/relativeTime";
import { DaysDifference } from "src/components/ui/days-difference";
import { PostStatusBadge } from "src/features/posts/PostStatusBadge";
/* import { calculateOverspending } from "src/lib/numbers/calculateOverspending"; */
import { Pagination } from "src/features/posts/Pagination";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import { InfoPopover } from "src/components/ui/info-popover";

dayjs.extend(relativeTime);

interface IProps {
  offerID: number;
}

export const OfferPostsTable = ({ offerID }: IProps) => {
  const t = useTranslations();

  const { posts } = usePostsByOfferIDQuery(offerID);

  if (posts?.list?.length !== 0)
    return (
      <div className="flex flex-col gap-[24px] bg-white rounded-[8px] p-[12px] sm:p-[24px]">
        <div className="flex items-center gap-[16px]">
          <span className="text-xl sm:text-[28px] font-bold">
            {t("business.offer.postsOfThisOffer")}
          </span>
          <span className="px-[6px] py-[4px] rounded-[8px] bg-[#DFE3EA] text-sm font-bold">
            {posts?.paginate?.total_count}
          </span>
        </div>

        <div className="flex flex-col gap-[10px] items-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-l-[8px]">ID</TableHead>
                <TableHead>{t("common.influencer")}</TableHead>
                <TableHead>{t("business.offer.postCreate")}</TableHead>
                <TableHead>
                  <span className="flex items-center gap-[4px]">
                    <span>{t("business.offer.views")}</span>
                    <InfoPopover>
                      {t.rich("business.offer.viewsPopoverText", {
                        bold: (chunks) => <strong>{chunks}</strong>,
                      })}
                    </InfoPopover>
                  </span>
                </TableHead>
                <TableHead>{t("business.offer.reserved")}</TableHead>
                <TableHead>{t("business.offer.paid")}</TableHead>
                {/*  <TableHead>
                  <span className="flex items-center gap-[4px]">
                    <span>{t("business.offer.overspending")}</span>

                    <Popover>
                      <PopoverTrigger>
                        <Image
                          src="/static/icons/info-popover-gray.svg"
                          alt="More"
                          width={18}
                          height={18}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="p-[10px] max-w-[315px] text-gray400 font-medium text-sm">
                        {t.rich("business.offer.overspendingPopoverText", {
                          bold: (chunks) => <strong>{chunks}</strong>,
                          br: () => <br />,
                        })}
                      </PopoverContent>
                    </Popover>
                  </span>
                </TableHead> */}
                <TableHead>{t("business.offer.postLink")}</TableHead>
                <TableHead className="rounded-r-[8px]">
                  {t("business.offer.status")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.list?.map((post) => (
                <TableRow key={`offer-post-${post.post.id}`}>
                  <TableCell>{post.post.id}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-[12px]">
                      <Image
                        src={
                          post.creator?.icon?.link ||
                          "/static/images/default-avatar.svg"
                        }
                        alt={post.creator?.icon?.name || "creator icon"}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/static/images/default-avatar.svg";
                        }}
                        width={44}
                        height={44}
                        className="bg-gray100 w-[44px] h-[44px] border-1 border-gray700 rounded-full object-cover"
                      />
                      <span className="truncate">{`${post.creator.name} ${post.creator.surname}`}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDate(post.post.created_at)}{" "}
                    {post.post?.finished_at &&
                      post.post.status === "approved" && (
                        <>
                          (
                          <DaysDifference
                            creationDateStr={post.post?.finished_at}
                          />
                          )
                        </>
                      )}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(post.media_channel_post?.view_count || 0)}
                  </TableCell>
                  <TableCell>
                    ${formatCurrency(post.post_payment?.sum_reserved || 0)}
                  </TableCell>
                  <TableCell>
                    ${formatCurrency(post.post_payment?.sum_paid || 0)}
                  </TableCell>
                  {/*    <TableCell>
                    {calculateOverspending(
                      post.post_payment?.sum_paid,
                      post.post_payment?.sum_dept
                    ) || 0}
                  </TableCell> */}
                  <TableCell>
                    {post.media_channel_post?.url && (
                      <a
                        href={post.media_channel_post?.url || "#"}
                        className="flex items-center gap-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="underline text-blue300 text-sm font-medium">
                          {t("common.link")}
                        </span>
                        <Image
                          src="/static/icons/link-blue.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <PostStatusBadge status={post.post.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {posts?.paginate && <Pagination paginate={posts.paginate} />}
        </div>
      </div>
    );
};
