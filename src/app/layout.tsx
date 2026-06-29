import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import SmoothScroll from "@/components/smooth-scroll"
import Navbar from "@/components/layout/navbar"
import TopLanguette from "@/components/layout/top-languette"
import "./globals.css"

const nohemi = localFont({
  src: [
    { path: "../../public/fonts/Nohemi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Nohemi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Nohemi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Nohemi-SemiBold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
})

const mori = localFont({
  src: [
    { path: "../../public/fonts/PPMori-Book.otf", weight: "350", style: "normal" },
    { path: "../../public/fonts/PPMori-BookItalic.otf", weight: "350", style: "italic" },
    { path: "../../public/fonts/PPMori-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PPMori-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/PPMori-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-mori",
  display: "swap",
})


export const metadata: Metadata = {
  title: "SORA Immobilier | Investissez à Bali dès 10 000€",
  description: "Accédez aux meilleurs projets immobiliers de Bali. Villas premium, 13% de rendement net, gestion 100% déléguée.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nohemi.variable} ${mori.variable}`}>
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
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=949873927292995&ev=PageView&noscript=1" alt="" />
        </noscript>
        <SmoothScroll>
          <Navbar />
          <TopLanguette />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
