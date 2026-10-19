import clsx from "clsx";

interface IProps {
  className?: string;
}

export const FilterTabListSkeleton = ({ className }: IProps) => {
  const skeletonTabs = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div
      className={clsx(
        "flex gap-[10px] items-center overflow-x-auto py-[5px]",
        className
      )}
      style={{ scrollbarWidth: "thin" }}
    >
      {skeletonTabs.map((index) => (
        <div
          key={index}
          className="min-w-[165px] h-[63px] rounded-[8px] bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};
