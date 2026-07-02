"use client"
import Link from "next/link"
import type { MouseEvent } from "react"

const SECTIONS = [
  { href: "/", label: "Accueil" },
  { href: "/seseh", label: "Seseh Sunset Villas" },
  { href: "/events", label: "Évènements" },
  { href: "/#fondateur", label: "Le Fondateur", anchorId: "fondateur" },
  { href: "/masterclass", label: "Masterclass" },
  { href: "/#contact", label: "Appel offert", anchorId: "contact" },
  { href: "/seseh#dossier", label: "Dossier d'investissement" },
]

const CONTACT = [
  { href: "/#contact", label: "Prendre rendez-vous", anchorId: "contact" },
  { href: "tel:+33633517746", label: "+33 6 33 51 77 46" },
  { href: "mailto:contact@sora-immobilier.com", label: "contact@sora-immobilier.com" },
  { href: "https://www.instagram.com/gabriel_lapierre_/", label: "Instagram" },
  { href: "https://linkedin.com/in/gabriel-lapierre", label: "LinkedIn" },
  { href: "https://www.youtube.com/@GABRIEL_LAPIERRE", label: "YouTube" },
]

export default function Footer() {
  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToHomeAnchor = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const href = `/#${id}`
    if (window.location.pathname !== "/") {
      window.location.assign(href)
      return
    }

    window.history.pushState(null, "", href)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <footer className="bg-ink min-h-screen px-8 md:px-16 pt-16 md:pt-20 pb-8 md:pb-10 flex flex-col">
      {/* Top row : logo + CTA */}
      <div className="flex items-center justify-between">
        <div
          className="w-[120px] md:w-[160px]"
          style={{
            aspectRatio: "1751 / 548",
            backgroundColor: "#F9F8F4",
            WebkitMaskImage: "url(/sora-logo.svg)",
            maskImage: "url(/sora-logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
          aria-label="SORA Immobilier"
        />
        <Link
          href="/#contact"
          onClick={goToHomeAnchor("contact")}
          className="bg-bg text-ink text-[12px] tracking-[0.22em] uppercase px-7 md:px-9 py-4 md:py-5 rounded-full hover:bg-accent transition-colors duration-500"
        >
          Contactez-nous
        </Link>
      </div>

      {/* Top separator */}
      <div className="h-px bg-bg/15 mt-10 md:mt-14" />

      {/* Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 py-16 md:py-24">
        {/* Sections */}
        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-bg font-semibold mb-12">Navigation</p>
          <ul className="space-y-7 text-bg/65">
            {SECTIONS.map((s) => (
              <li key={s.label}>
                <Link href={s.href} onClick={s.anchorId ? goToHomeAnchor(s.anchorId) : undefined} className="text-lg hover:text-bg transition-colors duration-300">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-bg font-semibold mb-12">Contact</p>
          <ul className="space-y-7 text-bg/65">
            {CONTACT.map((c) => (
              <li key={c.label}>
                {c.href.startsWith("/") ? (
                  <Link href={c.href} onClick={c.anchorId ? goToHomeAnchor(c.anchorId) : undefined} className="text-lg hover:text-bg transition-colors duration-300">{c.label}</Link>
                ) : (
                  <a href={c.href} className="text-lg hover:text-bg transition-colors duration-300">{c.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Localisation + dispo */}
        <div className="md:text-right">
          <p className="text-[12px] tracking-[0.25em] uppercase text-bg font-semibold mb-12">Localisation</p>
          <div className="space-y-12 text-bg/65">
            <div>
              <p className="tertiary text-bg/55 mb-3">Bureau Bali</p>
              <p className="text-lg leading-relaxed">
                Canggu, Bali, Indonésie<br />
                08°39&apos;22&quot;S 115°08&apos;00&quot;E
              </p>
            </div>
            <div>
              <p className="text-[12px] tracking-[0.25em] uppercase text-bg font-semibold mb-3">Disponibilité</p>
              <p className="text-lg leading-relaxed">
                Lundi à vendredi<br />
                9h à 19h (CET), 7j/7 (WITA)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-px bg-bg/15" />

      {/* Bottom row */}
      <div className="pt-8 md:pt-10 grid grid-cols-2 md:grid-cols-3 items-center gap-6">
        <button
          onClick={scrollTop}
          className="text-[11px] tracking-[0.22em] uppercase font-semibold text-bg hover:text-accent transition-colors duration-300 justify-self-start"
        >
          ↑ Retour en haut
        </button>
        <p className="hidden md:block metadata text-bg/55 text-center">
          © 2026 SORA Immobilier, SIRET 928 136 688
        </p>
        <p className="metadata text-bg/55 justify-self-end text-right">
          Design Omen Studio
        </p>
      </div>
    </footer>
  )
}
