import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    // Sample projects are excluded until real work replaces them.
    ...projects
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: `${base}/portfolio/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
