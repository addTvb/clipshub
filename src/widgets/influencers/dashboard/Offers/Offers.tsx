import { useEffect, useRef } from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { useTranslations } from "next-intl";
import { usePostsByMediaChannel } from "src/queries/influencers/usePostsByMediaChannel";
import { useMediaChannelStat } from "src/queries/influencers/useMediaChannelStat";
import { useFilterStore } from "../../filter-offers/model/useFilterStore";
import { Pagination } from "src/features/posts/Pagination";
import FindOfferButton from "src/widgets/influencers/dashboard/FindOfferButton";
import OfferCard from "../offer-card/OfferCard";
import { useOfferTabs } from "./model/useOfferTabs";
import { useTabsConfig } from "./model/useTabsConfig";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { DEFAULT_STATUS, TabValue } from "./constants";

interface IProps {
  mediaChannelId: number;
}

const Offers = ({ mediaChannelId }: IProps) => {
  const t = useTranslations("influencer.offers");
  const { mediaChannelStat } = useMediaChannelStat(mediaChannelId);
  const { page, per_page } = useFilterStore();
  const { currentStatus, activeTab, hash, handleTabChange } = useOfferTabs();
  const tabsConfig = useTabsConfig(mediaChannelStat);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Получаем посты из API
  const { posts, paginate, isLoading, error } = usePostsByMediaChannel({
    mediaChannelId,
    params: {
      page,
      per_page,
      status: currentStatus,
    },
  });

  // Скролл к Tabs при изменении page
  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  const TabContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} />;
    }

    return (
      <div className="flex flex-col gap-[24px] items-center">
        {posts.map(({ ad_offer, post_detail, ad_offer_campaign_detail }) => (
          <OfferCard
            key={post_detail.post.id}
            offer={ad_offer}
            post={post_detail}
            campaignDetail={ad_offer_campaign_detail}
          />
        ))}
        {paginate && paginate.total_count > 0 && (
          <Pagination paginate={paginate} />
        )}
        <FindOfferButton mediaChannelId={mediaChannelId} />
      </div>
    );
  };

  const tabsId = hash || DEFAULT_STATUS;

  const handleValueChange = (value: string) => {
    handleTabChange(value as TabValue);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleValueChange}
      className="flex flex-col gap-[10px] scroll-mt-[80px]"
      id={tabsId}
      ref={tabsRef}
    >
      <TabsList
        className="flex gap-[25px] justify-start bg-transparent overflow-x-auto overflow-y-hidden min-w-0"
        style={{ scrollbarWidth: "thin" }}
      >
        {tabsConfig.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} count={tab.count}>
            {t(tab.label)}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsConfig.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <TabContent />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Offers;
