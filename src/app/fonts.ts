import { Host_Grotesk } from "next/font/google";

export const mainFont = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const mainFontClass = "font-[var(--font-host-grotesk)]";
