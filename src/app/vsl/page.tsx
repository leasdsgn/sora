"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CALENDLY_URL = "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=vsl"

const FAQ = [
  { q: "Est-ce légal pour un Français d'investir à Bali ?", a: "Oui. L'investissement passe par la création d'une PT PMA (société indonésienne à capitaux étrangers), un cadre juridique reconnu et sécurisé. Nos équipes juridiques gèrent l'intégralité de la structuration." },
  { q: "Qu'est-ce qu'un leasehold 30+30 ans ?", a: "Un bail emphytéotique de 30 ans, renouvelable 30 ans, soit 60 ans de jouissance. C'est le standard du marché immobilier premium à Bali pour les investisseurs étrangers." },
  { q: "Comment fonctionne la gestion locative ?", a: "Notre équipe sur place gère la location 7j/7 : check-in/out, ménage, maintenance, plateformes de réservation. Vous recevez vos revenus sans rien gérer." },
  { q: "Quelle est la différence avec une agence immobilière locale ?", a: "Sora est un promoteur immobilier. Nous construisons avec nos propres ingénieurs, maîtres d'oeuvre et structures juridiques. De l'étude de sol à la gestion locative, nous contrôlons toute la chaîne de valeur." },
  { q: "Quels sont les risques ?", a: "Comme tout investissement immobilier : fluctuation du marché locatif, risque de change EUR/IDR, évolution réglementaire. Chaque point est détaillé lors de l'appel avec Gabriel, avec les protections mises en place." },
  { q: "Puis-je visiter avant d'investir ?", a: "Absolument. Gabriel organise des visites sur site pour les investisseurs sérieux. Beaucoup de nos clients ont investi après avoir visité Bali et constaté le potentiel sur place." },
  { q: "Comment se passe le paiement ?", a: "Le paiement est échelonné en plusieurs étapes liées à l'avancement de la construction. Pas de crédit bancaire nécessaire. Les modalités exactes sont présentées lors de l'appel." },
]

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-block bg-accent text-background font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-10 py-4 rounded-full hover:bg-foreground hover:text-background transition-colors duration-500 ${className}`}>
      {children}
    </a>
  )
}

export default function VSLPage() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showVideoCta, setShowVideoCta] = useState(false)
  const exitShownRef = useRef(false)

  const handleVideoClick = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.muted = false
      v.play()
      setVideoPlaying(true)
    } else {
      v.pause()
      setVideoPlaying(false)
    }
  }, [])

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh-vsl" })
    const ctx = gsap.context(() => {
      gsap.from(".vsl-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.08, ease: "expo.out", delay: 0.2 })
    }, ref)

    // Exit intent (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 5 || exitShownRef.current) return
      if (sessionStorage.getItem("vsl-exit-shown")) return
      exitShownRef.current = true
      sessionStorage.setItem("vsl-exit-shown", "1")
      setShowExitPopup(true)
    }
    document.addEventListener("mouseleave", handleMouseLeave)

    // Show CTA after 20% of video watched
    const v = videoRef.current
    const handleTimeUpdate = () => {
      if (v && v.currentTime / v.duration >= 0.2 && !showVideoCta) {
        setShowVideoCta(true)
      }
    }
    v?.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      ctx.revert()
      document.removeEventListener("mouseleave", handleMouseLeave)
      v?.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [showVideoCta])

  return (
    <main ref={ref} className="bg-background min-h-screen">

      {/* ─── HERO : Headline + Video + CTA ─── */}
      <section className="px-6 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="vsl-fade font-serif font-medium text-foreground/40 text-sm tracking-wide">Sora Immobilier</a>

          <h1 className="vsl-fade font-serif font-medium text-foreground leading-[0.95] mt-8 md:mt-12 max-w-4xl" style={{ fontSize: "clamp(32px,5vw,68px)" }}>
            Investissez à Bali. 10% de rendement annuel, zéro gestion.
          </h1>
          <p className="vsl-fade text-foreground/60 mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            100+ chefs d&apos;entreprise et cadres dirigeants européens investissent déjà avec Sora. Découvrez pourquoi en 3 minutes.
          </p>

          {/* Video — remplacer src par l'URL Cloudinary */}
          <div className="vsl-fade relative aspect-video bg-muted border border-border overflow-hidden rounded-sm mt-10 cursor-pointer" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/video-thumb.webp"
              playsInline
              muted
              preload="metadata"
            >
              {/* Remplacer par URL Cloudinary */}
              <source src="/vsl-gabriel.mp4" type="video/mp4" />
            </video>
            {!videoPlaying && (
              <div className="absolute inset-0 bg-foreground/25 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="metadata text-background/80">Regarder la présentation (3 min)</p>
              </div>
            )}
            {/* CTA qui apparaît à 20% de la vidéo */}
            {showVideoCta && videoPlaying && (
              <div className="absolute bottom-4 inset-x-4 flex justify-center" onClick={(e) => e.stopPropagation()}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-accent text-background font-serif font-semibold text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-lg hover:bg-foreground transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500">
                  Réserver un appel avec Gabriel
                </a>
              </div>
            )}
          </div>

          {/* CTA #1 */}
          <div className="vsl-fade mt-8 text-center">
            <CtaButton>Échanger avec Gabriel, fondateur</CtaButton>
            <p className="metadata text-muted-foreground/50 mt-4">30 min, sans engagement. Il répond à toutes vos questions.</p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-card border-y border-border py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: "100+", label: "investisseurs européens" },
            { value: "10%", label: "rendement annuel moyen" },
            { value: "A à Z", label: "promotion clé en main" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-serif font-medium text-accent text-xl">{s.value}</span>
              <span className="metadata text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LE PROBLÈME ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade eyebrow text-muted-foreground mb-6">Le constat</p>
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            L&apos;immobilier français ne performe plus.
          </h2>
          <div className="vsl-fade mt-10 space-y-6">
            {[
              { title: "Fiscalité lourde et instable", desc: "IFI, prélèvements sociaux, taxation des plus-values qui change tous les ans. La rentabilité nette s'effondre." },
              { title: "Système bancaire verrouillé", desc: "Taux élevés, conditions durcies, délais à rallonge. Même avec un bon dossier, la capacité d'investissement est plafonnée." },
              { title: "Zéro diversification géographique", desc: "100% de votre patrimoine immobilier dans un seul pays, un seul cadre fiscal, un seul marché." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <span className="text-accent/60 text-xl mt-0.5 shrink-0">+</span>
                <div>
                  <p className="font-serif font-medium text-foreground text-base">{item.title}</p>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── L'OPPORTUNITÉ ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade eyebrow text-accent mb-6">L&apos;opportunité</p>
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            Bali : la zone à plus haute performance du marché locatif mondial.
          </h2>
          <div className="vsl-fade mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "60-90%", label: "Taux d'occupation", desc: "Demande locative constante, tourisme en hausse, expatriation croissante" },
              { value: "~70€", label: "Tarif moyen/nuit", desc: "Après taxe. Sur une villa 1 chambre à 149 000€ d'investissement" },
              { value: "10%+", label: "Rendement net annuel", desc: "Performance inaccessible sur le marché européen actuel" },
            ].map((item) => (
              <div key={item.label} className="p-5 bg-background border border-border rounded-sm">
                <p className="font-serif font-medium text-accent text-2xl">{item.value}</p>
                <p className="font-serif font-medium text-foreground text-sm mt-1">{item.label}</p>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SORA : PROMOTEUR (pas agence) + GABRIEL ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Qui est derrière Sora</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.05]" style={{ fontSize: "clamp(24px,3.5vw,44px)" }}>
              Un promoteur qui contrôle toute la chaîne. Pas un intermédiaire.
            </h2>
            <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
              Gabriel Lapierre est ingénieur, diplômé des Arts et Métiers, passé par Vinci.
              Il a investi dans 10+ biens en France avant de se heurter aux limites du système.
              Il a créé Sora pour construire ce qui n&apos;existait pas : un promoteur immobilier français à Bali,
              avec des standards européens.
            </p>
            <ul className="vsl-fade mt-8 space-y-3">
              {[
                "Ingénieurs et maîtres d'oeuvre intégrés",
                "Étude de sol, normes de construction européennes",
                "Structure juridique PT PMA gérée en interne",
                "Gestion locative 7j/7 sans rien gérer",
                "Un seul interlocuteur du début à la fin",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-foreground/75 text-[15px]">
                  <span className="text-accent mt-0.5 shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="vsl-fade relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre, fondateur Sora" fill className="object-cover" sizes="(max-width:768px) 100vw, 500px" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-6">
              <p className="font-serif font-medium text-background text-base">Gabriel Lapierre</p>
              <p className="metadata text-background/70 mt-1">Fondateur Sora. Ingénieur Arts et Métiers, ex-Vinci.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-6 py-24 md:py-36 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Ils investissent avec Sora</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              100+ dirigeants européens nous font confiance.
            </h2>
          </div>

          <div className="vsl-fade space-y-6">
            {[
              { quote: "J'étais en Europe pendant tout le projet, et tout a été géré sur place avec beaucoup de clarté et de sérieux.", label: "Investisseur, Europe" },
              { quote: "Ce qui m'a rassuré, c'est de ne pas avoir à gérer seul la complexité du projet. Tout était structuré et suivi.", label: "Investisseur accompagné par Sora" },
              { quote: "Sora nous a permis d'investir à Bali dans un cadre simple, accompagné et beaucoup plus lisible.", label: "Investisseur, couple" },
            ].map((t, i) => (
              <div key={i} className="bg-background border border-border rounded-sm p-8">
                <p className="font-serif text-foreground/80 text-base md:text-lg leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="metadata text-muted-foreground mt-4">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA #2 ─── */}
      <section className="bg-accent/10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-6">
            Échangez directement avec Gabriel pour voir si Bali correspond à votre situation.
          </p>
          <CtaButton>Réserver un appel (30 min)</CtaButton>
        </div>
      </section>

      {/* ─── GAMMES ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Seseh Sunset Villas</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(32px,5vw,64px)" }}>
              4 gammes, à partir de 149 000€.
            </h2>
            <p className="vsl-fade text-muted-foreground mt-6 max-w-xl mx-auto">
              26 villas à 300m de la plage de Seseh. Livrées meublées, prêtes à la location.
            </p>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Élégance", price: "149 000€", surface: "51 m²", chambres: "1 chambre", revenus: "20 611€/an", rendement: "13,8%", piscine: "Jacuzzi privé", img: "/villa-render-exterior.webp" },
              { name: "Prestige", price: "239 000€", surface: "80 m²", chambres: "2 chambres", revenus: "27 972€/an", rendement: "11,7%", piscine: "Piscine privée", img: "/villa-pool.webp" },
              { name: "Signature", price: "369 000€", surface: "153 m²", chambres: "2 chambres premium", revenus: "Sur demande", rendement: "Sur demande", piscine: "Piscine privée", img: "/villa-living.webp" },
              { name: "Exception", price: "469 000€", surface: "197 m²", chambres: "3 chambres", revenus: "Sur demande", rendement: "Sur demande", piscine: "Piscine privée", img: "/villa-kitchen.webp" },
            ].map((g) => (
              <div key={g.name} className="group relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={g.img} alt={`Villa ${g.name}`} fill quality={90} className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="tertiary text-background/60 mb-1">{g.name}</p>
                      <p className="font-serif text-background text-2xl font-medium">{g.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="metadata text-background/55">{g.surface} / {g.chambres}</p>
                      <p className="metadata text-accent mt-1">{g.revenus}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="metadata text-background/50 bg-background/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.piscine}</span>
                    {g.rendement !== "Sur demande" && (
                      <span className="metadata text-accent bg-accent/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.rendement} net</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Urgence inline */}
          <div className="vsl-fade mt-8 bg-accent/10 border border-accent/20 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-medium text-foreground text-lg">13 villas déjà réservées sur 26.</p>
              <p className="text-muted-foreground text-sm mt-1">Construction septembre 2026, livraison mars 2028.</p>
            </div>
            <CtaButton className="shrink-0">Voir les disponibilités</CtaButton>
          </div>
        </div>
      </section>

      {/* ─── INTÉRIEURS ─── */}
      <section className="bg-background py-24 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Finitions haut de gamme</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(32px,4.5vw,56px)" }}>
              Standards européens, cadre balinais.
            </h2>
          </div>
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

      {/* ─── PROJECTIONS ROI ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Projection / Gamme Élégance 149 000€</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              Comparaison sur 5 ans, net après flat tax.
            </h2>
          </div>

          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Livret A", rendement: "7,7%", ratio: "1x", highlight: false },
              { label: "SCPI", rendement: "13,6%", ratio: "1,8x", highlight: false },
              { label: "Immo locatif FR", rendement: "16,7%", ratio: "2,2x", highlight: false },
              { label: "Seseh Villas", rendement: "30,1%", ratio: "3,9x", highlight: true },
            ].map((p) => (
              <div key={p.label} className={`rounded-sm p-5 text-center ${p.highlight ? "bg-accent/15 border-2 border-accent/40" : "bg-background border border-border"}`}>
                <p className="font-serif font-medium text-foreground text-xl md:text-2xl">{p.rendement}</p>
                <p className="metadata text-muted-foreground mt-1">{p.ratio}</p>
                <p className={`metadata mt-3 ${p.highlight ? "text-accent font-semibold" : "text-foreground/60"}`}>{p.label}</p>
              </div>
            ))}
          </div>

          <div className="vsl-fade mt-6 text-center">
            <p className="text-muted-foreground text-xs">
              Net après flat tax française (31,4%). Incluant loyers, plus-value et restitution du capital. 214 471€ perçus sur 5 ans.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA #3 ─── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-2">
            Recevez vos projections personnalisées.
          </p>
          <p className="vsl-fade text-muted-foreground mb-6">
            Gabriel calcule le rendement exact selon votre situation fiscale et le type de villa.
          </p>
          <CtaButton>Obtenir mes projections</CtaButton>
        </div>
      </section>

      {/* ─── GARANTIES ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Sécurisation</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              La même sérénité qu&apos;en Europe.
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: "10 ans", label: "Garantie structure", desc: "Fondations, murs porteurs, charpente" },
              { value: "5 ans", label: "Garantie toiture", desc: "Étanchéité et couverture complète" },
              { value: "1 an", label: "Garantie intégrale", desc: "Tout équipement, finitions, installations" },
            ].map((g) => (
              <div key={g.label} className="bg-background border border-border rounded-sm p-6">
                <p className="font-serif font-medium text-accent text-2xl mb-2">{g.value}</p>
                <p className="font-serif font-medium text-foreground text-base mb-2">{g.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCALISATION ─── */}
      <section className="bg-foreground py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade eyebrow-dark mx-auto mb-6">Seseh, Bali</p>
          <h2 className="vsl-fade font-serif font-medium text-background leading-[1.0] mb-12" style={{ fontSize: "clamp(32px,5vw,64px)" }}>
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
                <p className="font-serif font-medium text-background text-2xl md:text-3xl">{d.value}</p>
                <p className="metadata text-background/45 mt-2">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-background px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(32px,4.5vw,56px)" }}>
              Questions fréquentes.
            </h2>
          </div>
          <Accordion type="single" collapsible className="vsl-fade w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-6 font-serif text-lg md:text-xl text-foreground font-medium hover:no-underline hover:text-muted-foreground text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0 text-base font-sans text-foreground/70 leading-relaxed max-w-2xl">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
            Prêt à diversifier votre patrimoine ?
          </h2>
          <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
            Réservez 30 minutes avec Gabriel. Il analyse votre situation, répond à toutes vos questions
            et vous envoie le dossier complet après l&apos;appel.
          </p>
          <div className="vsl-fade mt-8">
            <CtaButton>Réserver mon appel avec Gabriel</CtaButton>
          </div>
          <p className="vsl-fade metadata text-muted-foreground/40 mt-6">Sans engagement. Pas de démarchage.</p>
        </div>
      </section>

      {/* ─── MICRO-FOOTER ─── */}
      <div className="bg-background border-t border-border py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-foreground/30 text-sm">Sora Immobilier</p>
          <p className="metadata text-muted-foreground/30">contact@sora-immobilier.com</p>
        </div>
      </div>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border/30 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center bg-accent text-background font-serif font-semibold text-[11px] tracking-[0.22em] uppercase py-4 rounded-full">
          Réserver un appel avec Gabriel
        </a>
      </div>

      {/* Exit intent popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)} />
          <div className="relative bg-background border border-border rounded-sm max-w-md w-full p-10 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <p className="font-serif font-medium text-foreground text-xl md:text-2xl leading-tight">
              Avant de partir, une question.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Savez-vous combien rapporterait une villa à Bali dans votre situation fiscale ?
              Gabriel vous fait le calcul en 30 minutes.
            </p>
            <div className="mt-8">
              <CtaButton>Calculer mon rendement</CtaButton>
            </div>
            <button onClick={() => setShowExitPopup(false)} className="mt-4 metadata text-muted-foreground/40 hover:text-muted-foreground transition-colors">
              Non merci
            </button>
          </div>
        </div>
      )}

    </main>
  )
}
