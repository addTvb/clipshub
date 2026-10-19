import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "src/layout/Header";
import "../globals.css";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "src/i18n/routing";
import TanStackProvider from "../TanStackProvider";
import { IntlErrorProvider } from "src/components/providers/IntlErrorProvider";
import { STToast } from "src/components/ui/toast";
import Footer from "src/layout/Footer";
import clsx from "clsx";
import { frontendBaseUrl } from "src/config/app";
import { getMainFont, getMainFontClass } from "./fonts";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Clipshub",
    openGraph: {
      images: [
        {
          url: `${frontendBaseUrl}/static/images/clipshub-link.jpg`,
          width: 843,
          height: 403,
          alt: "ClipsHub Preview",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  const mainFont = getMainFont(locale);
  const mainFontClass = getMainFontClass(locale);

  return (
    <html lang={locale}>
      <body
        className={clsx(
          mainFont.variable,
          inter.variable,
          manrope.variable,
          "antialiased flex flex-col bg-[#F3F6FA] min-h-screen",
          mainFontClass
        )}
      >
        <STToast />
        <IntlErrorProvider messages={messages} locale={locale}>
          <TanStackProvider>
            <Header />
            <div className="min-h-screen sm:min-h-auto flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </TanStackProvider>
        </IntlErrorProvider>
      </body>
    </html>
  );
}
