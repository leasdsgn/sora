"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function VSLClientPage() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh-vsl" })

    const ctx = gsap.context(() => {
      gsap.from(".vsl-fade", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const scrollToForm = () => document.getElementById("optin")?.scrollIntoView({ behavior: "smooth" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "seseh-vsl" }),
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
    <main ref={ref} className="bg-bg min-h-screen">
      {/* Nav minimal */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line/30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/seseh" className="font-serif font-medium text-ink text-lg tracking-wide">
            Seseh Sunset Villas
          </a>
          <button onClick={scrollToForm} className="cta-primary font-serif font-semibold text-[10px]">
            Recevoir le dossier
          </button>
        </div>
      </nav>

      {/* Hero avec image de fond */}
      <section className="relative pt-20 min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/villa-render-exterior.webp" alt="Seseh Sunset Villas" fill quality={95} priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        </div>
        <div className="relative z-10 px-6 pb-16 md:pb-24 max-w-3xl mx-auto text-center">
          <p className="vsl-fade eyebrow mx-auto mb-6">Investissement immobilier / Bali, Indonésie</p>
          <h1
            className="vsl-fade font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(32px,5vw,64px)" }}
          >
            Comment investir à Bali et générer jusqu&apos;à 13,8% de rendement net, clé en main.
          </h1>
          <p className="vsl-fade text-ink/70 mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            13 villas encore disponibles sur 26, à 300m de la plage de Seseh. Livrées meublées, gestion locative intégrée.
            De 149 000 à 469 000 euros. Livraison mars 2028.
          </p>
          <div className="vsl-fade mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToForm} className="cta-primary font-serif font-semibold">
              Recevoir le dossier complet
            </button>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="vsl-fade relative aspect-video bg-ink/5 border border-line overflow-hidden rounded-sm">
            <Image src="/video-thumb.webp" alt="Présentation Seseh" fill className="object-cover" sizes="(max-width:768px) 100vw, 900px" />
            <div className="absolute inset-0 bg-ink/30 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-bg/90 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="metadata text-bg/80">Regarder la présentation</p>
            </div>
            {/*
              Remplacer par :
              <iframe src="VIDEO_URL" className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" />
            */}
          </div>
        </div>
      </section>

      {/* Points clés */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "13,8%", label: "Rendement net projeté", sub: "Gamme Élégance, après flat tax" },
              { value: "300m", label: "De la plage de Seseh", sub: "Zone premium Bali" },
              { value: "Clé en main", label: "Meublée + gestion 7j/7", sub: "Prête à la location dès livraison" },
            ].map((p) => (
              <div key={p.label} className="text-center p-6 bg-bg-soft border border-line rounded-sm">
                <p className="font-serif font-medium text-accent text-2xl md:text-3xl">{p.value}</p>
                <p className="metadata text-ink/70 mt-2">{p.label}</p>
                <p className="text-ink/40 text-xs mt-1">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gammes avec images */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-12" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
            4 gammes, un seul emplacement.
          </h2>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Élégance", price: "149 000€", surface: "51 m²", chambres: "1 chambre", revenus: "20 611€/an", rendement: "13,8%", piscine: "Jacuzzi privé", img: "/villa-render-exterior.webp" },
              { name: "Prestige", price: "239 000€", surface: "80 m²", chambres: "2 chambres", revenus: "27 972€/an", rendement: "11,7%", piscine: "Piscine privée", img: "/villa-pool.webp" },
              { name: "Signature", price: "369 000€", surface: "153 m²", chambres: "2 chambres premium", revenus: "Sur demande", rendement: "Sur demande", piscine: "Piscine privée", img: "/villa-living.webp" },
              { name: "Exception", price: "469 000€", surface: "197 m²", chambres: "3 chambres", revenus: "Sur demande", rendement: "Sur demande", piscine: "Piscine privée", img: "/villa-kitchen.webp" },
            ].map((g) => (
              <div key={g.name} className="group relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={g.img} alt={`Villa ${g.name}`} fill quality={90} className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="tertiary text-ink/60 mb-1">{g.name}</p>
                      <p className="font-serif text-ink text-2xl font-medium">{g.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="metadata text-ink/55">{g.surface} / {g.chambres}</p>
                      <p className="metadata text-accent mt-1">{g.revenus}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="metadata text-ink/50 bg-ink/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.piscine}</span>
                    {g.rendement !== "Sur demande" && (
                      <span className="metadata text-accent bg-accent/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.rendement} net</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intérieurs */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="vsl-fade eyebrow mx-auto mb-6 text-center">Intérieurs / Finitions haut de gamme</p>
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-10" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
            Livrées meublées, prêtes à vivre.
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { src: "/seseh/signature/living.jpg", alt: "Living Signature" },
              { src: "/seseh/exception/kitchen.jpg", alt: "Cuisine Exception" },
              { src: "/seseh/prestige/bedroom1.jpg", alt: "Chambre Prestige" },
              { src: "/seseh/signature/terrace.jpg", alt: "Terrasse Signature" },
              { src: "/seseh/exception/bath1.jpg", alt: "Salle de bain Exception" },
              { src: "/seseh/elegance/living.jpg", alt: "Living Élégance" },
              { src: "/seseh/prestige/terrace.jpg", alt: "Terrasse Prestige" },
              { src: "/seseh/signature/dining.jpg", alt: "Dining Signature" },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-square rounded-sm overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill quality={80} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclus */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="vsl-fade eyebrow mb-6">Inclus dans chaque villa</p>
            <ul className="vsl-fade space-y-4">
              {[
                "Clé en main, meublée, architecte dédiée",
                "Piscine privée ou jacuzzi selon gamme",
                "Cuisine équipée, douche extérieure",
                "Jardin privé, prête à la location",
                "Gestion locative intégrée 7j/7",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink/75 text-[15px]">
                  <span className="text-accent mt-0.5 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="vsl-fade relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image src="/villa-bedroom.webp" alt="Chambre villa Seseh" fill quality={90} className="object-cover" sizes="(max-width:768px) 100vw, 500px" />
          </div>
        </div>
      </section>

      {/* Projections financières */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="vsl-fade eyebrow mx-auto mb-6">Projection / Gamme Élégance 149 000€</p>
            <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
              Rendement cumulé sur 5 ans.
            </h2>
            <p className="vsl-fade text-ink/60 mt-4 max-w-xl mx-auto text-sm">
              Net après flat tax française (31,4%). Incluant loyers, plus-value et restitution du capital.
            </p>
          </div>

          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Livret A", rendement: "7,7%", ratio: "1x", highlight: false },
              { label: "SCPI", rendement: "13,6%", ratio: "1,8x", highlight: false },
              { label: "Immo locatif FR", rendement: "16,7%", ratio: "2,2x", highlight: false },
              { label: "Seseh Sunset Villas", rendement: "30,1%", ratio: "3,9x", highlight: true },
            ].map((p) => (
              <div key={p.label} className={`rounded-sm p-5 md:p-6 text-center ${p.highlight ? "bg-accent/15 border border-accent/30" : "bg-bg-soft border border-line"}`}>
                <p className="font-serif font-medium text-ink text-xl md:text-2xl">{p.rendement}</p>
                <p className="metadata text-ink/50 mt-1">{p.ratio}</p>
                <p className={`metadata mt-3 ${p.highlight ? "text-accent font-semibold" : "text-ink/60"}`}>{p.label}</p>
              </div>
            ))}
          </div>

          <div className="vsl-fade mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-bg-soft border border-line rounded-sm p-5">
              <p className="font-serif font-medium text-ink text-lg">214 471€</p>
              <p className="metadata text-ink/50 mt-1">Total perçu sur 5 ans</p>
            </div>
            <div className="bg-bg-soft border border-line rounded-sm p-5">
              <p className="font-serif font-medium text-ink text-lg">60-90%</p>
              <p className="metadata text-ink/50 mt-1">Taux d&apos;occupation</p>
            </div>
            <div className="bg-bg-soft border border-line rounded-sm p-5">
              <p className="font-serif font-medium text-ink text-lg">~70€/nuit</p>
              <p className="metadata text-ink/50 mt-1">Tarif moyen après taxe</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA mid-page */}
      <section className="bg-accent/10 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-ink text-lg md:text-xl mb-4">
            Recevez le dossier complet gratuitement.
          </p>
          <p className="vsl-fade text-ink/55 text-sm mb-6">Plans, projections, cadre juridique. Sans engagement.</p>
          <button onClick={scrollToForm} className="vsl-fade cta-primary font-serif font-semibold">
            Recevoir le dossier
          </button>
        </div>
      </section>

      {/* Garanties */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="vsl-fade eyebrow mx-auto mb-6">Garanties</p>
            <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
              Un cadre sécurisé.
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: "10 ans", label: "Garantie structure", desc: "Fondations, murs porteurs, charpente" },
              { value: "5 ans", label: "Garantie toiture", desc: "Étanchéité et couverture complète" },
              { value: "1 an", label: "Garantie intégrale", desc: "Tout équipement, finitions, installations" },
            ].map((g) => (
              <div key={g.label} className="bg-bg border border-line rounded-sm p-6">
                <p className="font-serif font-medium text-accent text-2xl mb-2">{g.value}</p>
                <p className="font-serif font-medium text-ink text-base mb-2">{g.label}</p>
                <p className="text-xs text-ink/50 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section className="bg-ink py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade eyebrow-dark mx-auto mb-6">Localisation / Seseh, Bali</p>
          <h2 className="vsl-fade font-serif font-medium text-bg leading-[1.05] mb-10" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
            À 300m de la plage.
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "300m", label: "Plage de Seseh" },
              { value: "3 min", label: "Restaurants" },
              { value: "8 min", label: "Canggu" },
              { value: "60 min", label: "Aéroport" },
            ].map((d) => (
              <div key={d.label}>
                <p className="font-serif font-medium text-bg text-2xl md:text-3xl">{d.value}</p>
                <p className="metadata text-bg/45 mt-2">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgence / rareté */}
      <section className="bg-bg py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="vsl-fade metadata text-accent mb-3">Stock limité</p>
          <p className="vsl-fade font-serif font-medium text-ink text-lg md:text-xl">
            13 villas déjà réservées sur 26.
          </p>
          <p className="vsl-fade text-ink/50 text-sm mt-2">
            Construction septembre 2026. Les gammes Élégance et Prestige partent en premier.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-10" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
            Questions fréquentes
          </h2>
          <div className="vsl-fade space-y-6">
            {[
              { q: "Est-ce légal pour un Français d'investir à Bali ?", a: "Oui. L'investissement passe par la création d'une PT PMA (société indonésienne à capitaux étrangers), un cadre juridique reconnu et sécurisé. Le dossier complet détaille la procédure." },
              { q: "Qu'est-ce qu'un leasehold 30+30 ans ?", a: "Un bail emphytéotique de 30 ans, renouvelable 30 ans, soit 60 ans de jouissance. C'est le standard du marché immobilier premium à Bali pour les investisseurs étrangers." },
              { q: "Comment fonctionne la gestion locative ?", a: "Une équipe sur place gère la location 7j/7 : check-in/out, ménage, maintenance, plateformes de réservation. Vous recevez vos revenus sans rien gérer." },
              { q: "Quand est-ce que la construction commence ?", a: "Début des travaux en septembre 2026, livraison prévue mars 2028. Le calendrier de paiement est échelonné sur la durée de la construction." },
              { q: "Qui est derrière le projet ?", a: "Sora Immobilier, fondé par Gabriel Lapierre. Plusieurs projets réalisés à Bali (Canggu, Pererenan). Historique d'investisseurs satisfaits et de villas livrées." },
              { q: "Quels sont les risques ?", a: "Comme tout investissement immobilier : fluctuation du marché locatif, risque de change EUR/IDR, évolution réglementaire. Le dossier détaille chaque point et les protections mises en place." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-line pb-6">
                <p className="font-serif font-medium text-ink text-base mb-2">{faq.q}</p>
                <p className="text-ink/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="vsl-fade flex-shrink-0 w-28 h-28 relative rounded-full overflow-hidden">
            <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill className="object-cover" sizes="112px" />
          </div>
          <div className="vsl-fade text-center md:text-left">
            <p className="font-serif font-medium text-ink text-lg">Gabriel Lapierre</p>
            <p className="metadata text-accent mt-1">Fondateur, Sora Immobilier</p>
            <p className="text-ink/60 text-sm leading-relaxed mt-3">
              Basé à Bali depuis plusieurs années, Gabriel accompagne personnellement
              chaque investisseur. Plusieurs projets livrés à Canggu et Pererenan.
              Il sera votre interlocuteur direct tout au long du processus.
            </p>
          </div>
        </div>
      </section>

      {/* Opt-in final */}
      <section id="optin" className="bg-bg py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="hidden md:block">
            <p className="vsl-fade eyebrow mb-6">Dossier complet / Gratuit</p>
            <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Recevez le dossier Seseh Sunset Villas.
            </h2>
            <p className="vsl-fade text-ink/65 mt-6 leading-relaxed">
              Plans architecte, projections financières détaillées, cadre juridique PT PMA,
              et calendrier de construction.
            </p>
            <ul className="vsl-fade mt-6 space-y-3 text-ink/70 text-[15px]">
              <li className="flex gap-3"><span className="text-accent mt-0.5">·</span>Plans et rendus 3D des 4 gammes</li>
              <li className="flex gap-3"><span className="text-accent mt-0.5">·</span>Projections financières sur 5 ans</li>
              <li className="flex gap-3"><span className="text-accent mt-0.5">·</span>Cadre juridique et fiscal complet</li>
              <li className="flex gap-3"><span className="text-accent mt-0.5">·</span>Calendrier de construction détaillé</li>
            </ul>
          </div>

          <div className="vsl-fade">
            {status === "success" ? (
              <div className="bg-bg-soft border border-line rounded-sm p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif font-medium text-ink text-2xl mb-4">Dossier envoyé.</h2>
                <p className="text-ink/65 leading-relaxed">
                  Vérifiez votre boîte mail. Le dossier complet arrive dans quelques minutes.
                  Gabriel vous contacte sous 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-bg-soft border border-line rounded-sm p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                    Recevoir le dossier
                  </h2>
                  <p className="text-ink/50 text-sm">
                    Accès immédiat par email. Sans engagement.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vsl-fn" className="form-label mb-2">Prénom</label>
                      <input id="vsl-fn" type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" placeholder="Gabriel" />
                    </div>
                    <div>
                      <label htmlFor="vsl-ln" className="form-label mb-2">Nom</label>
                      <input id="vsl-ln" type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" placeholder="Lapierre" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="vsl-email" className="form-label mb-2">Email</label>
                    <input id="vsl-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" placeholder="gabriel@exemple.com" />
                  </div>
                  <div>
                    <label htmlFor="vsl-phone" className="form-label mb-2">Téléphone</label>
                    <input id="vsl-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" placeholder="+33 6 12 34 56 78" />
                  </div>
                </div>

                <button type="submit" disabled={status === "loading"}
                  className="w-full mt-8 bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-ink hover:text-bg transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === "loading" ? "Envoi en cours..." : "Recevoir le dossier gratuitement"}
                </button>

                {status === "error" && (
                  <p className="mt-4 text-red-400 text-sm text-center">Une erreur est survenue. Réessayez.</p>
                )}
                <p className="mt-5 metadata text-ink/35 text-center">Sans démarchage commercial / Désinscription en 1 clic</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-bg/95 backdrop-blur-md border-t border-line/30 p-4">
        <button onClick={scrollToForm} className="w-full bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase py-4 rounded-full">
          Recevoir le dossier
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-line/30 py-8 px-6 pb-24 md:pb-8 text-center">
        <p className="metadata text-ink/35">&copy; 2026 Sora Immobilier</p>
      </footer>
    </main>
  )
}
