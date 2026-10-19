export interface ContactUsRequest {
  about: string;
  brand_name: string;
  business_category_ids: number[];
  email: string;
  phone?: string;
  messenger?: string;
  language?: string;
}

export interface ContactUsResponse {
  detail: {
    business_category_ids: number[];
    request: {
      about: string;
      brand_name: string;
      created_at: string;
      email: string;
      id: number;
      phone: string;
      processed_at: string;
    };
  };
  status: "ok";
}
