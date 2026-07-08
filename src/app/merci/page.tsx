"use client"
import { Suspense, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function MerciContent() {
  const fired = useRef(false)
  const searchParams = useSearchParams()
  const source = searchParams.get("utm_source") || "vsl"

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    window.fbq?.("track", "Lead", {
      content_name: `rdv-${source}`,
      value: 149000,
      currency: "EUR",
    })
  }, [source])

  return (
    <div className="max-w-lg text-center">
      <p className="font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
        Votre appel est confirmé.
      </p>
      <p className="text-muted-foreground mt-6 leading-relaxed">
        Gabriel va analyser votre situation et préparer des projections personnalisées avant votre échange.
        Vous recevrez un email de confirmation avec les détails du rendez-vous.
      </p>
      <div className="mt-10 space-y-4">
        <a href="/seseh" className="cta-primary font-serif font-semibold inline-block">
          Découvrir le projet Seseh
        </a>
        <p className="metadata text-muted-foreground/40">
          En attendant votre appel, explorez nos réalisations.
        </p>
      </div>
    </div>
  )
}

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <Suspense>
        <MerciContent />
      </Suspense>
    </main>
  )
}
