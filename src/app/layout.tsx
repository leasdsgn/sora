import type { Metadata } from "next"
import { Agentation } from "agentation"
import { Hanken_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"
import SmoothScroll from "@/components/smooth-scroll"
import Navbar from "@/components/layout/navbar"
import TopLanguette from "@/components/layout/top-languette"
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        `}</Script>
        <SmoothScroll>
          <Navbar />
          <TopLanguette />
          {children}
          {process.env.NODE_ENV === "development" && <Agentation />}
        </SmoothScroll>
      </body>
    </html>
  )
}
