"use client";

import { memo } from "react";

export const SkeletonCard = memo(() => {
  return <div className="w-full h-full rounded-[8px] bg-[#E6EBF2]" />;
});
SkeletonCard.displayName = "SkeletonCard";
