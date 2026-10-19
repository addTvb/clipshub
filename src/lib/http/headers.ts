import { AxiosHeaders, type AxiosRequestHeaders } from "axios";

export const getHeaderFromConfig = (
  headers: AxiosHeaders | AxiosRequestHeaders,
  name: string
): string | undefined => {
  if (headers instanceof AxiosHeaders) {
    const raw = headers.get(name) ?? headers.get(name.toLowerCase());
    return raw == null ? undefined : String(raw);
  }
  const plain = headers as AxiosRequestHeaders;
  const direct = (plain as Record<string, unknown>)[name];
  const lower = (plain as Record<string, unknown>)[name.toLowerCase()];
  return direct == null && lower == null
    ? undefined
    : String((direct ?? lower) as unknown);
};

export const setHeaderOnConfig = (
  headers: AxiosHeaders | AxiosRequestHeaders,
  name: string,
  value: string
): void => {
  if (headers instanceof AxiosHeaders) {
    headers.set(name, value);
    return;
  }
  const plain = headers as AxiosRequestHeaders;
  (plain as Record<string, string>)[name] = value;
  (plain as Record<string, string>)[name.toLowerCase()] = value;
};


