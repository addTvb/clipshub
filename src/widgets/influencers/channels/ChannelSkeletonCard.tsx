import { memo } from "react";

const ChannelSkeletonCard = memo(() => {
  return (
    <div className="rounded-[8px] bg-gray200 h-[200px]" />
  );
});
ChannelSkeletonCard.displayName = "ChannelSkeletonCard";

export default ChannelSkeletonCard;
