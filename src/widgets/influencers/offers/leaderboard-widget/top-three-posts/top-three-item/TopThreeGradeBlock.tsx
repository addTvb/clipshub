import { LeaderboardPost } from "src/types/leadeerboard";
import Image from "next/image";
import { ReactNode, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useMediaChannelCategory } from "src/queries/business/dictionaries/useMediaChannelCategory";
import { mapDictionary } from "src/lib/dictionaries/mapDictionary";
import clsx from "clsx";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";

interface IProps {
  post?: LeaderboardPost;
}

const gradeBlockClassNames = {
  1: "bg-widgetGradeGold",
  2: "bg-widgetGradeSilver",
  3: "bg-widgetGradeBronze",
};

export const TopThreeGradeBlock = ({ post }: IProps) => {
  const t = useTranslations("leaderboard");

  const { mediaChannelCategories } = useMediaChannelCategory();

  const contentCategory = useMemo(
    () =>
      mapDictionary(
        mediaChannelCategories,
        post?.post?.media_channel_category_id
      ),
    [mediaChannelCategories, post?.post?.media_channel_category_id]
  );
 
  return (
    <div
      className={clsx(
        "p-[8px] rounded-[20px] flex flex-col gap-[4px] items-center shadow-imageShadow z-[10] cursor-pointer",
        gradeBlockClassNames[post?.place as keyof typeof gradeBlockClassNames],
        "absolute translate-x-[-29px] right-0 group-hover:translate-x-[10px] group-hover:scale-[0.80] transition-all duration-300",
        "hidden min-[1570px]:block"
      )}
    >
      <Image
        src={`/static/images/leaderboard/grade${post?.place}.svg`}
        alt={`${post?.place} place`}
        width={38}
        height={18}
      />
      <div className="flex flex-col gap-[9px]">
        <GradeBlockItem
          title={t("totalViews")}
          value={formatNumberWithCommas(post?.media_channel_post?.view_count)}
          icon={
            <Image
              src="/static/icons/eye-gray.svg"
              alt=""
              width={16}
              height={16}
            />
          }
        />
        <GradeBlockItem
          title={t("contentCategory")}
          value={contentCategory?.name}
          icon={
            <Image
              src="/static/icons/eye-gray.svg"
              alt="avg views per post"
              width={18}
              height={18}
            />
          }
        />
      </div>
    </div>
  );
};

export const GradeBlockItem = ({
  title,
  value,
  icon,
}: {
  title?: string;
  value?: string;
  icon?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-[8px] p-[8px] py-[6px] rounded-[12px] bg-white50 font-[Inter] min-w-[153px]">
      <div className="flex items-center gap-[4px]">
        {icon && icon}
        <span className="text-gray400 text-xs font-semibold">
          {title || "-"}
        </span>
      </div>

      <div className="text-textColor text-xs font-medium">{value || "-"}</div>
    </div>
  );
};
