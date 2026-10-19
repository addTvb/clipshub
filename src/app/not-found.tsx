import "./globals.css";
import type { Metadata } from "next";
import { NotFoundPage } from "src/widgets/not-found/NotFoundPage";
import { getMainFontClass } from "./[locale]/fonts";
import { DEFAULT_LOCALE } from "src/i18n/routing";
import { cookies } from "next/headers";
import { NEXT_LOCALE } from "src/config/cookies";
import { LOCALES } from "src/i18n/routing";
import { IntlErrorProvider } from "src/components/providers/IntlErrorProvider";
import { loadMessagesForLocale } from "src/i18n/loadMessages";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default async function GlobalNotFound({
  params,
}: {
  params?: { locale?: string };
}) {
  let locale = params?.locale;

  if (!locale || !LOCALES.includes(locale)) {
    try {
      const cookieStore = await cookies();
      const cookieLocale = cookieStore.get(NEXT_LOCALE)?.value;
      locale =
        cookieLocale && LOCALES.includes(cookieLocale)
          ? cookieLocale
          : DEFAULT_LOCALE;
    } catch {
      locale = DEFAULT_LOCALE;
    }
  }

  const messages = await loadMessagesForLocale(locale);
  const mainFontClass = getMainFontClass(locale);
  
  return (
    <html lang={locale} className={mainFontClass}>
      <body className="bg-white50">
        <IntlErrorProvider messages={messages} locale={locale}>
          <NotFoundPage />
        </IntlErrorProvider>
      </body>
    </html>
  );
}
