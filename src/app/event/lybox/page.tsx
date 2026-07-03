"use client"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Footer from "@/components/layout/footer"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const PROGRAMME = [
  { time: "0:00", label: "Intro Thomas (Lybox)", desc: "Contexte Lybox, pourquoi Bali" },
  { time: "0:05", label: "Présentation Gabriel", desc: "Marché Bali 2026, Seseh Sunset Villas, chiffres réels" },
  { time: "0:30", label: "Q&A modéré", desc: "Thomas lit les questions du chat, Gabriel répond" },
  { time: "0:45", label: "CTA + closing", desc: "Dossier complet + RDV personnalisé avec Gabriel" },
]

export default function EventLyboxPage() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    investExperience: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "event-lybox" })

    const ctx = gsap.context(() => {
      gsap.from(".ev-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.3,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { value: 0, currency: "EUR" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main ref={ref}>
      <section className="min-h-screen bg-bg px-6 py-24 md:py-36">
        <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: content */}
          <div>
            <div className="ev-fade inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="tertiary text-accent">Places limitées</span>
            </div>

            <p className="ev-fade eyebrow mb-3">Webinaire / Lybox x Sora / 50 min</p>
            <p className="ev-fade text-ink/60 text-sm font-medium mb-6">Lundi 21 juillet 2025 · 12h30 (heure de Paris)</p>
            <h1
              className="ev-fade font-serif font-medium text-ink leading-[0.95]"
              style={{ fontSize: "clamp(36px,5vw,72px)" }}
            >
              Investir à Bali en 2026 : les chiffres réels.
            </h1>
            <p className="ev-fade text-ink/75 mt-8 leading-relaxed text-lg">
              Un webinaire co-animé par Gabriel Lapierre (ingénieur résident à Bali, fondateur Sora)
              et Thomas (fondateur Lybox). Pas de pitch, des données terrain.
            </p>

            {/* Programme */}
            <div className="ev-fade mt-10">
              <p className="eyebrow mb-6">Programme</p>
              <div className="space-y-4">
                {PROGRAMME.map((p) => (
                  <div key={p.time} className="flex gap-4">
                    <span className="metadata text-accent w-10 shrink-0 pt-0.5">{p.time}</span>
                    <div>
                      <p className="text-ink text-sm font-medium">{p.label}</p>
                      <p className="text-ink/50 text-sm">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intervenants */}
            <div className="ev-fade mt-10 grid grid-cols-2 gap-4">
              <div className="bg-bg-soft border border-line rounded-sm p-5">
                <p className="font-serif font-medium text-ink text-base">Gabriel Lapierre</p>
                <p className="metadata text-ink/50 mt-1">Fondateur Sora / Ingénieur Arts et Métiers</p>
                <p className="text-ink/60 text-sm mt-3">Résident à Bali, 3 projets livrés, 40 investisseurs accompagnés.</p>
              </div>
              <div className="bg-bg-soft border border-line rounded-sm p-5">
                <p className="font-serif font-medium text-ink text-base">Thomas</p>
                <p className="metadata text-ink/50 mt-1">Fondateur Lybox / SaaS immo</p>
                <p className="text-ink/60 text-sm mt-3">Plateforme d&apos;analyse immobilière utilisée par 100k+ investisseurs.</p>
              </div>
            </div>

            <p className="ev-fade mt-8 metadata text-ink/40">
              Replay envoyé uniquement aux inscrits / Google Meet
            </p>
          </div>

          {/* Right: form */}
          <div className="ev-fade">
            {status === "success" ? (
              <div className="bg-bg-soft border border-line rounded-sm p-10 md:p-12 text-center sticky top-24">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif font-medium text-ink text-2xl mb-4">
                  Inscription confirmée.
                </h2>
                <p className="text-ink/65 leading-relaxed">
                  Vous recevrez un email de confirmation avec le lien Google Meet
                  et un rappel la veille du webinaire.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 sticky top-24"
              >
                <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                  Réserver ma place
                </h2>
                <p className="text-ink/50 text-sm mb-8">
                  50 places maximum. Replay réservé aux inscrits.
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
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
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
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="investExperience" className="form-label mb-2">
                      Avez-vous déjà investi à l&apos;étranger ?
                    </label>
                    <select
                      id="investExperience"
                      value={form.investExperience}
                      onChange={(e) => setForm({ ...form, investExperience: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Sélectionner</option>
                      <option value="non">Non, c&apos;est ma première fois</option>
                      <option value="france">Oui, en France uniquement</option>
                      <option value="etranger">Oui, à l&apos;étranger</option>
                      <option value="bali">Oui, déjà à Bali</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-8 bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-bg hover:text-ink transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Inscription en cours..." : "Confirmer ma place"}
                </button>

                {status === "error" && (
                  <p className="mt-4 text-red-400 text-sm text-center">
                    Une erreur est survenue. Réessayez ou contactez-nous directement.
                  </p>
                )}

                <p className="mt-6 metadata text-ink/35 text-center">
                  Gratuit / Sans engagement / Replay envoyé après le live
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
