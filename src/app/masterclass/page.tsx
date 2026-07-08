"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function MasterclassPage() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mc-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.1,
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
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "replay-conference", acTagId: "60" }),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { value: 149000, currency: "EUR" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section ref={ref} className="min-h-screen bg-bg px-6 py-24 md:py-36">
      <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left: content */}
        <div>
          <p className="mc-fade eyebrow mb-6">Replay / 1h30 / Gratuit</p>
          <h1
            className="mc-fade font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(36px,5vw,72px)" }}
          >
            Investir à Bali : Mythes, Réalités et Vrais Chiffres.
          </h1>
          <p className="mc-fade text-ink/75 mt-8 leading-relaxed text-lg">
            Le replay de la conférence avec Gabriel Lapierre (SORA) et Thomas Cornu (LyBox).
            Données de marché, cadre juridique et retours d&apos;opérations réelles.
          </p>
          <ul className="mc-fade mt-8 space-y-3 text-ink/70 text-[15px]">
            <li className="flex gap-3">
              <span className="text-accent mt-0.5">·</span>
              Le marché immobilier de Bali et ses opportunités 2026
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-0.5">·</span>
              Devenir propriétaire à Bali : leasehold, PT PMA
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-0.5">·</span>
              Investir en société vs en nom propre : le bon arbitrage
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-0.5">·</span>
              Fiscalité française et indonésienne sur vos revenus locatifs
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-semibold mt-0.5">+</span>
              <span>
                <span className="text-accent font-semibold">Bonus</span> : analyse personnalisée de votre profil et de votre trésorerie
              </span>
            </li>
          </ul>
          <p className="mc-fade mt-8 metadata text-ink/40">
            40 investisseurs accompagnés / 3 projets livrés / Depuis 2020
          </p>

          {/* Image visible only on desktop */}
          <div className="mc-fade hidden md:block mt-12 relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src="/villa-render-bedroom.webp"
              alt="Villa Seseh Sunset"
              fill
              quality={95}
              className="object-cover"
              sizes="500px"
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="mc-fade md:sticky md:top-28">
          {status === "success" ? (
            <div className="bg-bg-soft border border-line rounded-sm p-10 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif font-medium text-ink text-2xl mb-4">
                Replay envoyé.
              </h2>
              <p className="text-ink/65 leading-relaxed">
                Vérifiez votre boîte mail. Le lien du replay arrive dans quelques minutes.
                Si vous ne le trouvez pas, regardez vos spams.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-bg-soft border border-line rounded-sm p-8 md:p-12"
            >
              <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                Recevoir le replay
              </h2>
              <p className="text-ink/50 text-sm mb-8">
                Accès immédiat par email. Sans engagement.
              </p>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="form-label mb-2">
                      Prénom
                    </label>
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
                    <label htmlFor="lastName" className="form-label mb-2">
                      Nom
                    </label>
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
                  <label htmlFor="email" className="form-label mb-2">
                    Email
                  </label>
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
                  <label htmlFor="phone" className="form-label mb-2">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-8 bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-bg hover:text-ink transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Envoi en cours..." : "Recevoir le replay gratuitement"}
              </button>

              {status === "error" && (
                <p className="mt-4 text-red-400 text-sm text-center">
                  Une erreur est survenue. Réessayez ou contactez-nous directement.
                </p>
              )}

              <p className="mt-6 metadata text-ink/35 text-center">
                Sans démarchage commercial / Désinscription en 1 clic
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
