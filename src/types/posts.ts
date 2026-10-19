import { BaseResponse, FileType, PaginationType, RejectReason } from "./base";

export interface PostsListResponse extends BaseResponse {
  list: PostType[];
  paginate: PaginationType;
}
export interface PostType {
  creator: {
    company_name: string;
    icon: FileType;
    id: number;
    name: string;
    surname: string;
  };
  media_channel_post: {
    id: number;
    like_count: number;
    media_channel_id: number;
    preview_image: {
      id: number,
      link: string,
      name: string
    },
    public_at: string;
    title: string;
    url: string;
    view_count: number;
  };
  post: {
    ad_offer_id: number;
    created_at: string;
    created_by: number;
    finished_at: string;
    id: number;
    media_channel_id: number;
    media_channel_post_id: number;
    status: PostStatusType;
    updated_at: string;
    failed_moderation_checks?: string[];
    moderation_reject_reasons?: RejectReason[];
  };
  post_payment: {
    sum_dept: number;
    sum_paid: number;
    view_paid: number;
    sum_reserved: number;
  };
}
export type PostStatusType =
  | "created"
  | "moderation"
  | "approved"
  | "archived"
  | "rejected"
  | "closed"
  | "revoked";


