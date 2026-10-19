import {
  AdFileType,
  SocialPlatform,
} from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import {
  AdType,
  BaseResponse,
  FileType,
  PaginationType,
  RejectReason,
} from "./base";
import { AdPosition } from "src/features/business/offers/model/useAdPositionSelectorState";
import { CampaignSettings } from "./campaigns";
import { BrandType } from "./brands";

export interface OffersResponse extends BaseResponse {
  ad_offer_details: OfferType[];
}

export interface OffersBusinessResponse extends BaseResponse {
  ad_offer_details: OfferBusinessType[];
}
export interface FileTypeForBusiness {
  id: number;
  link: string;
  name: string;
  preview_file: string | null;
  type: string;
}

export interface AdOfferForBusiness {
  id: number;
  created_at: string;
  updated_at: string;
  media_channel_type: SocialPlatform;
  name: string;
  min_avg_view_for_post_count: number;
  max_avg_view_for_post_count: number;
  version_status: OfferSetStatusType;
  status: OfferSetStatusType;
  ad_campaign_id: number;
  moderation_reject_reasons: RejectReason[];
  viralista_school_member: boolean;
}

export interface PricingForBusiness {
  cmp_price: number;
  budget: number | null;
  pricing_mode: string;
  max_profit: number;
  max_profit_views: number;
  ttl_days: number;
  view_bonus_count: number;
  view_bonus_sum: number;
  view_bonuses: ViewBonus[];
  total_max_profit: number;
}

export interface SpecForBusiness {
  integration_type: AdType;
  content_sources: ContentSource[];
  ban_file_id: number;
  banner_position: AdPosition;
  banner_type: AdFileType;
  banner_duration: number;
  pinned_comment_type: "exact" | "included";
  pinned_comment_text: string | null;
  profile_description_type: "exact" | "included";
  profile_description_text: string;
  post_description_type: "exact" | "included";
  post_description_text: string;
  description: string;
  bio_url: string;
  clipper_avatar_file_id: number;
  watermark_file_id: number | null;
}

export interface AdOfferDetailForBusiness {
  ad_offer: AdOfferForBusiness;
  pricing: PricingForBusiness;
  spec: SpecForBusiness;
  spec_banner_file: FileTypeForBusiness;
  spec_clipper_avatar: FileTypeForBusiness;
  spec_watermark_file: FileTypeForBusiness | null;
  media_channel_category_ids: number[];
  language_ids: number[];
}

export interface OfferBusinessType {
  active_adoffer_detail: AdOfferDetailForBusiness | null;
  pending_adoffer_detail: AdOfferDetailForBusiness | null;
  statictic: {
    posts_count: number;
    views_count: number;
  };
  payment_summary: {
    paid_sum: number;
    reserved_sum: number;
  };
}
export interface OfferByIDResponse extends BaseResponse {
  ad_offer_detail: OfferBusinessType;
}

// Reusable types for OffersForInfluencersResponse
export interface AdOfferType {
  active_offers_count: number;
  total_max_profit: string;
  type: AdType;
}

export interface AdCampaignForInfluencer {
  archived_at: string | null;
  business_description: string;
  business_name: string;
  created_at: string;
  id: number;
  logo_file_id: number;
  settings: CampaignSettings;
  title: string;
}

export interface AdCampaignDetailForInfluencer {
  ad_campaign: AdCampaignForInfluencer;
  brand: BrandType;
  business_category_ids: number[];
}

export interface AdOfferForInfluencer {
  ad_campaign_id: number;
  created_at: string;
  id: number;
  max_avg_view_for_post_count: number;
  media_channel_type: SocialPlatform;
  min_avg_view_for_post_count: number;
  moderation_reject_reasons?: RejectReason[];
  name: string;
  status: OfferSetStatusType;
  updated_at: string;
  viralista_school_member?: boolean;
}

export interface ViewBonus {
  bonus_sum: number;
  views_count: number;
}

export interface PricingForInfluencer {
  budget?: number;
  cmp_price: number;
  max_profit: number;
  max_profit_views?: number;
  pricing_mode: string;
  total_max_profit?: number;
  ttl_days: number;
  view_bonus_count: number;
  view_bonus_sum: number;
  view_bonuses?: ViewBonus[];
}

export interface SpecForInfluencer {
  ban_file_id: number;
  banner_duration: number;
  banner_position: AdPosition;
  banner_type: AdFileType;
  bio_url: string;
  clipper_avatar_file_id: number | null;
  content_sources: ContentSource[];
  description: string;
  integration_type: AdType;
  pinned_comment_text: string;
  pinned_comment_type: "exact" | "included";
  post_description_text: string;
  post_description_type: "exact" | "included";
  profile_description_text: string;
  profile_description_type: "exact" | "included";
  watermark_file_id: number | null;
}

