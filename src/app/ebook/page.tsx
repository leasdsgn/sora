"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CHAPTERS = [
  { n: "01", title: "Le constat", desc: "L'Europe n'est plus le terrain de jeu de la performance" },
  { n: "02", title: "Macro-économie", desc: "L'Indonésie : la croissance que l'Europe n'a plus" },
  { n: "03", title: "Micro-marché", desc: "Pourquoi Bali, pourquoi Seseh" },
  { n: "04", title: "Cadre juridique", desc: "Le Leasehold : posséder et sécuriser à 12 000 km" },
  { n: "05", title: "Le match financier", desc: "Europe vs Bali : ce que vous gardez vraiment" },
  { n: "06", title: "Le produit", desc: "Seseh Sunset Villas" },
  { n: "07", title: "La méthode", desc: "Zéro gestion de votre côté" },
  { n: "08", title: "Preuve sociale", desc: "Des résultats, des investisseurs, des villas livrées" },
  { n: "09", title: "Prochaine étape", desc: "Votre arbitrage commence maintenant" },
]

export default function EbookPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "ebook-guide",
          acTagId: "65",
          acListId: "7",
          freshsalesTag: "EBOOK-GUIDE",
        }),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { source: "ebook-guide" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="px-6 pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="eyebrow text-muted-foreground mb-6">Guide gratuit / 14 pages</p>
              <h1
                className="font-serif font-medium text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
              >
                Diversifier hors zone euro, sécuriser, performer.
              </h1>
              <p className="text-foreground/60 mt-6 leading-relaxed text-lg">
                Le guide d&apos;ingénierie immobilière par Gabriel Lapierre. 9 chapitres pour comprendre
                pourquoi Bali surperforme l&apos;Europe et comment structurer votre investissement.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { value: "8-12%", label: "rendement net visé" },
                  { value: "+5%", label: "croissance PIB/an" },
                  { value: "280M", label: "4e population mondiale" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-serif font-medium text-accent text-xl">{s.value}</p>
                    <p className="metadata text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover + Form */}
            <div>
              <div className="relative aspect-[3/4] max-w-[320px] mx-auto mb-8 rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/seseh/complexe/aerial.webp"
                  alt="Guide d'ingénierie immobilière Sora"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-foreground/40" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <p className="metadata text-background/60">SORA IMMOBILIER</p>
                    <p className="metadata text-background/40 mt-1">Édition 2026</p>
                  </div>
                  <div>
                    <p className="metadata text-background/50 mb-2">LE GUIDE D&apos;INGÉNIERIE IMMOBILIÈRE</p>
                    <p className="font-serif font-medium text-background text-lg leading-tight">
                      Diversifier hors zone euro, sécuriser, performer.
                    </p>
                    <div className="mt-4 pt-4 border-t border-background/20">
                      <p className="font-serif text-background/80 text-sm">Par Gabriel Lapierre</p>
                      <p className="metadata text-background/40">Fondateur, SORA Immobilier</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sommaire */}
        <section className="bg-card border-y border-border px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow text-muted-foreground mb-8">Ce que vous allez lire</p>
            <div className="space-y-0">
              {CHAPTERS.map((ch) => (
                <div key={ch.n} className="flex items-baseline gap-4 py-4 border-b border-border last:border-0">
                  <span className="font-serif text-muted-foreground/40 text-lg tabular-nums w-8 shrink-0">{ch.n}</span>
                  <span className="font-serif font-medium text-foreground text-base">{ch.title}</span>
                  <span className="hidden md:block flex-1 border-b border-dotted border-border mx-2" />
                  <span className="hidden md:block text-muted-foreground text-sm text-right">{ch.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Points clés */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Macro : pourquoi l'Indonésie", desc: "280M d'habitants, +5% de PIB/an, pays neutre, 14 000 nouveaux millionnaires par an. La demande immobilière premium est structurelle." },
                { title: "Juridique : le Leasehold 30+30", desc: "Bail enregistré devant notaire, garantie d'extension, structure PT PMA. 0 frais de succession, 0 taxe d'habitation." },
                { title: "Financier : Europe vs Bali", desc: "Rendement net 3-4% en Europe vs 8-12% visé à Bali. Charges opérationnelles incluses, gestion locative intégrée." },
              ].map((p) => (
                <div key={p.title} className="bg-card border border-border rounded-sm p-6">
                  <p className="font-serif font-medium text-foreground text-base mb-3">{p.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section id="telecharger" className="bg-card border-t border-border px-6 py-16 md:py-24">
          <div className="max-w-lg mx-auto">
            {status === "success" ? (
              <div className="bg-background border border-border rounded-sm p-10 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif font-medium text-foreground text-2xl mb-4">Votre guide est prêt.</h2>
                <p className="text-foreground/65 leading-relaxed mb-8">
                  Cliquez ci-dessous pour télécharger votre exemplaire.
                </p>
                <a
                  href="/ebook-guide-sora.pdf"
                  download
                  className="cta-primary font-serif font-semibold inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Télécharger le guide (PDF)
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-background border border-border rounded-sm p-8 md:p-12">
                <h2 className="font-serif font-medium text-foreground text-xl md:text-2xl mb-2">
                  Télécharger le guide gratuitement
                </h2>
                <p className="text-foreground/50 text-sm mb-8">
                  14 pages. Accès immédiat après inscription.
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
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={status === "loading"} className="w-full mt-8">
                  {status === "loading" ? "Envoi en cours..." : "Recevoir le guide"}
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
