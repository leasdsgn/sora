"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type Props = {
  slug: string
  eventTitle: string
  ctaLabel?: string
  finePrint?: string
  redirectUrl?: string
  crmSource?: string
  freshsalesTag?: string
  acTagId?: string
}

export default function EventForm({
  slug,
  eventTitle,
  ctaLabel,
  finePrint,
  redirectUrl,
  crmSource,
  freshsalesTag,
  acTagId,
}: Props) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          eventSlug: slug,
          crmSource,
          freshsalesTag,
          acTagId,
        }),
      })

      if (res.ok) {
        window.fbq?.("track", "Lead", { source: `event:${slug}` })
        if (redirectUrl) {
          window.open(redirectUrl, "_blank")
        }
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-bg-soft border border-line rounded-sm p-10 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif font-medium text-ink text-2xl mb-4">Inscription confirmée.</h3>
        <p className="text-ink/65 leading-relaxed">
          Vous recevez le lien et les rappels par email dans quelques minutes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-soft border border-line rounded-sm p-8 md:p-10">
      <h3 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
        Réserver ma place
      </h3>
      <p className="text-ink/50 text-sm mb-8">
        Accès immédiat. {eventTitle && `— ${eventTitle}.`}
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ev-firstName" className="form-label mb-2">Prénom</label>
            <input
              id="ev-firstName"
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Gabriel"
            />
          </div>
          <div>
            <label htmlFor="ev-lastName" className="form-label mb-2">Nom</label>
            <input
              id="ev-lastName"
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Lapierre"
            />
          </div>
        </div>

        <div>
          <label htmlFor="ev-email" className="form-label mb-2">Email</label>
          <input
            id="ev-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="gabriel@exemple.com"
          />
        </div>

        <div>
          <label htmlFor="ev-phone" className="form-label mb-2">Téléphone</label>
          <input
            id="ev-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full mt-8">
        {status === "loading" ? "Envoi en cours..." : ctaLabel || "Réserver ma place"}
      </Button>

      {status === "error" && (
        <p className="mt-4 text-destructive text-sm text-center">
          Une erreur est survenue. Réessayez ou contactez-nous directement.
        </p>
      )}

      {finePrint && (
        <p className="mt-6 metadata text-ink/35 text-center">{finePrint}</p>
      )}
    </form>
  )
}
