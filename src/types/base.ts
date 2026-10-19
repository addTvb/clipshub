import { AdFileType } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

export interface BaseResponse {
  status: "ok" | "error";
  error_code?: string;
}
export interface FileType {
  id: number;
  link: string;
  name: string;
  preview_file: FileType | null;
  type?: AdFileType;
}
export interface PaginationType {
  has_next: boolean;
  has_prev: boolean;
  page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}
export interface STApiError extends Error {
  response?: {
    data?: BaseResponse;
  };
}

export interface UpdateUserRequest {
  company_name?: string;
  file_id?: number;
  name?: string;
  surname?: string;
  type?: string;
}

export type RejectReason = {
  description: string;
  id: number;
  name: string;
};

export type UserType = "influencer" | "business";

export interface User {
  company_name?: string;
  email?: string;
  icon?: FileType;
  id: number;
  name: string;
  surname: string;
  type: UserType;
  clipper_terms_signed_at?: string;
  business_terms_signed_at?: string;
}

export type RewardState =
  | "registered"
  | "channel_configured"
  | "post_created"
  | "post_moderating"
  | "post_approved"
  | null;

export type FeatureFlags = {
  influencer_welcome_bonus: {
    available: boolean;
    earned: boolean;
    current_state: RewardState;
  };
  ad_campaign_fee_pct?: number;
  ad_campaign_watermark_fee_discount_pct?: number;
  viralista_school_member?: boolean;
};

export type PaymentMethodType =
  | "bank_account"
  | "paypal"
  | "usdt_trc20"
  | "usdt_erc20"
  | "crypto"
  | "credit_card"
  | "apple_pay";

export type Currency = "usd" | "usdt_trc_20" | "usdt_erc_20";
export type TetherCurrency = "usdt_trc_20" | "usdt_erc_20";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export type AdType =
  | "banner"
  | "half_screen"
  | "influencer_content"
  | "dedicate"
  | "integration"
  | "challenge";

export type OfferLevel = "easy" | "hard" | "medium";
