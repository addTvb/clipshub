export const getClientAcceptLanguage = (): string => {
  if (typeof navigator === "undefined") return "";
  if (Array.isArray(navigator.languages) && navigator.languages.length) {
    return navigator.languages.join(",");
  }
  return navigator.language || "";
};


