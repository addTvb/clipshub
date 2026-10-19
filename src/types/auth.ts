import { BaseResponse, UserType, User, FeatureFlags } from "./base";

export interface SignUpRequest {
  company_name?: string;
  email: string;
  name: string;
  password: string;
  surname: string;
  profile_type: UserType;
  invited_by_user_id?: number;
}
export interface ConfirmEmailRequest {
  temp_token: string;
}
export interface ResendEmailRequest {
  email: string;
}
export interface AuthTokenResponse extends BaseResponse {
  auth_token: string;
  new_user: boolean;
}
export interface SignInRequest {
  email: string;
  password: string;
}
export interface SendRestoreLinkRequest {
  email: string;
}
export interface RestorePasswordRequest {
  password: string;
  temp_token: string;
}
export interface SignInSocialRequest {
  code: string;
  front_url: string;
  invited_by_user_id?: number;
}

export interface UserResponse extends BaseResponse {
  user: User;
  feature_flags?: FeatureFlags;
}

export interface EditUserRequest {
  name?: string;
  surname?: string;
  file_id?: number;
  type?: UserType;
  company_name?: string;
  business_terms_signature_file_id?: number;
  clipper_terms_signature_file_id?: number;
}

export interface SocialAuthenticationResponse extends BaseResponse {
  list: SocialAuthentication[];
}

export interface SocialAuthentication {
  id: number;
  createdAt: string;
  email: string;
  externalId: string;
  isConfirmed: boolean;
  pageUrl: string;
  type: SocialAuthenticationType;
}

export type SocialAuthenticationType =
  | "password"
  | "google"
  | "tiktok"
  | "instagram";

export interface LinkSocialAuthenticationRequest {
  auth_type: SocialAuthenticationType;
  code: string;
  front_url: string;
}
