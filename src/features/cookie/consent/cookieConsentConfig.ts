import { COOKIE_CONSENT_NAME } from "src/config/cookies";
import type { CookieConsentConfig } from "vanilla-cookieconsent";
import type { useTranslations } from "next-intl";

export const getConfig = (t: ReturnType<typeof useTranslations>) => {
  const config: CookieConsentConfig = {
    cookie: {
      name: COOKIE_CONSENT_NAME,
    },
    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {},
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: t("cookieTitle"),
            description: t.raw("cookieDescription"),
            acceptAllBtn: t("acceptAll"),
            acceptNecessaryBtn: t("onlyNecessary"),
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Accept current selection",
            closeIconLabel: "Close modal",
            sections: [
              {
                title: "Somebody said ... cookies?",
                description: "I want one!",
              },
              {
                title: "Strictly Necessary cookies",
                description:
                  "These cookies are essential for the proper functioning of the website and cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Performance and Analytics",
                description:
                  "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
                linkedCategory: "analytics",
              },
              {
                title: "More information",
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
              },
            ],
          },
        },
      },
    },
  };

  return config;
};
