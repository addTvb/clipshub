/* eslint-disable i18next/no-literal-string */
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { CrownSparkles } from "src/features/leaderboard/media-channels/crown-sparkles/CrownSparkles";
import DOMPurify from "isomorphic-dompurify";
import clsx from "clsx";
import { useGetUser } from "src/queries/useGetUser";

interface IProps {
  triggerClassName?: string;
  contentClassName?: string;
}

export const PremiumBadge = ({
  contentClassName,
  triggerClassName,
}: IProps) => {
  const t = useTranslations("influencer");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { featureFlags } = useGetUser();
  const isPremium = featureFlags?.viralista_school_member;

  const handlePreventDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="absolute">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onClick={handlePreventDefault}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div
            className={clsx(
              "absolute min-w-max z-[30] top-[-10px] left-[22px] flex items-center gap-[5px] text-white text-sm font-bold leading-[20px] bg-premiumGradient py-[2px] px-[6px] rounded-[8px] overflow-hidden",
              triggerClassName
            )}
          >
            <CrownSparkles
              scale={0.7}
              containerClassName="absolute top-[-3px] left-[0px] z-0"
              color="#ffffff80"
            />
            <Image
              src="/static/icons/premium-icon.svg"
              alt=""
              width={14}
              height={14}
              className="relative z-[1]"
            />
            <span className="min-w-max">Premium</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          className={clsx(
            "absolute top-[-95px] left-[20px] p-[12px] w-[350px]",
            contentClassName
          )}
        >
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  isPremium
                    ? t.raw("premiumBadgeDescNotPremium")
                    : t.raw("premiumBadgeDescIsPremium")
                ),
              }}
            />
            <span className="bg-white50 p-[4px] rounded-[8px] inline-block align-baseline ml-1 mb-[-4px]">
              <Image
                src="/static/icons/viralista-icon.svg"
                alt=""
                width={54}
                height={10}
              />
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
