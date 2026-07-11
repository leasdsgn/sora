import type { Metadata } from "next"
import { Agentation } from "agentation"
import { Hanken_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"
import { type NavRealisation } from "@/components/layout/navbar"
import { SiteChrome, ConditionalSmoothScroll, DevAgentation } from "@/components/layout/site-chrome"
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
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '949873927292995');
          fbq('track', 'PageView');
          window.addEventListener('message', function(e) {
            if (e.data && e.data.event === 'calendly.event_scheduled') {
              fbq('track', 'Schedule', { source: 'calendly-booking' });
            }
          });
        `}</Script>
        <ConditionalSmoothScroll>
          <SiteChrome realisations={navRealisations} />
          {children}
          {process.env.NODE_ENV === "development" && (
            <DevAgentation>
              <Agentation />
            </DevAgentation>
          )}
        </ConditionalSmoothScroll>
      </body>
    </html>
  )
}
