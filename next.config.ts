/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Landings extract keeps unused modules from the monorepo; runtime pages are verified separately.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    path: "/",
    remotePatterns: [
      {
        hostname: "188.166.95.30",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy locale-prefixed URLs from the previous i18n setup
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  webpack(config: any) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl": path.resolve(__dirname, "src/content/next-intl-shim.tsx"),
    };

    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
