"use client"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Footer from "@/components/layout/footer"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const PROGRAMME = [
  { time: "0:00", label: "Thomas introduit le sujet", desc: "Le marché immobilier à Bali vu par un analyste data" },
  { time: "0:05", label: "Gabriel : observer avant d'investir", desc: "Ce que les chiffres révèlent sur le marché balinais en 2025" },
  { time: "0:15", label: "La vague Bali", desc: "Vacanciers, expatriés, investisseurs : pourquoi cette île change de dimension" },
  { time: "0:25", label: "Seseh Sunset Villas", desc: "26 villas, 4 gammes, projections financières réelles" },
  { time: "0:35", label: "Cadre juridique et fiscal", desc: "PT PMA, leasehold 30+30, sécurisation de l'investissement" },
  { time: "0:45", label: "Q&A en direct", desc: "Thomas modère, Gabriel répond" },
]

const PHOTOS = [
  { src: "/seseh/exception/living.jpg", alt: "Salon villa Exception" },
  { src: "/seseh/signature/terrace.jpg", alt: "Terrasse villa Signature" },
  { src: "/seseh/prestige/living.jpg", alt: "Salon villa Prestige" },
  { src: "/seseh/exception/terrace.jpg", alt: "Terrasse villa Exception" },
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
        body: JSON.stringify({ ...form, eventSlug: "lybox-bali-juillet-2025" }),
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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-ink overflow-hidden">
        <Image
          src="/villa-pool.webp"
          alt="Villa Seseh Sunset"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 container-page max-w-5xl mx-auto px-6 pb-16 pt-32 md:pb-24">
          <div className="ev-fade inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="tertiary text-white/90">Places limitées</span>
          </div>
          <p className="ev-fade eyebrow text-white/60 mb-3">Webinaire gratuit / Lybox x Sora / 50 min</p>
          <p className="ev-fade text-accent text-sm font-medium mb-6">Lundi 21 juillet 2025 · 12h30 (heure de Paris)</p>
          <h1
            className="ev-fade font-serif font-medium text-white leading-[0.95]"
            style={{ fontSize: "clamp(32px,5vw,64px)" }}
          >
            Il a analysé des centaines de marchés.
            <br />
            Bali est le seul qui l&apos;a convaincu.
          </h1>
        </div>
      </section>

      {/* Story intro */}
      <section className="bg-bg px-6 py-20 md:py-28">
        <div className="container-page max-w-3xl mx-auto">
          <p className="ev-fade text-ink/80 text-lg md:text-xl leading-relaxed">
            Thomas, fondateur de Lybox, est analyste data de formation. Il a passé des années à décortiquer les marchés immobiliers
            avec des chiffres, des ratios, des modèles. Son réflexe, c&apos;est de chercher la faille dans chaque opportunité.
          </p>
          <p className="ev-fade text-ink/80 text-lg md:text-xl leading-relaxed mt-6">
            Et puis il y a eu Bali.
          </p>
          <p className="ev-fade text-ink/65 text-base leading-relaxed mt-6">
            Comme beaucoup, il est venu une première fois en vacances. L&apos;île, le cadre de vie, l&apos;énergie du lieu.
            Il y est retourné. Puis il a commencé à regarder les chiffres. Et les chiffres racontaient une histoire
            que peu de marchés européens peuvent raconter : une demande en accélération portée par une vague de fond.
            Des expatriés qui s&apos;installent, des digital nomads qui restent, des familles qui investissent pour un cadre de vie
            qu&apos;on ne trouve plus en Europe à ce prix.
          </p>
          <p className="ev-fade text-ink/65 text-base leading-relaxed mt-6">
            Gabriel Lapierre, ingénieur Arts et Métiers devenu promoteur immobilier à Bali, observe cette transformation
            depuis le terrain. 3 projets livrés, 40 investisseurs accompagnés. Il ne vend pas un rêve.
            Il construit des villas pour des investisseurs qui, comme Thomas, y réfléchissent à deux fois avant de placer leur argent.
          </p>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-bg px-6 pb-8">
        <div className="container-page max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {PHOTOS.map((p) => (
            <div key={p.src} className="ev-fade relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image src={p.src} alt={p.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Ce que vous allez découvrir + form */}
      <section id="form-section" className="bg-bg px-6 py-20 md:py-28">
        <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="ev-fade eyebrow mb-6">Ce que vous allez découvrir</p>
            <div className="space-y-6">
              <div className="ev-fade">
                <p className="text-ink font-medium">Pourquoi Bali attire autant d&apos;investisseurs analytiques</p>
                <p className="text-ink/55 text-sm mt-1">
                  Les données derrière la vague : taux d&apos;occupation, croissance du tourisme, prix au m², rendement locatif comparé.
                </p>
              </div>
              <div className="ev-fade">
                <p className="text-ink font-medium">La mécanique d&apos;un investissement villa à Bali</p>
                <p className="text-ink/55 text-sm mt-1">
                  Structure juridique (PT PMA), leasehold 30+30, fiscalité. Ce qu&apos;un investisseur français doit savoir avant de signer.
                </p>
              </div>
              <div className="ev-fade">
                <p className="text-ink font-medium">Le projet Seseh Sunset Villas, chiffres ouverts</p>
                <p className="text-ink/55 text-sm mt-1">
                  26 villas, 4 gammes de 149 000 à 469 000€. Rendement brut projeté jusqu&apos;à 13,8%. Pas de promesse, des projections documentées.
                </p>
              </div>
              <div className="ev-fade">
                <p className="text-ink font-medium">Les questions que vous n&apos;osez pas poser</p>
                <p className="text-ink/55 text-sm mt-1">
                  Risques réels, liquidité, gestion locative à distance, que se passe-t-il si le marché se retourne. Gabriel répond sans filtre.
                </p>
              </div>
            </div>

            {/* Programme */}
            <div className="ev-fade mt-14">
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
          </div>

          {/* Form */}
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
                <p className="text-accent text-sm font-medium mb-2">Lundi 21 juillet · 12h30</p>
                <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                  Réserver ma place
                </h2>
                <p className="text-ink/50 text-sm mb-8">
                  Places limitées. Replay réservé aux inscrits.
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
                      placeholder="vous@exemple.com"
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
                  Gratuit / Sans engagement / Google Meet
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Intervenants */}
      <section className="bg-bg-soft px-6 py-20 md:py-28 border-t border-line">
        <div className="container-page max-w-5xl mx-auto">
          <p className="ev-fade eyebrow mb-10 text-center">Vos intervenants</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="ev-fade flex gap-6 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif font-medium text-ink text-lg">Gabriel Lapierre</p>
                <p className="metadata text-accent mt-1">Fondateur, Sora Immobilier</p>
                <p className="text-ink/60 text-sm mt-3 leading-relaxed">
                  Ingénieur Arts et Métiers. Résident à Bali depuis plusieurs années.
                  3 projets livrés, 40 investisseurs accompagnés. Il est venu en vacances, il a vu les chiffres, il est resté.
                </p>
              </div>
            </div>
            <div className="ev-fade flex gap-6 items-start">
              <div className="w-20 h-20 rounded-full bg-line/50 shrink-0 flex items-center justify-center">
                <span className="font-serif text-ink/30 text-2xl">T</span>
              </div>
              <div>
                <p className="font-serif font-medium text-ink text-lg">Thomas</p>
                <p className="metadata text-accent mt-1">Fondateur, Lybox</p>
                <p className="text-ink/60 text-sm mt-3 leading-relaxed">
                  Analyste data et finance de formation. A créé Lybox, plateforme SaaS utilisée par 100 000+ investisseurs immobiliers en France.
                  Son audience aime les chiffres, la précision, et les opportunités vérifiables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="bg-bg">
        <div className="grid grid-cols-3 gap-0">
          <div className="relative aspect-[16/9]">
            <Image src="/seseh/signature/living.jpg" alt="Salon Signature" fill className="object-cover" />
          </div>
          <div className="relative aspect-[16/9]">
            <Image src="/seseh/exception/kitchen.jpg" alt="Cuisine Exception" fill className="object-cover" />
          </div>
          <div className="relative aspect-[16/9]">
            <Image src="/seseh/prestige/terrace.jpg" alt="Terrasse Prestige" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-bg px-6 py-20 md:py-28">
        <div className="container-page max-w-2xl mx-auto text-center">
          <p className="ev-fade eyebrow mb-4">Lundi 21 juillet · 12h30</p>
          <h2
            className="ev-fade font-serif font-medium text-ink leading-tight"
            style={{ fontSize: "clamp(24px,4vw,48px)" }}
          >
            50 minutes pour comprendre pourquoi les analystes regardent Bali.
          </h2>
          <p className="ev-fade text-ink/55 mt-6 leading-relaxed">
            Pas de pitch commercial. Deux profils data-driven qui décortiquent un marché. Des chiffres, des projections, des réponses directes.
          </p>
          <a
            href="#form-section"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="ev-fade inline-block mt-8 bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-10 py-4 rounded-full hover:bg-ink transition-colors duration-500"
          >
            Réserver ma place
          </a>
          <p className="ev-fade mt-6 metadata text-ink/35">
            Replay envoyé uniquement aux inscrits
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
