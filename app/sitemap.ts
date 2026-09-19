import type { MetadataRoute } from "next";

const site = "https://www.dneskoucuju.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site}/obchodni-podminky.html`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/ochrana-soukromi.html`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
