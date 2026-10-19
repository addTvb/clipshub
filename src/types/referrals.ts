export type ReferralGradeSlugType =
  | "beginner"
  | "small"
  | "medium"
  | "big"
  | "influencer";

export interface ReferralLevelItem {
  slug: ReferralGradeSlugType;
  title: string;
  min_followers_count: number;
  max_followers_count: number | null;
  min_avg_views_count: number;
  approved_post_count: number;
  is_upgradable: boolean;
  invite_reward: number | null;
  fee_pct: number;
}

export interface ReferralInfoResponse {
  items: ReferralLevelItem[];
}
