import { BaseResponse, FileType, PaginationType, RejectReason, User } from "./base";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { OfferType } from "./offers";
import { PostStatusType, PostType } from "./posts";
import { AdOfferCampaignDetail } from "./campaigns";
import { MediaChannelResponseInformation } from "./offers";
import { ReferralGradeSlugType } from "./referrals";

export interface InfluencersResponse extends BaseResponse {
  list: Influencer[];
}
export interface Influencer {
  company_name: string;
  icon: FileType;
  id: number;
  name: string;
  surname: string;
}

export type ChannelStatus =
  | "created"
  | "moderation"
  | "approved"
  | "archived"
  | "rejected";

export interface MediaChannel {
  external_name?: string;
  id: number;
  media_channel_type: SocialPlatform;
  status: ChannelStatus;
  title: string;
  moderation_reject_reasons: RejectReason[];
}

export interface MediaChannelsResponse extends BaseResponse {
  media_channel_details: MediaChannelDetails[];
}

export interface MediaChannelDetailResponse extends BaseResponse {
  media_channel_detail: MediaChannelDetails;
}

export interface GetChannelVerificationCodeResponse extends BaseResponse {
  description_code?: string;
}

export interface MediaChannelStat {
  actulized_at: string;
  avg_view_count: number;
  subscriber_count: number;
  subscriptions_count: number;
  total_post_count: number;
  total_view_count: number;
}

export interface MediaChannelDetails {
  category_ids: number[];
  cover_file: FileType;
  language_ids: number[];
  media_channel: MediaChannel;
  media_channel_stat: MediaChannelStat;
}
export interface OfferWithPostItem {
  ad_offer: OfferType;
  post_detail: PostType;
  ad_offer_campaign_detail: AdOfferCampaignDetail;
}

export interface GetPostByIdResponse extends BaseResponse {
  post: OfferWithPostItem;
}

export interface AppendMediaPostResponse extends BaseResponse {
  auto_check_errors: string[];
  auto_checks: Record<string, boolean>;
  post: OfferWithPostItem;
}

export interface AppendMediaPostRequest {
  url: string;
}

export interface GetOfferByIdResponse extends BaseResponse {
  detail: {
    ad_offer_detail: OfferType;
    ad_campaign_detail: AdOfferCampaignDetail;
    media_channel_response_informations: MediaChannelResponseInformation[];
  };
}

export interface GetPostsByMediaChannelParams {
  status: PostStatusType;
  page?: number;
  per_page?: number;
}
export interface GetPostsByMediaChannelResponse extends BaseResponse {
  list: OfferWithPostItem[];
  paginate?: PaginationType;
}

export interface CreatePostOnOfferRequest {
  ad_offer_id: number;
}

export interface InvitedUser {
  payment_sum: number;
  referral_level_slug: ReferralGradeSlugType;
  user: User;
}

export interface GetInvitedUsersResponse extends BaseResponse {
  users: InvitedUser[];
}

export interface MediaChannelStatisticsResponse extends BaseResponse {
  statistics: {
    approved_posts: number;
    closed_posts: number;
    created_posts: number;
    moderation_posts: number;
    rejected_posts: number;
    total_earnings: string;
    revoked_posts: number;
  };
}
