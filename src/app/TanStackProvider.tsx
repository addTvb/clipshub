"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import type { STApiError } from "../types/base";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { createContext, useContext, useRef, useEffect } from "react";

const ErrorContext = createContext<{
  handleError: (error: STApiError) => void;
}>({
  handleError: () => {},
});

function ErrorProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("errorCodes");

  const handleError = (error: STApiError) => {
    if (error) {
      const errorCode = error?.response?.data?.error_code;

      let message;
      if (errorCode) {
        message = t(errorCode);
      } else {
        message = error.message;
      }

      toast.error(String(message), { id: String(message) });
    } else {
      const errorMessage =
        t("unknownErrorOccurred") || "Unknown error occurred";
      toast.error(errorMessage, { id: errorMessage });
    }
  };

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {children}
    </ErrorContext.Provider>
  );
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        retry: false,
        staleTime: 60 * 1000,
        throwOnError: () => {
          return false; // Не бросать ошибку в компонент
        },
      },
      mutations: {
        // We'll handle this in the components using the error context
        onError: undefined,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function useErrorHandler() {
  return useContext(ErrorContext);
}

function QueryErrorHandler() {
  const { handleError } = useErrorHandler();
  const queryClientRef = useRef<QueryClient | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      queryClientRef.current = browserQueryClient || null;

      if (queryClientRef.current) {
        const queryUnsubscribe = queryClientRef.current
          .getQueryCache()
          .subscribe((event) => {
            if (event.type === "updated" && event.query.state.error) {
              const skipGlobalErrorHandler =
                event.query.meta?.skipGlobalErrorHandler;
              if (!skipGlobalErrorHandler) {
                handleError(event.query.state.error as STApiError);
              }
            }
          });

        const mutationUnsubscribe = queryClientRef.current
          .getMutationCache()
          .subscribe((event) => {
            if (event.type === "updated" && event.mutation.state.error) {
              const skipGlobalErrorHandler =
                event.mutation.meta?.skipGlobalErrorHandler;
              if (!skipGlobalErrorHandler) {
                handleError(event.mutation.state.error as STApiError);
              }
            }
          });

        return () => {
          queryUnsubscribe();
          mutationUnsubscribe();
        };
      }
    }
  }, [handleError]);

  return null;
}

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <QueryErrorHandler />
        {children}
      </ErrorProvider>
    </QueryClientProvider>
  );
}
