import { AdType, BaseResponse, FileType, PaginationType } from "./base";
import { AdOfferType } from "./offers";
import { SocialPlatform } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

export interface AllBrandsResponse extends BaseResponse {
  brands: Array<BrandType>;
  paginate: PaginationType;
}

export interface BrandType {
  business_category_id?: number;
  created_at?: string;
  description?: string;
  id?: number;
  logo_file?: FileType;
  owner_user_id?: number;
  title?: string;
  updated_at?: string;
}

export interface AllBrandsParams {
  page?: number;
  per_page?: number;
  sort?: "created_at" | "-created_at" | "title" | "-title";
}

export interface CreateBrandRequest {
  description?: string;
  logo_file_id?: number;
  title: string;
  business_category_id?: number;
}

export interface BrandWithOffersCount {
  brand: BrandType;
  offers_count: number;
  media_channel_types: SocialPlatform[];
  media_channel_category_ids: number[];
  max_total_max_profit: string;
  max_payout_cmp_price: string | null;
  max_payout_pricing_mode: string;
}

export interface ListBrandsWithOffersParams {
  page?: number;
  per_page?: number;
  sort?: "created_at" | "-created_at" | "id" | "-id";
  integration_types?: AdType[];
  media_channel_id?: number;
  media_channel_category_ids?: number[];
  media_channel_type?: SocialPlatform;
  language_ids?: number[];
  business_category_ids?: number[];
  search?: string;
}

export interface ListBrandsWithOffersResponse extends BaseResponse {
  ad_offer_types: AdOfferType[];
  brands: BrandWithOffersCount[];
  paginate: PaginationType;
}
