"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function VSLPartenairesPage() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", role: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh-partenaires" })

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

  const scrollToForm = () => document.getElementById("rdv")?.scrollIntoView({ behavior: "smooth" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          source: "seseh-partenaire",
        }),
      })
      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { content_name: "partenaire" })
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
            Devenir partenaire
          </button>
        </div>
      </nav>

      {/* Hero avec image */}
      <section className="relative pt-20 min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/villa-pool.webp" alt="Villa Seseh avec piscine" fill quality={95} priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        </div>
        <div className="relative z-10 px-6 pb-16 md:pb-24 max-w-3xl mx-auto text-center">
          <p className="vsl-fade eyebrow mx-auto mb-6">Programme partenaires / Sora Immobilier</p>
          <h1
            className="vsl-fade font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(30px,4.5vw,60px)" }}
          >
            Proposez Bali à vos clients.
            <br />
            <span className="text-accent">Gagnez sur chaque vente.</span>
          </h1>
          <p className="vsl-fade text-ink/70 mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Vous êtes CGP, agent immobilier, family office ou influenceur ?
            Touchez une commission sur chaque villa vendue via votre réseau.
            De 3 700€ à 11 700€ par vente.
          </p>
          <div className="vsl-fade mt-8">
            <button onClick={scrollToForm} className="cta-primary font-serif font-semibold">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="vsl-fade relative aspect-video bg-ink/5 border border-line overflow-hidden rounded-sm">
            <Image src="/video-thumb.webp" alt="Présentation programme partenaires" fill className="object-cover" sizes="(max-width:768px) 100vw, 900px" />
            <div className="absolute inset-0 bg-ink/30 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-bg/90 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="metadata text-bg/80">Présentation du programme partenaires</p>
            </div>
            {/*
              Remplacer par :
              <iframe src="VIDEO_URL" className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" />
            */}
          </div>
        </div>
      </section>

      {/* Chiffres clés du projet */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade text-ink/60 text-center text-sm mb-8">Un produit concret que vos clients comprennent en 5 minutes.</p>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "149k-469k€", label: "Ticket d'entrée" },
              { value: "13,8%", label: "Rendement net projeté" },
              { value: "13", label: "Villas restantes" },
              { value: "Mars 2028", label: "Livraison" },
            ].map((s) => (
              <div key={s.label} className="text-center p-5 bg-bg-soft border border-line rounded-sm">
                <p className="font-serif font-medium text-accent text-lg md:text-xl">{s.value}</p>
                <p className="metadata text-ink/55 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi devenir partenaire */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-12" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
            Pourquoi rejoindre le programme ?
          </h2>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Commission ~2,5% par vente",
                desc: "Sur des villas de 149k à 469k€, chaque recommandation génère entre 3 700€ et 11 700€ de commission.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Produit qui se vend",
                desc: "Rendement projeté jusqu'à 13,8% net, leasehold 30+30 ans, gestion locative intégrée. Vos clients comprennent vite.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
                  </svg>
                ),
              },
              {
                title: "Support complet",
                desc: "Brochure co-brandée, projections financières, support juridique PT PMA. On gère la vente, vous présentez.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-bg-soft border border-line rounded-sm p-6 md:p-8">
                <div className="text-accent mb-4">{item.icon}</div>
                <p className="font-serif font-medium text-ink text-base mb-3">{item.title}</p>
                <p className="text-ink/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation revenus */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="vsl-fade eyebrow mx-auto mb-6">Simulation</p>
            <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
              Combien pouvez-vous gagner ?
            </h2>
          </div>
          <div className="vsl-fade overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="metadata text-ink/50 text-left py-3 pr-4">Gamme</th>
                  <th className="metadata text-ink/50 text-right py-3 px-4">Prix villa</th>
                  <th className="metadata text-ink/50 text-right py-3 px-4">Commission ~2,5%</th>
                  <th className="metadata text-ink/50 text-right py-3 pl-4">3 ventes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { gamme: "Élégance", prix: "149 000€", comm: "3 725€", trois: "11 175€" },
                  { gamme: "Prestige", prix: "239 000€", comm: "5 975€", trois: "17 925€" },
                  { gamme: "Signature", prix: "369 000€", comm: "9 225€", trois: "27 675€" },
                  { gamme: "Exception", prix: "469 000€", comm: "11 725€", trois: "35 175€" },
                ].map((r) => (
                  <tr key={r.gamme} className="border-b border-line/50">
                    <td className="py-3 pr-4 font-serif font-medium text-ink">{r.gamme}</td>
                    <td className="py-3 px-4 text-ink/60 text-right">{r.prix}</td>
                    <td className="py-3 px-4 text-accent font-medium text-right">{r.comm}</td>
                    <td className="py-3 pl-4 text-accent font-semibold text-right">{r.trois}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="vsl-fade metadata text-ink/40 mt-4 text-center">Commission indicative. Taux exact discuté lors du RDV partenaire.</p>
        </div>
      </section>

      {/* Le produit en images */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-10" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
            Le produit que vous recommandez
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Élégance", img: "/villa-render-exterior.webp", detail: "1ch · 51m² · 149k€" },
              { name: "Prestige", img: "/villa-pool.webp", detail: "2ch · 80m² · 239k€" },
              { name: "Signature", img: "/villa-living.webp", detail: "2ch · 153m² · 369k€" },
              { name: "Exception", img: "/villa-kitchen.webp", detail: "3ch · 197m² · 469k€" },
            ].map((g) => (
              <div key={g.name} className="group relative rounded-sm overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image src={g.img} alt={`Villa ${g.name}`} fill quality={85} className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="(max-width:768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-serif font-medium text-ink text-sm">{g.name}</p>
                  <p className="metadata text-ink/55 mt-0.5">{g.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Galerie intérieurs */}
          <div className="vsl-fade mt-6 grid grid-cols-4 md:grid-cols-8 gap-2">
            {[
              "/seseh/signature/living.jpg",
              "/seseh/exception/kitchen.jpg",
              "/seseh/prestige/bedroom1.jpg",
              "/seseh/signature/terrace.jpg",
              "/seseh/exception/bath1.jpg",
              "/seseh/elegance/living.jpg",
              "/seseh/prestige/terrace.jpg",
              "/seseh/signature/dining.jpg",
            ].map((src) => (
              <div key={src} className="relative aspect-square rounded-sm overflow-hidden">
                <Image src={src} alt="" fill quality={70} className="object-cover" sizes="(max-width:768px) 25vw, 12.5vw" />
              </div>
            ))}
          </div>
          <p className="metadata text-ink/40 mt-3 text-center">Intérieurs livrés meublés, finitions haut de gamme</p>
        </div>
      </section>

      {/* CTA mid-page */}
      <section className="bg-accent/10 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-ink text-lg md:text-xl mb-4">
            20 minutes pour tout comprendre.
          </p>
          <p className="vsl-fade text-ink/55 text-sm mb-6">Échange sans engagement avec Gabriel, fondateur de Sora.</p>
          <button onClick={scrollToForm} className="vsl-fade cta-primary font-serif font-semibold">
            Prendre rendez-vous
          </button>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-ink py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-bg text-center leading-[1.05] mb-12" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Prenez RDV", desc: "Un échange de 20 min pour valider le fit et vos attentes." },
              { step: "02", title: "On vous équipe", desc: "Brochure co-brandée, projections, argumentaire adapté à votre audience." },
              { step: "03", title: "Vous recommandez", desc: "Présentez le projet à vos clients. On prend le relais sur la vente." },
              { step: "04", title: "Commission versée", desc: "Dès la signature du contrat de réservation." },
            ].map((s) => (
              <div key={s.step} className="vsl-fade text-center md:text-left">
                <p className="font-serif font-medium text-accent text-2xl mb-3">{s.step}</p>
                <p className="font-serif font-medium text-bg text-base mb-2">{s.title}</p>
                <p className="text-bg/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vos clients obtiennent */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
              Ce que vos clients obtiennent
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
              "Rendement net projeté jusqu'à 13,8%",
              "300m de la plage de Seseh",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start bg-bg-soft border border-line rounded-sm p-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-ink/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="vsl-fade flex-shrink-0 w-28 h-28 relative rounded-full overflow-hidden">
            <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill className="object-cover" sizes="112px" />
          </div>
          <div className="vsl-fade text-center md:text-left">
            <p className="font-serif font-medium text-ink text-lg">Gabriel Lapierre</p>
            <p className="metadata text-accent mt-1">Fondateur, Sora Immobilier</p>
            <p className="text-ink/60 text-sm leading-relaxed mt-3">
              Basé à Bali, Gabriel a déjà livré plusieurs projets immobiliers (Canggu, Pererenan).
              Il accompagne personnellement chaque partenaire et prend le relais pour le closing
              une fois le contact qualifié. C&apos;est lui que vous aurez au téléphone.
            </p>
          </div>
        </div>
      </section>

      {/* Profils recherchés */}
      <section className="bg-bg py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-ink leading-[1.05] mb-10" style={{ fontSize: "clamp(26px,3.5vw,48px)" }}>
            Profils recherchés
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Conseillers en gestion de patrimoine",
              "Agents immobiliers",
              "Family offices",
              "Influenceurs finance / immobilier",
            ].map((p) => (
              <div key={p} className="bg-bg-soft border border-line rounded-sm p-5 flex items-center justify-center">
                <p className="metadata text-ink/70 text-center">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgence */}
      <section className="bg-bg py-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="vsl-fade metadata text-accent mb-3">Stock limité</p>
          <p className="vsl-fade font-serif font-medium text-ink text-lg">
            13 villas déjà réservées sur 26. Les premiers partenaires ont l&apos;avantage du stock restant.
          </p>
        </div>
      </section>

      {/* FAQ partenaires */}
      <section className="bg-bg-soft py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-ink text-center leading-[1.05] mb-10" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
            Questions fréquentes
          </h2>
          <div className="vsl-fade space-y-6">
            {[
              { q: "Quel est le taux de commission exact ?", a: "Le taux est discuté lors du premier RDV en fonction de votre profil et volume potentiel. Ordre de grandeur : ~2,5% du prix de vente, soit 3 700€ à 11 700€ par villa." },
              { q: "Dois-je gérer la vente moi-même ?", a: "Non. Vous présentez le projet et qualifiez l'intérêt. Gabriel et l'équipe Sora prennent le relais pour le closing, le juridique et la signature." },
              { q: "Comment sont versées les commissions ?", a: "Par virement, dès la signature du contrat de réservation par l'investisseur." },
              { q: "Quels outils de vente sont fournis ?", a: "Brochure personnalisable, projections financières détaillées (5 ans, flat tax incluse), support juridique PT PMA, rendus 3D et plans architecte." },
              { q: "Y a-t-il une exclusivité géographique ?", a: "Pas d'exclusivité imposée. Vous recommandez à votre réseau sans contrainte de zone." },
              { q: "Le projet est-il sécurisé juridiquement ?", a: "Oui. Investissement via PT PMA (société indonésienne à capitaux étrangers), leasehold 30+30 ans, garantie structure 10 ans. Le cadre complet est détaillé dans le dossier partenaire." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-line pb-6">
                <p className="font-serif font-medium text-ink text-base mb-2">{faq.q}</p>
                <p className="text-ink/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire RDV */}
      <section id="rdv" className="bg-bg py-20 md:py-32 px-6">
        <div className="max-w-lg mx-auto">
          {status === "success" ? (
            <div className="bg-bg-soft border border-line rounded-sm p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif font-medium text-ink text-2xl mb-4">Demande envoyée.</h2>
              <p className="text-ink/65 leading-relaxed">
                Gabriel vous recontacte sous 24h pour planifier votre appel.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-bg-soft border border-line rounded-sm p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                  Prendre rendez-vous
                </h2>
                <p className="text-ink/50 text-sm">
                  Échange de 20 minutes avec Gabriel pour découvrir le programme.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-fn" className="form-label mb-2">Prénom</label>
                    <input id="p-fn" type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="p-ln" className="form-label mb-2">Nom</label>
                    <input id="p-ln" type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="p-email" className="form-label mb-2">Email professionnel</label>
                  <input id="p-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="p-phone" className="form-label mb-2">Téléphone</label>
                  <input id="p-phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-company" className="form-label mb-2">Société</label>
                    <input id="p-company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="p-role" className="form-label mb-2">Votre rôle</label>
                    <select id="p-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors">
                      <option value="">Sélectionner</option>
                      <option value="cgp">CGP</option>
                      <option value="agent">Agent immobilier</option>
                      <option value="family-office">Family office</option>
                      <option value="influenceur">Influenceur</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={status === "loading"}
                className="w-full mt-8 bg-ink text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-accent transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "loading" ? "Envoi en cours..." : "Réserver mon créneau"}
              </button>

              {status === "error" && (
                <p className="mt-4 text-red-400 text-sm text-center">Une erreur est survenue. Réessayez.</p>
              )}
              <p className="mt-5 metadata text-ink/35 text-center">Échange sans engagement / 20 minutes</p>
            </form>
          )}
        </div>
      </section>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-bg/95 backdrop-blur-md border-t border-line/30 p-4">
        <button onClick={scrollToForm} className="w-full bg-ink text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase py-4 rounded-full">
          Devenir partenaire
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-line/30 py-8 px-6 pb-24 md:pb-8 text-center">
        <p className="metadata text-ink/35">&copy; 2026 Sora Immobilier</p>
      </footer>
    </main>
  )
}
