import type { Metadata } from "next"
import { Agentation } from "agentation"
import { Hanken_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import { type NavRealisation } from "@/components/layout/navbar"
import { SiteChrome, ConditionalSmoothScroll, DevAgentation } from "@/components/layout/site-chrome"
import CookieBanner from "@/components/layout/cookie-banner"
import { sanityFetch } from "../../sanity/lib/fetch"
import { NAV_REALISATIONS_QUERY } from "../../sanity/lib/queries"
import "./globals.css"

const eightly = localFont({
  src: [
    { path: "../../public/fonts/eightlyteenage-light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-lightitalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-mediumitalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-eightly",
  display: "swap",
})

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const title = "SORA Immobilier | Investir à Bali clé en main"
const description = "Accédez à des projets immobiliers sélectionnés à Bali, avec structuration juridique, suivi terrain et gestion locative clé en main."
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sora-five-sigma.vercel.app")
const ogImageUrl = new URL("/og-image.jpg", siteUrl)
const faviconUrl = new URL("/favicon.ico", siteUrl)

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  icons: {
    icon: [{ url: faviconUrl }],
    shortcut: [{ url: faviconUrl }],
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SORA Immobilier",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 675,
        alt: "SORA Immobilier, investir à Bali clé en main",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
}

const STATUS_LABEL: Record<string, NavRealisation["status"]> = {
  "en-cours": "En cours",
  "prochainement": "Prochainement",
  "livre": "Livré",
}

type NavRealisationRaw = {
  slug: string
  status?: string
  location?: string
  cardTitle?: string
  heroTitle?: string
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const raw = await sanityFetch<NavRealisationRaw[]>({ query: NAV_REALISATIONS_QUERY, tags: ["realisation"] })
  const navRealisations: NavRealisation[] = raw.map((r) => ({
    slug: r.slug,
    status: STATUS_LABEL[r.status || "en-cours"] || "En cours",
    location: r.location || "",
    title: r.cardTitle || r.heroTitle || "",
  }))

  return (
    <html lang="fr" className={`${eightly.variable} ${hanken.variable}`}>
      <body>
        <ConditionalSmoothScroll>
          <SiteChrome realisations={navRealisations} />
          {children}
          {process.env.NODE_ENV === "development" && (
            <DevAgentation>
              <Agentation />
            </DevAgentation>
          )}
          <CookieBanner />
        </ConditionalSmoothScroll>
      </body>
    </html>
  )
}
