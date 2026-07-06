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

const CALENDLY_URL = "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=partenaires"

const FAQ = [
  { q: "Quel est le taux de commission exact ?", a: "Le taux est discuté lors du premier échange en fonction de votre profil et volume potentiel. Ordre de grandeur : ~2,5% du prix de vente, soit 3 700€ à 11 700€ par villa." },
  { q: "Dois-je gérer la vente moi-même ?", a: "Non. Vous présentez le projet et qualifiez l'intérêt. Gabriel et l'équipe Sora prennent le relais pour le closing, le juridique et la signature." },
  { q: "Comment sont versées les commissions ?", a: "Par virement, dès la signature du contrat de réservation par l'investisseur." },
  { q: "Quels outils de vente sont fournis ?", a: "Brochure personnalisable, projections financières détaillées (5 ans, flat tax incluse), support juridique PT PMA, rendus 3D et plans architecte." },
  { q: "Y a-t-il une exclusivité géographique ?", a: "Pas d'exclusivité imposée. Vous recommandez à votre réseau sans contrainte de zone." },
  { q: "Le projet est-il sécurisé juridiquement ?", a: "Oui. Investissement via PT PMA (société indonésienne à capitaux étrangers), leasehold 30+30 ans, garantie structure 10 ans. Le cadre complet est détaillé dans le dossier partenaire." },
]

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-block bg-accent text-background font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-10 py-4 rounded-full hover:bg-foreground hover:text-background transition-colors duration-500 ${className}`}>
      {children}
    </a>
  )
}

export default function PartenairesPage() {
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
    window.fbq?.("track", "ViewContent", { content_name: "seseh-partenaires" })
    const ctx = gsap.context(() => {
      gsap.from(".vsl-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.08, ease: "expo.out", delay: 0.2 })
    }, ref)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 5 || exitShownRef.current) return
      if (sessionStorage.getItem("part-exit-shown")) return
      exitShownRef.current = true
      sessionStorage.setItem("part-exit-shown", "1")
      setShowExitPopup(true)
    }
    document.addEventListener("mouseleave", handleMouseLeave)

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
            Proposez Bali à vos clients. 3 700€ à 11 700€ par vente.
          </h1>
          <p className="vsl-fade text-foreground/60 mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            Vous êtes CGP, agent immobilier, family office ou influenceur ? Sora vous fournit un produit clé en main
            qui se vend, un support complet, et une commission sur chaque villa.
          </p>

          {/* Video */}
          <div className="vsl-fade relative aspect-video bg-muted border border-border overflow-hidden rounded-sm mt-10 cursor-pointer" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/video-thumb.webp"
              playsInline
              muted
              preload="metadata"
            >
              <source src="/vsl-partenaires.mp4" type="video/mp4" />
            </video>
            {!videoPlaying && (
              <div className="absolute inset-0 bg-foreground/25 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="metadata text-background/80">Présentation du programme partenaires</p>
              </div>
            )}
            {showVideoCta && videoPlaying && (
              <div className="absolute bottom-4 inset-x-4 flex justify-center" onClick={(e) => e.stopPropagation()}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-accent text-background font-serif font-semibold text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-lg hover:bg-foreground transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500">
                  Devenir partenaire
                </a>
              </div>
            )}
          </div>

          {/* CTA #1 */}
          <div className="vsl-fade mt-8 text-center">
            <CtaButton>Échanger avec Gabriel, fondateur</CtaButton>
            <p className="metadata text-muted-foreground/50 mt-4">20 min, sans engagement. Il vous présente le programme.</p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-card border-y border-border py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: "100+", label: "investisseurs accompagnés" },
            { value: "~2,5%", label: "commission par vente" },
            { value: "13", label: "villas encore disponibles" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-serif font-medium text-accent text-xl">{s.value}</span>
              <span className="metadata text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DEVENIR PARTENAIRE ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade eyebrow text-muted-foreground mb-6">Le programme</p>
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            Un produit qui se vend. Un support qui vous équipe.
          </h2>
          <div className="vsl-fade mt-10 space-y-6">
            {[
              { title: "Commission de 3 700€ à 11 700€ par vente", desc: "~2,5% sur des villas de 149k à 469k€. Versée dès la signature du contrat de réservation." },
              { title: "Produit clé en main, 10% de rendement", desc: "Vos clients comprennent en 5 minutes. Rendement projeté jusqu'à 13,8% net, gestion locative intégrée, leasehold 30+30 ans." },
              { title: "Sora gère le closing", desc: "Vous présentez le projet et qualifiez l'intérêt. Gabriel prend le relais pour la vente, le juridique et la signature." },
              { title: "Support complet fourni", desc: "Brochure co-brandée, projections financières détaillées, argumentaire adapté à votre audience, support juridique PT PMA." },
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

      {/* ─── SIMULATION REVENUS ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Simulation</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              Combien pouvez-vous gagner ?
            </h2>
          </div>
          <div className="vsl-fade overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="metadata text-muted-foreground text-left py-3 pr-4">Gamme</th>
                  <th className="metadata text-muted-foreground text-right py-3 px-4">Prix villa</th>
                  <th className="metadata text-muted-foreground text-right py-3 px-4">Commission</th>
                  <th className="metadata text-muted-foreground text-right py-3 pl-4">3 ventes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { gamme: "Élégance", prix: "149 000€", comm: "3 725€", trois: "11 175€" },
                  { gamme: "Prestige", prix: "239 000€", comm: "5 975€", trois: "17 925€" },
                  { gamme: "Signature", prix: "369 000€", comm: "9 225€", trois: "27 675€" },
                  { gamme: "Exception", prix: "469 000€", comm: "11 725€", trois: "35 175€" },
                ].map((r) => (
                  <tr key={r.gamme} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-serif font-medium text-foreground">{r.gamme}</td>
                    <td className="py-3 px-4 text-muted-foreground text-right">{r.prix}</td>
                    <td className="py-3 px-4 text-accent font-medium text-right">{r.comm}</td>
                    <td className="py-3 pl-4 text-accent font-semibold text-right">{r.trois}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="vsl-fade metadata text-muted-foreground/40 mt-4 text-center">Commission indicative ~2,5%. Taux exact discuté lors de l&apos;échange.</p>
        </div>
      </section>

      {/* ─── CTA #2 ─── */}
      <section className="bg-accent/10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-6">
            20 minutes pour découvrir le programme et vos conditions.
          </p>
          <CtaButton>Réserver un appel (20 min)</CtaButton>
        </div>
      </section>

      {/* ─── QUI EST GABRIEL ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Votre interlocuteur</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.05]" style={{ fontSize: "clamp(24px,3.5vw,44px)" }}>
              Gabriel Lapierre, ingénieur et promoteur.
            </h2>
            <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
              Ingénieur diplômé des Arts et Métiers, passé par Vinci. Il a acheté 10+ biens en France
              puis accompagné des centaines d&apos;investisseurs en dirigeant une agence d&apos;investissement clé en main.
              Face aux limites du marché européen, il a créé Sora pour importer la rigueur technique française à Bali.
            </p>
            <p className="vsl-fade text-muted-foreground mt-4 leading-relaxed">
              C&apos;est lui qui prend le relais avec vos clients pour le closing,
              et c&apos;est lui que vous aurez au téléphone pour structurer le partenariat.
            </p>
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

      {/* ─── COMMENT ÇA MARCHE ─── */}
      <section className="bg-foreground py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-background text-center leading-[1.0] mb-16" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            Comment ça fonctionne.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { step: "01", title: "Prenez RDV", desc: "20 min avec Gabriel pour valider le fit et vos conditions." },
              { step: "02", title: "On vous équipe", desc: "Brochure co-brandée, projections, argumentaire adapté." },
              { step: "03", title: "Vous recommandez", desc: "Présentez le projet. On prend le relais sur la vente." },
              { step: "04", title: "Commission versée", desc: "Dès la signature du contrat de réservation." },
            ].map((s) => (
              <div key={s.step} className="vsl-fade text-center md:text-left">
                <p className="font-serif font-medium text-accent text-2xl mb-3">{s.step}</p>
                <p className="font-serif font-medium text-background text-base mb-2">{s.title}</p>
                <p className="text-background/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LE PRODUIT ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Le produit que vous recommandez</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              4 gammes, à partir de 149 000€.
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Élégance", price: "149 000€", surface: "51 m²", chambres: "1 chambre", revenus: "20 611€/an", rendement: "13,8%", img: "/villa-render-exterior.webp" },
              { name: "Prestige", price: "239 000€", surface: "80 m²", chambres: "2 chambres", revenus: "27 972€/an", rendement: "11,7%", img: "/villa-pool.webp" },
              { name: "Signature", price: "369 000€", surface: "153 m²", chambres: "2 chambres premium", revenus: "Sur demande", rendement: "", img: "/villa-living.webp" },
              { name: "Exception", price: "469 000€", surface: "197 m²", chambres: "3 chambres", revenus: "Sur demande", rendement: "", img: "/villa-kitchen.webp" },
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
                  {g.rendement && (
                    <div className="mt-3">
                      <span className="metadata text-accent bg-accent/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.rendement} net</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Urgence */}
          <div className="vsl-fade mt-8 bg-accent/10 border border-accent/20 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-medium text-foreground text-lg">13 villas déjà réservées sur 26.</p>
              <p className="text-muted-foreground text-sm mt-1">Les premiers partenaires ont l&apos;avantage du stock restant.</p>
            </div>
            <CtaButton className="shrink-0">Rejoindre le programme</CtaButton>
          </div>
        </div>
      </section>

      {/* ─── CE QUE VOS CLIENTS OBTIENNENT ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              Ce que vos clients obtiennent.
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Villa clé en main, meublée, architecte dédiée",
              "Piscine privée ou jacuzzi selon gamme",
              "Gestion locative intégrée 7j/7",
              "Garantie structure 10 ans, toiture 5 ans",
              "Cadre juridique PT PMA sécurisé",
              "Leasehold 30+30 ans (60 ans de jouissance)",
              "Rendement brut projeté jusqu'à 13,8%",
              "300m de la plage de Seseh",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start bg-card border border-border rounded-sm p-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-foreground/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA #3 ─── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-2">
            Apportez cette opportunité à votre réseau.
          </p>
          <p className="vsl-fade text-muted-foreground mb-6">
            Gabriel vous explique le modèle et vos conditions en 20 minutes.
          </p>
          <CtaButton>Découvrir mes conditions</CtaButton>
        </div>
      </section>

      {/* ─── PROFILS RECHERCHÉS ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0] mb-12" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            Profils recherchés.
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Conseillers en gestion de patrimoine",
              "Agents immobiliers",
              "Family offices",
              "Influenceurs finance / immobilier",
            ].map((p) => (
              <div key={p} className="bg-background border border-border rounded-sm p-6 flex items-center justify-center">
                <p className="metadata text-foreground/70 text-center">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTÉRIEURS ─── */}
      <section className="bg-background py-24 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">Finitions haut de gamme</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
              Un produit que vos clients voient et comprennent.
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

      {/* ─── FAQ ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
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
      <section className="bg-background px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
            Prêt à rejoindre le programme ?
          </h2>
          <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
            Réservez 20 minutes avec Gabriel. Il vous présente le modèle, vos conditions,
            et les outils de vente mis à votre disposition.
          </p>
          <div className="vsl-fade mt-8">
            <CtaButton>Réserver mon appel avec Gabriel</CtaButton>
          </div>
          <p className="vsl-fade metadata text-muted-foreground/40 mt-6">Sans engagement. Échange confidentiel.</p>
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
          Devenir partenaire
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
              Vous avez un réseau de cadres ou dirigeants ?
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Découvrez combien vous pouvez générer avec le programme partenaire Sora. 20 minutes avec Gabriel suffisent.
            </p>
            <div className="mt-8">
              <CtaButton>Découvrir le programme</CtaButton>
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
