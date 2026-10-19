import { LeaderboardMediaChannelItem } from "src/types/leadeerboard";
import { PedestalCard } from "./PedestalCard";
import { PedestalCardSkeleton } from "./PedestalCardSkeleton";

interface IProps {
  isLoading: boolean;
  topThree: LeaderboardMediaChannelItem[];
  hasTopThree: boolean;
}

export const PedestalMediaChannel = ({
  isLoading,
  topThree,
  hasTopThree,
}: IProps) => {
  if (!isLoading && !hasTopThree) return null;
  return (
    <div className="grid grid-cols-3 md:gap-[20px] gap-[6px] mt-[100px] items-end px-[10px] w-full">
      {isLoading ? (
        <>
          <div className="order-2 md:order-1 flex-1 md:flex-none">
            <PedestalCardSkeleton place={2} />
          </div>
          <div className="order-1 md:order-2 flex-1 md:flex-none">
            <PedestalCardSkeleton place={1} />
          </div>
          <div className="order-3 md:order-3 flex-1 md:flex-none">
            <PedestalCardSkeleton place={3} />
          </div>
        </>
      ) : (
        <>
          {/* Mobile: 1-2-3, Desktop: 2-1-3 */}
          <div className="order-2 md:order-1 flex-1 md:flex-none w-full">
            {topThree[1] && (
              <PedestalCard mediaChannel={topThree[1]} place={2} />
            )}
          </div>
          <div className="order-1 md:order-2 flex-1 md:flex-none w-full">
            {topThree[0] && (
              <PedestalCard mediaChannel={topThree[0]} place={1} />
            )}
          </div>
          <div className="order-3 md:order-3 flex-1 md:flex-none w-full">
            {topThree[2] && (
              <PedestalCard mediaChannel={topThree[2]} place={3} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
