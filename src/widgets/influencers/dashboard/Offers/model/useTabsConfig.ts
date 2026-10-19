import { useMemo } from "react";
import { TabValue } from "../constants";

export interface TabConfig {
  value: TabValue;
  label: string;
  count: number;
}

interface MediaChannelStatistics {
  approved_posts?: number;
  created_posts?: number;
  moderation_posts?: number;
  rejected_posts?: number;
  closed_posts?: number;
  revoked_posts?: number;
}

type ValidTabValue = Exclude<TabValue, "archived">;

type TabConfigMap = {
  [K in ValidTabValue]: {
    label: string;
    countKey: keyof MediaChannelStatistics;
  };
};

const TAB_CONFIG_MAP: TabConfigMap = {
  active: {
    label: "activeOffers",
    countKey: "approved_posts",
  },
  "needs-posting": {
    label: "needsPosting",
    countKey: "created_posts",
  },
  moderation: {
    label: "moderation",
    countKey: "moderation_posts",
  },
  rejected: {
    label: "rejected",
    countKey: "rejected_posts",
  },
  closed: {
    label: "closed",
    countKey: "closed_posts",
  },
  revoked: {
    label: "revoked",
    countKey: "revoked_posts",
  },
} as const;

export const useTabsConfig = (
  mediaChannelStat: MediaChannelStatistics | undefined
): TabConfig[] => {
  return useMemo(() => {
    const baseTabs: ValidTabValue[] = [
      "active",
      "needs-posting",
      "moderation",
      "rejected",
      "closed",
    ];

    const tabs: TabConfig[] = baseTabs.map((tabValue) => {
      const config = TAB_CONFIG_MAP[tabValue];
      const countKey = config.countKey;
      const count = (mediaChannelStat?.[countKey] as number | undefined) ?? 0;
      return {
        value: tabValue,
        label: config.label,
        count,
      };
    });

    const revokedCount =
      (mediaChannelStat?.revoked_posts as number | undefined) ?? 0;
    if (revokedCount > 0) {
      const revokedConfig = TAB_CONFIG_MAP.revoked;
      tabs.push({
        value: "revoked",
        label: revokedConfig.label,
        count: revokedCount,
      });
    }

    return tabs;
  }, [mediaChannelStat]);
};
