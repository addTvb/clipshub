import { memo } from "react";

export const MediaChannelCardSkeleton = memo(() => {
  return (
    <div className="flex flex-col gap-[8px] p-[10px] bg-white rounded-[12px]">
      {/* Header skeleton */}
      <div className="flex items-center gap-[12px] p-[4px_12px_4px_8px] bg-white rounded-[8px]">
        <div className="flex items-center gap-[12px] flex-1">
          <div className="w-[30px] h-[20px] bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-[6px]">
            <div className="w-[44px] h-[44px] bg-gray-300 rounded-full animate-pulse" />
            <div className="w-[80px] h-[20px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-[53px] h-[16px] bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Stats section skeleton */}
      <div className="flex flex-col">
        {/* Views */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-[8px]">
          <div className="w-[60px] h-[20px] bg-gray-200 rounded animate-pulse flex-1" />
          <div className="flex items-center gap-[4px]">
            <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
            <div className="w-[100px] h-[20px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Qty Posts */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-[8px]">
          <div className="w-[80px] h-[20px] bg-gray-200 rounded animate-pulse flex-1" />
          <div className="flex items-center gap-[4px]">
            <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
            <div className="w-[40px] h-[20px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Content Category */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-[8px]">
          <div className="w-[120px] h-[20px] bg-gray-200 rounded animate-pulse flex-1" />
          <div className="flex items-center gap-[4px]">
            <div className="w-[16px] h-[16px] bg-gray-200 rounded animate-pulse" />
            <div className="w-[80px] h-[20px] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white400" />

        {/* Paid */}
        <div className="flex items-center gap-[12px] p-[8px] bg-white50 rounded-[8px]">
          <div className="w-[50px] h-[20px] bg-gray-200 rounded animate-pulse flex-1" />
          <div className="w-[90px] h-[20px] bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
});
MediaChannelCardSkeleton.displayName = "MediaChannelCardSkeleton";
