import { Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const aktivGroteskCorp = localFont({
  variable: "--font-aktiv-grotesk",
  display: "swap",
  src: [
    {
      path: "../../../public/static/fonts/AktivGroteskCorp-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/static/fonts/AktivGroteskCorp-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/static/fonts/AktivGroteskCorp-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/static/fonts/AktivGroteskCorp-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/static/fonts/AktivGroteskCorp-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

// Функция для получения нужного шрифта в зависимости от локали
export function getMainFont(locale: string) {
  return locale === "ru" ? aktivGroteskCorp : hostGrotesk;
}

export function getMainFontClass(locale: string): string {
  return locale === "ru" ? "font-[var(--font-aktiv-grotesk)]" : "font-[var(--font-host-grotesk)]";
}
