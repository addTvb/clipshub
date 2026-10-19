"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

export const TriggerConsent = () => {
  const handleTriggerCookieModal = () => CookieConsent.show(true);

  useEffect(() => {
    const consentTriggerBtn = document.querySelector(
      "#ch-trigger-cookie-consent"
    );
    if (consentTriggerBtn) {
      consentTriggerBtn?.addEventListener("click", handleTriggerCookieModal);
    }

    return () => {
      if (consentTriggerBtn) {
        consentTriggerBtn.removeEventListener(
          "click",
          handleTriggerCookieModal
        );
      }
    };
  }, []);

  return null;
};
