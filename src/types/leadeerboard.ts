import {
  BaseResponse,
  FileType,
  PaginationType,
  RejectReason,
  UserType,
} from "./base";
import { PostStatusType } from "./posts";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

export type liderboardPeriodType = "week" | "month" | "year" | "all";

export type liderboardGroupType =
  | "post"
  | "ad-offer"
  | "ad-campaign"
  | "media-channel-category"
  | "business-category"
  | "media_channel_content_category";

export interface GetLeaderboardPostsRequest {
  period: liderboardPeriodType;
  page: number;
  per_page: number;
}

export interface GetLeaderboardRowsRequest {
  period: liderboardPeriodType;
}

export interface GetLeaderboardPostsByGroupRequest {
  period: liderboardPeriodType;
  page: number;
  per_page: number;
}

export interface GetLeaderboardRowsResponse extends BaseResponse {
  rows: LeaderboardRow[];
}

export interface LeaderboardRow {
  group: liderboardGroupType;
  object_id: number | null;
  period: liderboardPeriodType;
  updated_at: string;
  views_cash: number;
  views_score: number;
}

export interface GetLeaderboardPostsResponse extends BaseResponse {
  list: LeaderboardPost[];
  top_three: LeaderboardPost[];
  paginate?: PaginationType;
}

export interface GetLeaderboardPostsByGroupResponse extends BaseResponse {
  list: LeaderboardPost[];
  top_three: LeaderboardPost[];
  paginate?: PaginationType;
}

export interface LeaderboardPost {
  creator: {
    banned_at?: string | null;
    business_terms_signed_at?: string | null;
    clipper_terms_signed_at?: string | null;
    company_name?: string | null;
    created_at?: string;
    email?: string;
    icon: FileType & { preview_file: string | null };
    id: number;
    name: string;
    surname: string;
    type: string;
    role?: UserType;
  };
  media_channel_post: {
    id: number;
    like_count: number;
    media_channel_id: number;
    preview_image?: (FileType & { preview_file: string | null }) | null;
    public_at: string;
    title: string | null;
    url?: string;
    video_file: FileType & { preview_file: string | null };
    view_count: number;
    media_channel_type: SocialPlatform;
  };
  media_channel_stat: {
    actualized_at: string;
    avg_view_count: number;
    subscriber_count: number;
    total_post_count: number;
    total_view_count: number;
  } | null;
  post: {
    ad_offer_id: number;
    archived_at: string | null;
    created_at: string;
    created_by: number;
    failed_moderation_checks: string[] | null;
    finished_at: string;
    id: number;
    media_channel_id: number;
    media_channel_post_id: number;
    moderation_reject_reasons: RejectReason[];
    status: PostStatusType;
    updated_at: string;
    media_channel_category_id: number;
  };
  post_payment: {
    sum_dept: number;
    sum_paid: number;
    sum_reserved: number;
    view_paid: number;
  };
  ad_offer: {
    ad_offer: {
      ad_campaign_id: number;
      created_at: string;
      id: number;
      max_avg_view_for_post_count: number;
      media_channel_type: SocialPlatform;
      min_avg_view_for_post_count: number;
      moderation_reject_reasons: RejectReason[];
      name: string;
      status: PostStatusType;
      updated_at: string;
    };
    language_ids: number[];
    media_channel_category_ids: number[];
    pricing: {
      budget: number;
      cmp_price: number;
      id: number;
      max_profit: number;
      max_profit_views: number;
      pricing_mode: string;
      total_max_profit: number;
      ttl_days: number;
      view_bonus_count: number;
      view_bonus_sum: number;
      view_bonuses: {
        bonus_sum: number;
        views_count: number;
      }[];
    };
    spec: {
      ban_file_id: number;
      banner_duration: number;
      banner_position: string;
      banner_type: string;
      bio_url: string;
      clipper_avatar_file_id: number;
      content_sources: {
        description: string;
        url: string;
      }[];
      description: string;
      id: number;
      integration_type: string;
      pinned_comment_text: string;
      pinned_comment_type: string;
      post_description_text: string;
      post_description_type: string;
      profile_description_text: string;
      profile_description_type: string;
      watermark_file_id: number;
    };
    spec_banner_file: FileType & { preview_file: string | null };
    spec_clipper_avatar: FileType & { preview_file: string | null };
    spec_watermark_file: FileType & { preview_file: string | null };
  };
  ad_offer_campaign_detail: {
    ad_campaign: {
      archived_at: string;
      business_description: string;
      business_name: string;
      created_at: string;
      id: number;
      logo_file_id: number;
      settings: {
        allow_platform_watermark: boolean;
        fee_pct: number;
        watermark_fee_discount_pct: number;
      };
      title: string;
    };
    business_category_ids: number[];
    log_file: {
      id: number;
      link: string;
      name: string;
      preview_file: string;
    };
  };
  place: number;
}

export type LeaderboardGroupType =
  | "media_channel"
  | "youtube_platform"
  | "tiktok_platform"
  | "instagram_platform"
  | "media_channel_content_category";

export interface GetLeaderboardMediaChannelsRequest {
  group: LeaderboardGroupType;
  period: liderboardPeriodType;
  entity_id: number;
  page: number;
  per_page: number;
}

export interface LeaderboardMediaChannelItem {
  place: number;
  cash: number;
  content_category_id: number;
  media_channel_id: number;
  platform: SocialPlatform;
  posts_count: number;
  user_avatar: {
    id: number;
    link: string;
    name: string;
    preview_file: string;
  };
  user_masked_nick: string;
  views: number;
}

export interface GetLeaderboardMediaChannelsResponse {
  list: LeaderboardMediaChannelItem[];
  paginate: PaginationType;
  status: string;
  top_three: LeaderboardMediaChannelItem[];
}
