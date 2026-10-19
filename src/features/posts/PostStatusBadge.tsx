"use client";

import clsx from "clsx";
import { PostStatusType } from "src/types/posts";

interface IProps {
  status: PostStatusType;
}

const colorsByStatus: Record<PostStatusType, string> = {
  created: "text-gray400 bg-white200",
  moderation: "text-gray400 bg-white200",
  approved: "text-white bg-green100",
  archived: "text-[#B1803A] bg-[#F8E5CA]",
  rejected: "text-[#B1803A] bg-[#F8E5CA]",
  closed: "text-gray400 bg-white200",
  revoked: "text-[#B1803A] bg-[#F8E5CA]",
};

export const PostStatusBadge = ({ status }: IProps) => {
  return (
    <div
      className={clsx(
        "w-fit capitalize px-[6px] py-[4px] rounded-[8px] text-sm font-bold",
        colorsByStatus[status]
      )}
    >
      {status}
    </div>
  );
};
