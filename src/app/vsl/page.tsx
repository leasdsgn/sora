"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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

gsap.registerPlugin(ScrollTrigger)

const CALENDLY_URL = "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali-clone?utm_source=vsl"

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
      className={`cta-primary font-serif font-semibold ${className}`}>
      {children}
    </a>
  )
}

export default function VSLPage() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const [showVideoCta, setShowVideoCta] = useState(false)
  const exitShownRef = useRef(false)

  const handleVideoClick = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.muted) {
      // Autoplay muted : premier clic = repartir du début avec le son
      v.muted = false
      v.currentTime = 0
      v.play()
      setVideoMuted(false)
    } else if (v.paused) {
      v.play()
    } else {
      v.pause()
    }
  }, [])

  // Effet 1 : GSAP scroll reveal + exit intent
  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh-vsl" })
    const ctx = gsap.context(() => {
      gsap.set(".vsl-fade", { opacity: 0, y: 20 })
      ScrollTrigger.batch(".vsl-fade", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" }),
      })
    }, ref)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 5 || exitShownRef.current) return
      if (sessionStorage.getItem("vsl-exit-shown")) return
      exitShownRef.current = true
      sessionStorage.setItem("vsl-exit-shown", "1")
      setShowExitPopup(true)
    }
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      ctx.revert()
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Effet 2 : video listeners
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const handlePlay = () => setVideoPlaying(true)
    const handlePause = () => setVideoPlaying(false)
    const handleTimeUpdate = () => {
      if (v.currentTime / v.duration >= 0.2) setShowVideoCta(true)
    }
    v.addEventListener("play", handlePlay)
    v.addEventListener("pause", handlePause)
    v.addEventListener("timeupdate", handleTimeUpdate)
    if (!v.paused) setVideoPlaying(true)

    return () => {
      v.removeEventListener("play", handlePlay)
      v.removeEventListener("pause", handlePause)
      v.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  // Effet 3 : Calendly script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <main ref={ref} className="bg-background min-h-screen pb-20 md:pb-0">

      {/* ─── HERO : Texte gauche + Video droite ─── */}
      <section className="px-6 pt-16 md:pt-28 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-16 items-center">
          {/* Colonne gauche : texte */}
          <div>
            <a href="/" className="vsl-fade font-serif font-medium text-foreground/40 text-sm tracking-wide">Sora Immobilier</a>

            <h1 className="vsl-fade font-serif font-medium text-foreground leading-[0.92] mt-8 md:mt-12" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
              Investissez à Bali. 10% de rendement annuel, zéro gestion.
            </h1>
            <p className="vsl-fade text-foreground/60 mt-6 text-lg md:text-xl leading-relaxed">
              100+ chefs d&apos;entreprise et cadres dirigeants européens investissent déjà avec Sora. Découvrez pourquoi en 3 minutes.
            </p>

            <div className="vsl-fade mt-8">
              <CtaButton>Échanger avec Gabriel, fondateur</CtaButton>
              <p className="metadata text-muted-foreground/50 mt-4">30 min, sans engagement. Il répond à toutes vos questions.</p>
            </div>
          </div>

          {/* Colonne droite : vidéo verticale */}
          <div className="vsl-fade relative w-full aspect-[9/16] max-h-[70vh] md:max-h-none bg-muted border border-border overflow-hidden rounded-sm cursor-pointer mx-auto max-w-[360px] md:max-w-none" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/vsl-poster.webp"
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
            >
              <source src="https://res.cloudinary.com/dfpaw573r/video/upload/v1783388037/vsl-2-compressed_lcq6wr.mp4" type="video/mp4" />
            </video>
            {!videoPlaying && (
              <div className="absolute inset-0 bg-foreground/25 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="metadata text-background/80">Regarder la présentation (3 min)</p>
              </div>
            )}
            {videoPlaying && videoMuted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-foreground/70 backdrop-blur-sm text-background metadata px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  Activer le son
                </div>
              </div>
            )}
            {showVideoCta && videoPlaying && videoMuted && (
              <div className="absolute bottom-4 inset-x-4 flex justify-center">
                <button
                  className="bg-accent text-background font-serif font-semibold text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-lg hover:bg-foreground transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  Activer le son
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-card border-y border-border py-8 px-6">
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

      {/* ─── PARTENAIRES (wordmarks texte — remplacer par les logos PNG quand dispo dans public/logos/) ─── */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="metadata text-muted-foreground/40 text-center mb-6">Nos partenaires et distributeurs</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 md:gap-x-14">
            {["Luxury Properties", "Crazy Home", "Cap Sud", "Lybox", "Wunite"].map((name) => (
              <span key={name} className="font-serif font-medium text-foreground/35 text-lg md:text-xl whitespace-nowrap hover:text-foreground/60 transition-colors duration-500">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LE PROBLÈME ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade eyebrow text-muted-foreground mb-6">Le constat</p>
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            L&apos;immobilier européen ne performe plus.
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
            Bali : une des zones à plus haute performance du marché locatif mondial.
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

      {/* ─── AUTORITÉ : EVENTS & SPEAKER (activé quand les photos seront dans public/events/) ─── */}
      {/* <section className="px-6 py-24 md:py-36 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Sur le terrain</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              Gabriel partage son expertise en live.
            </h2>
            <p className="vsl-fade text-muted-foreground mt-6 max-w-xl mx-auto">
              Soirées investisseurs, conférences, rencontres privées. Un écosystème actif autour de l&apos;investissement à Bali.
            </p>
          </div>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { src: "/events/speaker-1.webp", alt: "Gabriel en conférence" },
              { src: "/events/soiree-1.webp", alt: "Soirée investisseurs mai 2026" },
              { src: "/events/soiree-2.webp", alt: "Networking investisseurs" },
              { src: "/events/speaker-2.webp", alt: "Gabriel sur scène" },
              { src: "/events/soiree-3.webp", alt: "Événement Sora" },
              { src: "/events/soiree-4.webp", alt: "Communauté Sora" },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill quality={80} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── TÉMOIGNAGES ─── */}
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
      <section className="relative bg-primary py-16 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url(/pattern-fabric.webp)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-background text-lg md:text-xl mb-6">
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
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="tertiary text-background/60 mb-1">{g.name}</p>
                      <p className="font-serif text-background text-xl md:text-2xl font-medium">{g.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="metadata text-background/55">{g.surface} / {g.chambres}</p>
                      <p className="metadata text-accent mt-1">{g.revenus}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
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
          <div className="vsl-fade mt-8 bg-accent/10 border border-accent/20 rounded-sm p-5 md:p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-serif font-medium text-foreground text-base md:text-lg">13 villas déjà réservées sur 26.</p>
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
              <div key={p.label} className={`rounded-sm p-3 md:p-5 text-center ${p.highlight ? "bg-accent/15 border-2 border-accent/40" : "bg-background border border-border"}`}>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://drive.google.com/file/d/1aJTLdt9WZRrYZvBw-TeZ4yqMB4rPOsOV/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="cta-primary font-serif font-semibold">
              Obtenir mes projections
            </a>
            <a href="https://drive.google.com/file/d/1lgoQa6io7SXF0E_OYqy2rwQ-12noITB6/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="cta-outline font-serif font-semibold">
              Recevoir la brochure
            </a>
          </div>
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
      <section className="relative bg-primary py-24 md:py-36 px-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url(/pattern-fabric.webp)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
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

      {/* ─── CALENDLY EMBED ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
            Prêt à diversifier votre patrimoine ?
          </h2>
          <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
            Réservez 30 minutes avec Gabriel. Il analyse votre situation, répond à toutes vos questions
            et vous envoie le dossier complet après l&apos;appel.
          </p>
          <div className="vsl-fade mt-10">
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}&hide_gdpr_banner=1`}
              style={{ minWidth: 320, height: "min(700px, 80vh)" }}
            />
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
          className="cta-primary font-serif font-semibold w-full">
          Réserver un appel avec Gabriel
        </a>
      </div>

      {/* Exit intent popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)} />
          <div className="relative bg-background border border-border rounded-sm max-w-md w-full p-6 md:p-10 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
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
