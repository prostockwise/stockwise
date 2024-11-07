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
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    // TODO: add news dates
    // TODO: add news details
    // TODO: add news symbols
  ];
  return sites;
}
