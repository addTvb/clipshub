"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { useTranslations } from "next-intl";
import { getConfig } from "./cookieConsentConfig";

const CookieConsentComponent = () => {
  const t = useTranslations("cookieConsent");

  useEffect(() => {
    CookieConsent.run(getConfig(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default CookieConsentComponent;
