import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.isaacventas.com").trim();
  let baseUrl = "https://www.isaacventas.com";
  try {
    baseUrl = new URL(rawBaseUrl).origin;
  } catch {
    baseUrl = "https://www.isaacventas.com";
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
