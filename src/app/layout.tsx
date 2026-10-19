import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import { Header } from "src/layout/Header";
import "./globals.css";
import TanStackProvider from "./TanStackProvider";
import { STToast } from "src/components/ui/toast";
import clsx from "clsx";
import { frontendBaseUrl } from "src/config/app";
import { mainFont, mainFontClass } from "./fonts";

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

export const dynamic = "force-static";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
        <TanStackProvider>
          <Header />
          <div className="min-h-screen sm:min-h-auto flex-1 flex flex-col">
            {children}
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
