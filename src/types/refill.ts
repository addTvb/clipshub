import { Currency, BaseResponse, PaymentMethodType, PaymentStatus } from "./base";

export interface RefillRequest {
  amount_usd: number;
  currency: Currency;
  method: PaymentMethodType;
  transaction_id: string;
}

export interface RefillRequestItem {
  amount: number;
  amount_usd: number;
  created_at: string;
  currency: Currency;
  error_code: string;
  expires_at: string;
  finished_at: string;
  id: string;
  metadata: {
    [key: string]: string | number | boolean | object;
    payment_url: string;
  },
  method: PaymentMethodType;
  status: PaymentStatus;
  type: "payment_in";
  updated_at: string;
}

export interface RefillResponse extends BaseResponse {
  deposit: RefillRequestItem;
}

export interface DepositsResponse extends BaseResponse {
  deposits: RefillRequestItem[];
}
