"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { COOKIE_CONSENT_NAME } from "src/config/cookies";
import type { ClarityConfig } from "src/types/microsoft-clarity";

type MicrosoftClarityProps = ClarityConfig

export default function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isProduction, setIsProduction] = useState<boolean>(false);

  useEffect(() => {
    // Проверяем, что мы в production среде
    const currentEnv = process.env.NEXT_PUBLIC_ENV;
    const isProd = currentEnv === "production";
    setIsProduction(isProd);
    
    if (!isProd) {
      return;
    }
    
    // Проверяем согласие на аналитику
    const checkConsent = () => {
      try {
        const consentData = Cookies.get(COOKIE_CONSENT_NAME);
        if (consentData) {
                  const parsed = JSON.parse(consentData);
          
          // Проверяем новый формат (массив categories)
          if (Array.isArray(parsed.categories)) {
            return parsed.categories.includes('analytics');
          }
          
          // Проверяем старый формат (объект с enabled)
          if (parsed.categories?.analytics?.enabled === true) {
            return true;
          }
        }
        return false;
      } catch {
        return false;
      }
    };

    const updateConsent = () => {
      const newConsent = checkConsent();
      setHasConsent(prevConsent => {
        if (prevConsent !== newConsent) {
          return newConsent;
        }
        return prevConsent;
      });
    };

    // Проверяем начальное состояние
    updateConsent();

    // Слушаем изменения в cookie consent
    const handleStorageChange = () => {
      updateConsent();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Слушаем события от vanilla-cookieconsent
    const handleConsentChange = () => {
      // Небольшая задержка, чтобы cookie успел установиться
      setTimeout(updateConsent, 100);
    };

    const handleFirstAction = () => {
      // Небольшая задержка, чтобы cookie успел установиться
      setTimeout(updateConsent, 100);
    };

    document.addEventListener("cc:onConsent", handleConsentChange);
    document.addEventListener("cc:onFirstAction", handleFirstAction);

    // Дополнительно слушаем изменения cookie через MutationObserver
    const observer = new MutationObserver(() => {
      updateConsent();
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-cc']
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("cc:onConsent", handleConsentChange);
      document.removeEventListener("cc:onFirstAction", handleFirstAction);
      observer.disconnect();
    };
  }, []);

  // Не рендерим скрипт, если не production среда
  if (!isProduction) {
    return null;
  }

  // Не рендерим скрипт, пока не определили согласие
  if (hasConsent === null) {
    return null;
  }

  // Не рендерим скрипт, если нет согласия на аналитику
  if (!hasConsent) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      onLoad={() => {}}
      onError={() => {}}
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${projectId}");
        `,
      }}
    />
  );
} 