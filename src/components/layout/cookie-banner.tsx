"use client"
import { useEffect, useState } from "react"
import Script from "next/script"

const CONSENT_KEY = "sora_cookie_consent"

function getConsent(): "accepted" | "refused" | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`))
  return match ? (match[1] as "accepted" | "refused") : null
}

function setConsent(value: "accepted" | "refused") {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  document.cookie = `${CONSENT_KEY}=${value};path=/;expires=${d.toUTCString()};SameSite=Lax`
}

export default function CookieBanner() {
  const [consent, setConsentState] = useState<"accepted" | "refused" | null | "pending">("pending")

  useEffect(() => {
    setConsentState(getConsent())
  }, [])

  const accept = () => {
    setConsent("accepted")
    setConsentState("accepted")
  }

  const refuse = () => {
    setConsent("refused")
    setConsentState("refused")
  }

  if (consent === "pending") return null

  return (
    <>
      {consent === "accepted" && (
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
      )}

      {consent === null && (
        <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6">
          <div className="max-w-lg mx-auto bg-primary border border-background/10 rounded-sm p-5 md:p-6 shadow-2xl">
            <p className="text-background/90 text-sm leading-relaxed">
              Ce site utilise des cookies pour mesurer l&apos;audience et améliorer votre expérience.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={accept}
                className="flex-1 bg-background text-primary font-serif font-semibold text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-full hover:bg-accent hover:text-background transition-colors duration-300"
              >
                Accepter
              </button>
              <button
                onClick={refuse}
                className="flex-1 border border-background/30 text-background font-serif font-semibold text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-full hover:border-background/60 transition-colors duration-300"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
