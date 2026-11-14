import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
const isLocalHttpTarget = isDev || appUrl.startsWith("http://");

// Content Security Policy endurecida (sin 'unsafe-eval' en producción)
const cspHeader = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-eval'" : ""} 'unsafe-inline' https://challenges.cloudflare.com https://js.stripe.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com https://www.google.com https://www.google.co.ve https://*.google.com https://googleads.g.doubleclick.net https://www.googletagmanager.com https://www.googleadservices.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com;
    frame-src 'self' https://challenges.cloudflare.com https://js.stripe.com;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    ${isLocalHttpTarget ? "" : "upgrade-insecure-requests;"}
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Previene fuga de X-Powered-By
  compress: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
