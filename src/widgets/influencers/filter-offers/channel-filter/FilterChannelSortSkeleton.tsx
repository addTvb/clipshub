import clsx from "clsx";

interface IProps {
  className?: string;
}

export const FilterChannelSortSkeleton = ({ className }: IProps) => {
  return (
    <div
      className={clsx(
        "p-[16px] flex gap-[10px] border-b-[1px] sm:border-b-0 sm:border-r-2 flex-wrap min-[400px]:flex-nowrap border-gray200",
        className
      )}
    >
      <div className="md:w-[107px] w-full h-[52px] rounded-[6px] bg-gray-200 animate-pulse" />
      <div className="md:w-[170px] w-full h-[52px] rounded-[6px] bg-gray-200 animate-pulse" />
    </div>
  );
};

