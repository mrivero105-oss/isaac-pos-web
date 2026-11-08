import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy endurecida (sin 'unsafe-eval' en producción)
const cspHeader = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-eval'" : ""} 'unsafe-inline' https://challenges.cloudflare.com https://js.stripe.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.stripe.com https://vitals.vercel-insights.com https://va.vercel-scripts.com;
    frame-src 'self' https://challenges.cloudflare.com https://js.stripe.com;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    upgrade-insecure-requests;
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
        source: "/(favicon.ico|icon-48x48.png|icon-96x96.png|icon-192x192.png|icon-512x512.png|apple-touch-icon.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
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
