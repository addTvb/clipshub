import { useState } from "react";
import { FilterItems } from "./types";

export const useInitFilters = () => {
  const [filterItems, setFilterItems] = useState<FilterItems>({
    integration_types: [
      { key: "integration_types", title: "Banner", value: "banner" },
      { key: "integration_types", title: "Half Screen", value: "half_screen" },
      { key: "integration_types", title: "Influencer Content", value: "influencer_content" },
    ],
    business_category_ids: [],
    media_channel_category_ids: [],
    media_channel_type: [
      { key: "media_channel_type", title: "TikTok", value: "tiktok" },
      { key: "media_channel_type", title: "Instagram", value: "instagram" },
      { key: "media_channel_type", title: "YouTube", value: "youtube" },
    ],
    language_ids: [],
  });

  return { filterItems, setFilterItems };
};
