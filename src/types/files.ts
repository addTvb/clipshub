import { BaseResponse } from "./base";

export interface FileResponse extends BaseResponse {
  file: {
    id: number;
    link: string;
    name: string;
  };
}
export interface FilesRequest {
  type: UploadFileType;
  file: File;
}
export type UploadFileType =
  | "ad_campaign_logo"
  | "ad_offer_banner_image"
  | "ad_offer_banner_video"
  | "business_terms_signature"
  | "clipper_terms_signature"
  | "ad_offer_clipper_avatar";
