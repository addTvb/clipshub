"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider, IntlErrorCode, AbstractIntlMessages } from "next-intl";

interface IntlErrorProviderProps {
  children: ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}

export function IntlErrorProvider({ children, messages, locale }: IntlErrorProviderProps) {
  // Обработка ошибок для клиентских компонентов
  function onError(error: { code: string; message: string }) {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      // Логируем отсутствующие переводы только в режиме разработки
      if (process.env.NODE_ENV === 'development') {
        console.warn('Missing translation (client):', error.message);
      }
    } else {
      // Другие ошибки могут указывать на баги в приложении
      console.error('Internationalization error (client):', error);
    }
  }

  // Fallback для отсутствующих переводов на клиенте
  function getMessageFallback({ namespace, key, error }: { 
    namespace?: string; 
    key: string; 
    error: { code: string } 
  }) {
    const path = [namespace, key].filter((part) => part != null).join('.');
    
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      // В режиме разработки показываем путь к отсутствующему переводу
      if (process.env.NODE_ENV === 'development') {
        return `[Missing: ${path}]`;
      }
      // В продакшене просто возвращаем ключ
      return path;
    } else {
      return `[Error: ${path}]`;
    }
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="UTC"
      onError={onError}
      getMessageFallback={getMessageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
} 