import { LOCALES } from "src/i18n/routing";

export const isRuAvailable = (
  cfCountry: string | null,
  acceptLang: string,
  currentRuCookie: string,
  firstSegment: string
) => {
  // RU считается только если это ПЕРВЫЙ (основной) язык в Accept-Language
  const primaryLangToken = acceptLang?.split(",")[0]?.trim() || "";
  const primaryLangTag = primaryLangToken?.split(";")[0]?.trim();
  const hasRuInAccept = /^ru(\b|[-_])/i.test(primaryLangTag);
  
  const isCIS = (() => {
    // Список стран СНГ и дружественных для RU (ISO-3166-1 alpha-2)
    const CIS = new Set([
      "RU",
      "BY",
      "KZ",
      "KG",
      "AM",
      "AZ",
      "TJ",
      "TM",
      "UZ",
      "UA",
      "MD",
      "GE",
    ]);
    return cfCountry ? CIS.has(cfCountry.toUpperCase()) : false;
  })();

  const hasLocale = LOCALES.includes(firstSegment);
  const ruExplicit = hasLocale && firstSegment === "ru";

  // "Липкая" логика: если кука уже включает RU, сохраняем её, пока пользователь явно не отключит
  const ruPersisted = currentRuCookie === "1" || currentRuCookie === "true";
  const ruShouldBeAvailable =
    ruPersisted || ruExplicit || hasRuInAccept || isCIS;

  return ruShouldBeAvailable;
};
