import { BaseResponse, FileType } from "./base";
import {SocialPlatform} from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

export type NotificationType = 
  | "adoffer_moderation_approved" 
  | "adoffer_moderation_rejected" 
  | "post_moderation_approved" 
  | "post_moderation_rejected" 
  | "mediachannel_moderation_approved"
  | "mediachannel_moderation_rejected" 
  | "post_closed"
  | "influencer_daily_stats"
  | "new_referral"
  | "withdrawal_approved"
  | "withdrawal_rejected"
  | "funds_added"
  | "campaign_daily_stats"
  | "campaign_balance_low"
  | "offer_milestone_reached"
  | "influencer_welcome_bonus_earned"

export type Notification =   {
  "content": string,
  "created_at": string,
  "id": number,
  "primary_picture": FileType,
  "read_at": string,
  "redirect_link": string,
  "secondary_picture": FileType,
  "title": string,
  "type": NotificationType
  "mediachannel_type"?: SocialPlatform
}

export interface GetNotificationsResponse extends BaseResponse {
  list: Notification[],
  has_more: boolean,
  unreads_count: number
}

export interface GetNotificationsRequest {
  limit?: number,
  offset?: number
}

export interface ReadNotificationRequest {
  notify_ids: number[]
}