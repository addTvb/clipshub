import { BaseResponse } from "./base";
import { BrandType } from "./brands";

export interface AllCampaignsResponse extends BaseResponse {
  list: CampaignType[];
}
export interface CampaignType {
  ad_campaign: {
    archived_at: string;
    business_description: string;
    business_name: string;
    created_at: string;
    id: number;
    logo_file_id: number;
    settings: CampaignSettings;
    title: string;
  };
  ad_offers_count: {
    moderated_count: number;
    total_count: number;
  };
  brand: BrandType;
  business_category_ids: number[];
  wallet: WalletType;
}
export interface CreateCampaignRequest {
  brand_id: number;
  business_category_ids: number[];
  settings: CampaignSettings;
  title: string;
}

export interface CampaignSettings {
  allow_platform_watermark: boolean;
  watermark_fee_discount_pct?: number;
  fee_pct?: number;
}

export interface CampaignIDResponse extends BaseResponse {
  ad_campaign: CampaignType;
}
export interface WalletType {
  balance: number;
  created_at: string;
  object_id: number;
  object_type: string;
  reserved_balance: number;
  updated_at: string;
  id: number;
}

export interface AdOfferCampaignDetail {
  ad_campaign: {
    archived_at: string | null;
    business_description: string;
    business_name: string;
    created_at: string;
    id: number;
    logo_file_id: number;
    settings: CampaignSettings;
    title: string;
  };
  brand: BrandType;
  business_category_ids: number[];
  log_file?: {
    // Замечу, что здесь, возможно, опечатка, и должно быть "logo_file", а не "log_file", судя по остальной структуре
    id: number;
    link: string;
    name: string;
  };
}
