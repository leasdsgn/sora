import type { MetadataRoute } from "next"

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sora-immobilier.com")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/", "/merci", "/merci/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  }
}
