import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl: string = "https://stockwise.pro";
  const sites: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "always",
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "always",
    },
    {
      url: `${baseUrl}/features`,
      lastModified: "2024-12-05",
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/apis`,
      lastModified: "2024-12-05",
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/apis/news-forecast`,
      lastModified: "2024-12-05",
      changeFrequency: "weekly",
    },
  ];
  return sites;
}