export interface InfluencerAdOfferDetail {
  ad_offer: AdOfferForInfluencer;
  language_ids: number[];
  media_channel_category_ids: number[];
  pricing: PricingForInfluencer;
  spec: SpecForInfluencer;
  spec_banner_file: FileType;
  spec_clipper_avatar: FileType | null;
  spec_watermark_file: FileType | null;
}

export interface MediaChannelForInfluencer {
  archived_at: string | null;
  auth_id: number;
  created_at: string;
  external_name: string;
  id: number;
  media_channel_type: SocialPlatform;
  moderation_reject_reasons: RejectReason[];
  status: string;
  title: string;
  user_id: number;
}

export interface MediaChannelResponseInformation {
  media_channel: MediaChannelForInfluencer;
  take_check_errors: TakeCheckErrorType[];
}

export interface InfluencerOfferType {
  ad_campaign_detail: AdCampaignDetailForInfluencer;
  ad_offer_detail: InfluencerAdOfferDetail;
  media_channel_response_informations: MediaChannelResponseInformation[];
}

export interface OffersForInfluencersResponse extends BaseResponse {
  ad_offer_types: AdOfferType[];
  list: InfluencerOfferType[];
  paginate: PaginationType;
}

export interface OfferType {
  ad_offer: {
    id: number;
    ad_campaign_id: number;
    created_at: string;
    updated_at: string;
    media_channel_type: SocialPlatform;
    name: string;
    min_avg_view_for_post_count: number;
    max_avg_view_for_post_count: number;
    status: OfferSetStatusType;
    moderation_reject_reasons?: RejectReason[];
    viralista_school_member?: boolean;
  };
  pricing: {
    id: number;
    cmp_price: number;
    pricing_mode: "1k";
    max_profit: number;
    max_profit_views?: number;
    ttl_days: number;
    view_bonus_count: number;
    view_bonus_sum: number;
    view_bonuses?: {
      views_count: number;
      bonus_sum: number;
    }[];
    budget?: number;
    total_max_profit?: number;
  };
  spec: {
    id: number;
    ban_file_id: number;
    banner_position: AdPosition;
    banner_type: AdFileType;
    banner_duration: 0;
    pinned_comment_type: "exact" | "included";
    pinned_comment_text: string;
    profile_description_type: "exact" | "included";
    profile_description_text: string;
    post_description_type: "exact" | "included";
    post_description_text: string;
    description: string;
    bio_url: string;
    integration_type: AdType;
    content_sources: ContentSource[];
    clipper_avatar_file_id: number | null;
    watermark_file_id: number | null;
  };
  spec_clipper_avatar: FileType | null;
  spec_banner_file: FileType;
  spec_watermark_file: FileType;
  media_channel_category_ids: number[];
  language_ids: number[];
  statictic?: {
    posts_count: number;
    views_count: number;
  };
  payment_summary?: {
    paid_sum: number;
    reserved_sum: number;
  };
}

export type ContentSource = {
  description: string;
  url: string;
};
export interface CreateOfferRequest {
  language_ids: number[];
  max_avg_view_for_post_count: number | string;
  min_avg_view_for_post_count: number | string;
  media_channel_category_ids: number[];
  media_channel_type: SocialPlatform | null;
  name: string;
  price_request: {
    budget: number | null;
    cmp_price: number;
    max_profit: number;
    pricing_mode: string;
    ttldays: number;
    view_bonuses: {
      views_count: number;
      bonus_sum: number;
    }[];
  };
  spec_request: {
    banner_duration: number;
    banner_file_id: number | null;
    banner_position?: AdPosition;
    banner_type?: AdFileType;
    description: string;
    pinned_comment_text?: string;
    pinned_comment_type: "exact" | "included";
    post_description_text: string;
    post_description_type: "exact" | "included";
    profile_description_text: string;
    profile_description_type: "exact" | "included";
    bio_url: string;
    integration_type: AdType;
    content_sources: ContentSource[];
    clipper_avatar_file_id: number | null;
  };
}
export interface CreateOfferResponse extends BaseResponse {
  ad_offer_detail: OfferType;
}
export type OfferSetStatusType =
  | "draft"
  | "moderating"
  | "moderated"
  | "closed"
  | "paused"
  | "rejected";
export interface OfferSetStatusReq {
  status: "closed" | "paused" | "moderated";
}
export interface OfferSetVersionStatusReq {
  status: "moderating";
}

export type TakeCheckErrorType =
  | "views_count_not_suitable"
  | "language_not_suitable"
  | "media_channel_category_not_suitable"
  | "media_channel_type_not_suitable"
  | "media_channel_moderation_failed"
  | "budjet_too_low"
  | "ad_offer_bad_status";

export interface OfferPaymentHistoryResponse extends BaseResponse {
  list: { id: number; date: string; sum: number; views: number }[];
}
