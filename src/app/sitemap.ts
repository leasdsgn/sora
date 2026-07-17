import type { MetadataRoute } from "next"
import { sanityFetch } from "../../sanity/lib/fetch"
import {
  SITEMAP_EVENTS_QUERY,
  SITEMAP_GAMMES_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_REALISATIONS_QUERY,
} from "../../sanity/lib/queries"

export const revalidate = 3600

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

type StaticRoute = {
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}

type CmsRoute = {
  slug?: string
  updatedAt?: string
}

type GammeGroup = {
  realisationSlug?: string
  updatedAt?: string
  gammes?: Array<{ slug?: string }>
}

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sora-immobilier.com")

const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/fonctionnement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partenaires", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/events", changeFrequency: "weekly", priority: 0.7 },
  { path: "/masterclass", changeFrequency: "monthly", priority: 0.6 },
  { path: "/villas-ssv", changeFrequency: "monthly", priority: 0.6 },
  { path: "/event/lybox", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
]

function toUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

function cleanSlug(slug?: string) {
  return slug?.replace(/^\/+|\/+$/g, "")
}

function toDate(date?: string) {
  return date ? new Date(date) : new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, realisations, gammeGroups] = await Promise.all([
    sanityFetch<CmsRoute[]>({ query: SITEMAP_POSTS_QUERY, tags: ["post"] }),
    sanityFetch<CmsRoute[]>({ query: SITEMAP_EVENTS_QUERY, tags: ["event"] }),
    sanityFetch<CmsRoute[]>({ query: SITEMAP_REALISATIONS_QUERY, tags: ["realisation"] }),
    sanityFetch<GammeGroup[]>({ query: SITEMAP_GAMMES_QUERY, tags: ["realisation"] }),
  ])

  return [
    ...staticRoutes.map((route) => ({
      url: toUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.flatMap((post) => {
      const slug = cleanSlug(post.slug)
      if (!slug) return []

      return {
        url: toUrl(`/blog/${slug}`),
        lastModified: toDate(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }
    }),
    ...events.flatMap((event) => {
      const slug = cleanSlug(event.slug)
      if (!slug) return []

      return {
        url: toUrl(`/events/${slug}`),
        lastModified: toDate(event.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }
    }),
    ...realisations.flatMap((realisation) => {
      const slug = cleanSlug(realisation.slug)
      if (!slug) return []

      return {
        url: toUrl(`/realisations/${slug}`),
        lastModified: toDate(realisation.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }
    }),
    ...gammeGroups.flatMap((group) => {
      const realisationSlug = cleanSlug(group.realisationSlug)
      if (!realisationSlug) return []

      return (group.gammes || []).flatMap((gamme) => {
        const gammeSlug = cleanSlug(gamme.slug)
        if (!gammeSlug) return []

        return {
          url: toUrl(`/realisations/${realisationSlug}/${gammeSlug}`),
          lastModified: toDate(group.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.75,
        }
      })
    }),
  ]
}
