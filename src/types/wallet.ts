import { BaseResponse } from "./base";

export interface UserWalletResponse extends BaseResponse {
  wallet: {
    balance: number;
    created_at: string;
    object_id: number;
    object_type: "user" | "ad_campaign";
    reserved_balance: number;
    updated_at: string;
    id: number;
  };
}
export interface TransferRequest {
  sum: number;
  transaction_id: string;
}
