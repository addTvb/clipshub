import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import EyeIcon from "@icons/eye-icon.svg";
import { formatNumberWithCommas } from "src/lib/numbers/formatNumberWithCommas";

const categoryBadgeVariants = cva(
  "flex items-center gap-[8px] px-[10px] rounded-[6px] capitalize text-sm font-semibold transition-all duration-200 cursor-pointer border-[3px] border-transparent",
  {
    variants: {
      variant: {
        default: "w-max bg-white50 text-textColor py-[6px]",
        dark: "w-max bg-[#222936] text-white hover:border-[3px] hover:border-[rgba(49,136,170,0.15)] py-[6px]",
        active: "w-max bg-white text-[#303948] py-[6px]",
        leaderboard: "w-max bg-black500 text-white py-[6px] hover:bg-black500/80",
        leaderboardActive:
          "w-max bg-black500 text-white py-[6px] ring-2 ring-blue300",
        modal: "w-full bg-white50 text-black400 py-[6px] hover:bg-gray100 justify-between",
        modalActive: "w-full bg-white50 text-black400 py-[6px] ring-2 ring-blue300 justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CategoryBadgeProps
  extends VariantProps<typeof categoryBadgeVariants> {
  name: string;
  iconPath: string;
  className?: string;
  onClick?: () => void;
  viewCount?: number;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({
  name,
  iconPath,
  variant,
  className = "",
  onClick,
  viewCount,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };


  return (
    <div
      className={clsx(categoryBadgeVariants({ variant }), className)}
      onClick={onClick}
    >
      <div className="flex items-center gap-[8px]">
        {!imageError && iconPath && (
          <Image
            src={iconPath}
            alt={name}
            width={20}
            height={20}
            className="size-[20px]"
            onError={handleImageError}
          />
        )}
        <span>{name}</span>
      </div>
      {(viewCount !== undefined && viewCount !== null) && (
        <div className="flex items-center gap-[4px] rounded-[4px]">
          <EyeIcon className="text-gray350 size-[14px]" />
          <span className="text-[12px] text-gray350 font-[Inter] font-[500]">
            {formatNumberWithCommas(viewCount)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryBadge;
