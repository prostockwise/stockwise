import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl: string = "https://stockwise.pro";

  return {
    rules: [
      {
        userAgent: "Twitterbot",
        allow: ["/og"],
        disallow: ["*"],
      },
      {
        userAgent: "*",
        allow: [
          "/",
          "/features",
          "/features/*",
          "/blogs",
          "/blogs/*",
          "/news",
          "/news/*",
        ],
        disallow: ["/api/*", "/_next/*", "/static/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
