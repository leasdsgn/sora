"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function DossierForm({ slug, acTagId }: { slug: string; acTagId?: string }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: `dossier-${slug}`, acTagId }),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { source: slug })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-card border border-border rounded-sm p-10 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif font-medium text-foreground text-2xl mb-4">Dossier envoyé.</h2>
        <p className="text-foreground/65 leading-relaxed">
          Vérifiez votre boîte mail. Le dossier complet arrive dans quelques minutes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-8 md:p-12">
      <h2 className="font-serif font-medium text-foreground text-xl md:text-2xl mb-2">
        Recevoir le dossier
      </h2>
      <p className="text-foreground/50 text-sm mb-8">
        Accès immédiat par email. Sans engagement.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="form-label mb-2">Prénom</label>
            <input
              id="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Gabriel"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="form-label mb-2">Nom</label>
            <input
              id="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Lapierre"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="form-label mb-2">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="gabriel@exemple.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label mb-2">Téléphone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full mt-8">
        {status === "loading" ? "Envoi en cours..." : "Recevoir le dossier gratuitement"}
      </Button>

      {status === "error" && (
        <p className="mt-4 text-destructive text-sm text-center">
          Une erreur est survenue. Réessayez ou contactez-nous directement.
        </p>
      )}

      <p className="mt-6 metadata text-foreground/35 text-center">
        Sans démarchage commercial / Désinscription en 1 clic
      </p>
    </form>
  )
}
