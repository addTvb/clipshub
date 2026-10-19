/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useRef, useEffect, useState } from "react";
import { useAuthStore } from "src/store/auth";
import { useGetUser } from "src/queries/useGetUser";
import { TawkUser } from "src/types/tawk";
import "src/types/tawk";

export default function TawkMessenger() {
  const tawkMessengerRef = useRef<any>(null);
  const { isAuthenticated } = useAuthStore();
  const [isWidetAuthenticated, setIsWidetAuthenticated] = useState(false);
  const { user} = useGetUser();

  const TawkLogin = async () => {
    if (!user?.email || !user?.id) {
      console.warn("User data is incomplete");
      return;
    }

    try {
      const response = await fetch("/api/tawk-hash");
      if (!response.ok) {
        throw new Error(`Failed to fetch hash: ${response.statusText}`);
      }

      const { hash } = await response.json();

      if (window.Tawk_API) {
        const userData: TawkUser = {
          name: {
            first: user.name || "",
            last: user.surname || "",
          },
          email: user.email,
          userId: user.id.toString(),
          userType: user.type || "user",
          hash,
        };

        window.Tawk_API?.login?.(userData, (error) => {
          if (error) {
            console.error("Tawk.to login failed:", error);
          } else {
            setIsWidetAuthenticated(true);
          }
        });
      } else {
        console.warn("Tawk_API is not available");
      }
    } catch (error) {
      console.error("Error during Tawk.to login:", error);
    }
  };

  const handleTawkAuth = () => {
    if (isAuthenticated && user) {
      TawkLogin();
    } else if (isWidetAuthenticated) {
      window.Tawk_API?.logout?.();
      setIsWidetAuthenticated(false);
    }
  };

  useEffect(() => {
    handleTawkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isAuthenticated, user]);

  return (
    <TawkMessengerReact
      ref={tawkMessengerRef}
      propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
      widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
    />
  );
}
