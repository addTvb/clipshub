import { BaseResponse, PaymentMethodType, PaymentStatus } from "./base";

export interface CreateWithdrawRequest {
  sum: number;
  wallet_withdraw_credentials_id: number;
}

export interface WalletWithdrawMethods {
  commission_min_amount: number;
  commission_percent: number;
  service_commission_percent: number;
  min_amount: number;
  name: string;
  slug: string;
}
export interface WalletWithdrawMethodsResponse extends BaseResponse {
  items: WalletWithdrawMethods[];
}

export interface WithdrawCreditial {
  comment: string;
  created_at: string;
  data: {
    birthday?: string;
    city?: string;
    comment?: string;
    country?: string;
    email?: string;
    full_name?: string;
    wallet_address?: string;
  }
  id: number;
  withdraw_method_id: PaymentMethodType;
}
export interface WithdrawRequest {
  amount: number;
  created_at: string;
  credentials: WithdrawCreditial;
  id: number;
  status: PaymentStatus;
  updated_at: string;
}
export interface WithdrawRequestResponse extends BaseResponse {
  credentials: WithdrawCreditial[];
  items: WithdrawRequest[];
}
export interface CreatedWithdrawCreditial {
  comment: string;
  withdraw_method_slug: string;
  data: {
    birthday?: string;
    city?: string;
    comment?: string;
    country?: string;
    email?: string;
    full_name?: string;
    wallet_address?: string;
  }
}
export interface CreatedWithdrawCreditialResponse extends BaseResponse {
  credentials: WithdrawCreditial;
}
export interface UpdateWithdrawCreditialRequest {
  comment: string;
}
export interface UpdateWithdrawCreditialResponse extends BaseResponse {
  credentials: WithdrawCreditial;
}
