import { memo } from "react";

interface IProps {
  title: string;
}

export const CategoryBadgeSmall = memo(({ title }: IProps) => {
  return (
    <div className="text-xs font-semibold text-black400 font-[Inter] rounded-[8px] px-[6px] bg-white200 w-fit">
      {title}
    </div>
  );
});
CategoryBadgeSmall.displayName = "CategoryBadgeSmall";