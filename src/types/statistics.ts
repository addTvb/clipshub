import { BaseResponse } from "./base";

export interface StatisticsResponse extends BaseResponse {
  statistics: {
    total_posts: number;
    total_views: number;
    unique_influencers: number;
    draft_offers: number;
    moderating_offers: number;
    moderated_offers: number;
    closed_offers: number;
    paused_offers?: number;
  };
}
export interface PaymentStatsResponse extends BaseResponse {
  summary: {
    paid_sum: number;
    reserved_sum: number;
  };
}
