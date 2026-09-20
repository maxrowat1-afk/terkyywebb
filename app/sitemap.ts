import type { MetadataRoute } from "next";

const site = "https://www.dneskoucuju.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site}/`,
      lastModified: "2026-09-20",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site}/obchodni-podminky.html`,
      lastModified: "2026-09-20",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/ochrana-soukromi.html`,
      lastModified: "2026-09-20",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
