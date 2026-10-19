import { BaseResponse } from "./base";

export interface DictionariesResponse extends BaseResponse {
  list: DictionaryType[];
}

export interface DictionaryType {
  slug?: string;
  description?: string;
  icon: string;
  id: number;
  name: string;
}
