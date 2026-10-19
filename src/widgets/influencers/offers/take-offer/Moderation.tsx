import TextCard from "src/components/ui/text-card";
import { OfferType } from "src/types/offers";
import { PostType } from "src/types/posts";
import { AdOfferCampaignDetail } from "src/types/campaigns";
import { useTranslations } from "next-intl";
import CountdownTimer from "src/components/ui/countdown-timer";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "src/config/queryKeys";

interface IProps {
  offer: OfferType;
  post: PostType;
  campaignDetail: AdOfferCampaignDetail;
}

const Moderation = ({ post }: IProps) => {
  const t = useTranslations("influencer.moderation");
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-[24px] relative bg-white lg:p-[24px] p-[12px] pt-[32px] rounded-[8px] w-full max-w-contentMaxWidth h-fit">
      <div className="absolute -top-[8px] rounded-[8px] bg-primary py-[4px] px-[6px] text-base font-bold text-white">
        {t("stepLabel")}
      </div>

      <div className="flex items-center gap-[12px] lg:text-[28px] text-[20px] font-bold text-textColor border-b-[1px] border-[#DFE3EA] pb-[24px]">
        {t("title")}
        <div className="text-[16px] font-bold px-[6px] py-[4px] rounded-[8px] bg-[#DFE3EA]">
          <CountdownTimer
            createdAt={post.post.updated_at}
            duration={15 * 60 * 1000}
            onComplete={() => {
              queryClient.invalidateQueries({
                queryKey: queryKeys.influencers.posts.getPostById(post.post.id),
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="lg:text-[20px] text-[18px] font-bold">{t("submittedMessage")}</div>
        <TextCard
          text={post.media_channel_post.url}
          url={post.media_channel_post.url}
        />
        <div className="flex flex-col gap-[16px] text-[14px] text-gray400 font-[500] [&_span]:font-bold">
          <p dangerouslySetInnerHTML={{ __html: t.raw("moderationTime") }} />

          <div>
            <span className="font-bold">{t("checkListTitle")}</span>
            <ul>
              <li>{t("checkListItem1")}</li>
              <li>{t("checkListItem2")}</li>
              <li>{t("checkListItem3")}</li>
            </ul>
          </div>

          <div>
            {t("notification")}
            <div dangerouslySetInnerHTML={{ __html: t.raw("trackStatus") }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderation;
