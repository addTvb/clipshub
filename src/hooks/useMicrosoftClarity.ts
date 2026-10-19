import { useCallback } from "react";
import type { ClarityUserProperties, ClarityEventProperties } from "src/types/microsoft-clarity";

export const useMicrosoftClarity = () => {
  const setUserId = useCallback((userId: string) => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("set", "user_id", userId);
    }
  }, []);

  const setUserEmail = useCallback((email: string) => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("set", "user_email", email);
    }
  }, []);

  const setUserType = useCallback((userType: string) => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("set", "user_type", userType);
    }
  }, []);

  const trackEvent = useCallback((eventName: string, properties?: ClarityEventProperties) => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("event", eventName, properties);
    }
  }, []);

  const identify = useCallback((userId: string, userProperties?: ClarityUserProperties) => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("identify", userId, userProperties);
    }
  }, []);

  return {
    setUserId,
    setUserEmail,
    setUserType,
    trackEvent,
    identify,
  };
}; 