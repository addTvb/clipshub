import Image from "next/image";
import { Avatar } from "src/features/auth/Avatar";
import { PedestalPlace } from "./model/constants";
import { CrownSparkles } from "./crown-sparkles/CrownSparkles";
import clsx from "clsx";

interface IProps {
  src?: string;
  place: PedestalPlace;
  userID?: string | number;
}

export const PedestalAvatar = ({ src, place, userID }: IProps) => {
  return (
    <div
      className={clsx(
        "z-50 w-fit absolute left-1/2 -translate-x-1/2 md:relative md:left-[30px] md:translate-x-0",
        place === 1 && "-top-[40px] md:-top-[55px] lg:-top-[60px]",
        place === 2 && "-top-[40px] md:-top-[78px] lg:-top-[78px]",
        place === 3 && "-top-[40px] md:-top-[78px] lg:-top-[78px]"
      )}
    >
      <Image
        src={`/static/images/leaderboard/crown-${place}.webp`}
        alt=""
        width={80}
        height={80}
        className={clsx(
          "absolute -top-[40px] left-1/2 -translate-x-1/2 md:top-[-63px] md:translate-x-0 md:w-[125px] md:h-[125px]",
          place !== 1 && "md:top-[-63px] md:left-[25px]",
          place === 1 && "md:left-[48px]"
        )}
      />

      <CrownSparkles 
        scale={1}
        containerClassName={clsx(
          "top-[-40px] z-10 hidden md:block",
          place !== 1 ? "left-[38px]" : "left-[60px]"
        )}
      />

      <Avatar
        userID={userID}
        src={src || ""}
        width={92}
        height={92}
        className={clsx(
          "min-w-[81px] min-h-[81px] w-[81px] h-[81px] border border-gray700",
          place === 1
            ? "md:w-[125px] md:h-[125px] lg:w-[158px] lg:h-[158px]"
            : "md:w-[110px] md:h-[110px] lg:w-[136px] lg:h-[136px]"
        )}
      />
    </div>
  );
};
