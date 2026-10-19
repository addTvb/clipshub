import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Host Grotesk"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ['"Host Grotesk"', "system-ui"],
        mono: ["Consolas", "Monaco", "monospace"],
        host: ["var(--font-host-grotesk)", "system-ui", "sans-serif"],
        aktiv: ["var(--font-aktiv-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        screenMaxWidth: "1440px",
        contentMaxWidth: "1051px",
      },
      minWidth: {
        contentMaxWidth: "1051px",
      },
      height: {
        screenWithHeader: "calc(100vh - 90px)",
      },
      boxShadow: {
        inputShadow: "0 0 0px 3px rgba(49, 136, 170, 0.10)",
        inputShadowActive: "0 0 0px 3px rgba(49, 136, 170, 0.15)",
        borderShadow: "0 0 0px 2px rgba(49, 136, 170, 0.5)",
        cardShadow: "0px -6px 22px 0px rgba(13, 41, 74, 0.10)",
        dropdownShadow: "0px 4px 8.1px 0px rgba(13, 41, 74, 0.10)",
        statCardShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        imageShadow: "0px 4px 18.3px 0px rgba(13, 41, 74, 0.10)",
        popoverShadow: "0 4px 8px -1px rgba(13,41,74,.1)",
        sliderShadow: "0px 0px 0px 2px #8D8BED",
        leaderboardWidgetShadow: "0 4px 8px 0 rgba(13, 41, 74, 0.10)",
        leaderboardWidgetItemShadow: "0 4px 8px 0 rgba(13, 41, 74, 0.10)",
      },
      backgroundImage: {
        primaryButton:
          "linear-gradient(90deg, #4DADE2 0%, #177C9C 50.73%, #13626C 100%)",
        primaryButtonHover:
          "linear-gradient(90deg, #4098C9 0%, #1A6A84 50.73%, #0E4D56 100%)",
        primary:
          "radial-gradient(829.13% 137.86% at 2.94% 0%, #4DADE2 0%, #177C9C 58.14%, #13626C 100%)",
        blueGrad1:
          "radial-gradient(829.13% 137.86% at 2.94% 0%, #4DADE2 0%, #177C9C 58.14%, #13626C 100%)",
        blueGrad1Hover:
          "radial-gradient(829.13% 137.86% at 2.94% 0%, #4098C9 0%, #1A6A84 58.14%, #0E4D56 100%)",
        orangeGrad: "linear-gradient(233deg, #FFA14A 4.83%, #FDB9AB 87.14%)",
        purpleGrad:
          "radial-gradient(circle at 5% 5%, #E6E6FF 0%, #ABAEFF 100%)",
        blueLightGrad:
          "radial-gradient(50% 50% at 50% 50%, #D6E7ED 0%, #F0FBFE 100%)",
        orangeLight:
          "radial-gradient(50% 50% at 50% 50%, #EFC280 0%, #FFF0C9 100%)",
        purpleLight:
          "radial-gradient(124.16% 48.93% at 68.16% 46.2%, #AFAEF0 0%, #F2F2FF 100%)",
        radialBlue:
          "radial-gradient(50% 50% at 50% 50%, #ABE0FB  0%, rgba(232, 247, 255, 0.00) 100%)",
        radialBlue2:
          "radial-gradient(50% 50% at 50% 50%, #CDCCFF  0%, rgba(232, 247, 255, 0.00) 100%)",
        redGrad: "linear-gradient(233deg, #FD5959 4.83%, #FDABAB 87.14%)",
        pinkGrad: "linear-gradient(233deg, #FD599E 4.83%, #FDABBE 87.14%)",
        contrastPinkGrad:
          "linear-gradient(233deg, #FD59F6 4.83%, #F1ABFD 87.14%)",
        violetGrad: "linear-gradient(233deg, #A159FD 4.83%, #C0ABFD 87.14%);",
        blueGrad: "linear-gradient(233deg, #5C59FD 4.83%, #ABC2FD 87.14%)",
        purpleTextGrad:
          "radial-gradient(114.42% 114.42% at 100% 27.27%, #8D8BED 0%, #CDCCFF 64.5%)",
        refGradeInfluencerClipper:
          "radial-gradient(91% 62.23% at 50% 0%, #FFECE0 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeBigClipper:
          "radial-gradient(91% 62.23% at 50% 0%, #F9E8FF 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeMediumClipper:
          "radial-gradient(91% 62.23% at 50% 0%, #E5EDFF 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeSmallClipper:
          "radial-gradient(91% 62.23% at 50% 0%, #EBFFE6 0%, rgba(255, 255, 255, 0.00) 100%)",
        smallClipperUpgrade:
          "linear-gradient(90deg, rgba(235, 255, 230, 0) 0%, rgba(235, 255, 230, 0.15) 20%, rgba(235, 255, 230, 0.7) 40%, rgba(235, 255, 230, 1) 50%, rgba(235, 255, 230, 0.7) 60%, rgba(235, 255, 230, 0.15) 80%, rgba(235, 255, 230, 0) 100%)",
        refGradeBigClipperTableBadge:
          "linear-gradient(90deg, #F9E8FF 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeMediumClipperTableBadge:
          "linear-gradient(90deg, #E5EDFF 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeSmallClipperTableBadge:
          "linear-gradient(90deg, #EBFFE6 0%, rgba(255, 255, 255, 0.00) 100%)",
        refGradeInfluencerClipperTableBadge:
          "linear-gradient(90deg, #FFECE0 0%, rgba(255, 255, 255, 0.00) 100%)",
        blueGrad2:
          "radial-gradient(circle at 3% 0%, rgba(77, 173, 226, 1) 0%, rgba(19, 44, 108, 1) 100%)",
        cpmComparisonTableGrad:
          "linear-gradient(268deg, #40A1D1 27.94%, rgba(57, 184, 255, 0.00) 48.53%), radial-gradient(262.62% 61.42% at 96.37% 100%, #E230FF 0%, #1D4EFF 100%)",
        keyChallengesGrad:
          "radial-gradient(20.55% 80% at 0% 0%, rgba(68, 165, 215, 0.90) 0%, rgba(18, 22, 45, 0.00) 100%)",
        leaderboardWidgetGrad:
          "radial-gradient(144.12% 103.72% at 0% -4.63%, #E2EEFF 0%, #F1EFFF 10%, #FFF 33.78%)",
        leaderboardWidgetGradMobile:
          "radial-gradient(91.15% 90.62% at 3.92% 0.25%, #FFF 0%, rgba(255, 255, 255, 0.00) 58.38%)",
        widgetGradeGold: "linear-gradient(190deg, #FFF4E2 3.81%, #FFF 18.81%)",
        widgetGradeSilver:
          "linear-gradient(190deg, #F3F3F3 3.81%, #FFF 18.81%)",
        widgetGradeBronze:
          "linear-gradient(190deg, #FFEEE2 3.81%, #FFF 18.81%)",
        leaderboardWidgetShowMoreGrad:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 41.04%)",
        notFoundVideoGradient:
          "linear-gradient(90deg, rgba(243, 246, 250, 0.00) 0%, #F3F6FA 100%)",
        premiumGradient:
          "linear-gradient(183deg, #40A1D1 -5.55%, rgba(57, 184, 255, 0.00) 86.36%), radial-gradient(237.15% 149.35% at 100% 38.89%, #E230FF 0%, #1D4EFF 100%)",
      },
      colors: {
        textColor: "#010d22",
        dark900: "#252236",
        dark100: "#090C10",
        dark200: "#121629",
        black900: "#010322",
        black500: "#1E213B",
        black400: "#303948",
        black1000: "#090C10",
        white50: "#F3F6FA",
        white200: "#E6EBF2",
        white400: "#CAD3DF",
        gray50: "#FAFBFD",
        gray100: "#F3F6FA",
        gray200: "#E6EBF2",
        gray300: "#DFE3EA",
        gray350: "#7083A6",
        gray400: "#586781",
        gray500: "#B3B7BD",
        gray550: "#97A8C6",
        gray600: "#848D9B",
        gray700: "#DDDFE4",
        blueLight: "#E7F4FB",
        blue75: "#D2E7EF",
        blue100: "#A8CAD8",
        blue300: "#3188AA",
        blue400: "#1D5E78",
        green100: "#00B69B",
        success: "#00B69B",
        amber: "#F8E5CA",
        amber600: "#B1803A",
        error: "#DD4343",
        red100: "#F07676",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        xl: "1440px",
        "3xl": "1920px",
        xsm: "460px",
        // Кастомные брейкпоинты для leaderboard grid
        "grid-4": "640px", // 4 колонки
        "grid-5": "876px", // 5 колонок (увеличено для комфортного размера карточек)
        "grid-6": "1024px", // 6 колонок
        "grid-7": "1280px", // 7 колонок
        "grid-8": "1536px", // 8 колонок
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "gradient-x": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "200% 50%",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 2s linear infinite reverse",
        shimmer: "shimmer 1.5s ease-in-out infinite",
      },
      aspectRatio: {
        "8/10": "8 / 10",
        "1/2": "1 / 2",
        "2/1": "2 / 1",
        "9/16": "9 / 16",
        "3/5": "3 / 5",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
