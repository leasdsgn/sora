"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

export default function CtaSection() {
 const ref = useRef<HTMLElement>(null)
 useEffect(() => {
 const ctx = gsap.context(() => {
  gsap.from(".cta-item", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
 }, ref)
 return () => ctx.revert()
 }, [])

 return (
 <section ref={ref} id="contact" className="bg-bg py-24 md:py-44 px-6 text-center">
  <div className="cta-item max-w-md mx-auto relative aspect-square rounded-full overflow-hidden mb-12">
	  <Image src="/villa-render-bedroom.webp" alt="Vue sur l'océan depuis une villa Canggu" fill quality={82} className="object-cover" sizes="(max-width:768px) 80vw, 500px" />
  </div>
  <p className="cta-item font-mono text-[10px] tracking-[0.3em] text-ink-muted mb-8">Masterclass · 45 minutes · Gratuit</p>
	  <h2 className="cta-item font-serif font-medium text-ink leading-[1.0] max-w-3xl mx-auto" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
  Décidez en<br /><span className="">connaissance de cause.</span>
  </h2>
  <p className="cta-item text-ink-muted max-w-xl mx-auto mt-8 leading-relaxed">
  Une vidéo animée par Gabriel Lapierre, ingénieur résident à Bali. Pas de pitch commercial, des chiffres réels. Une analyse personnalisée de votre profil est offerte à chaque inscrit.
  </p>
  <ul className="cta-item mt-8 max-w-md mx-auto space-y-3 text-left text-ink/75 text-sm">
   <li>· Le marché immobilier de Bali et ses opportunités 2026</li>
   <li>· Devenir propriétaire à Bali : leasehold, PT PMA</li>
	   <li>· Investir en société vs en nom propre : le bon arbitrage</li>
   <li>· Fiscalité française et indonésienne sur vos revenus locatifs</li>
   <li>· <span className="text-accent font-semibold">Bonus :</span> analyse personnalisée de votre profil et de votre trésorerie</li>
  </ul>
  <div className="cta-item mt-12 flex flex-col sm:flex-row gap-4 justify-center">
  <a href="/masterclass" className="inline-flex items-center justify-center bg-accent text-ink font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-accent-soft transition-colors duration-500">
   Recevoir la Masterclass
  </a>
  </div>
  <p className="cta-item mt-6 font-mono text-[10px] tracking-[0.2em] text-ink/45">
   Sans démarchage commercial · Désinscription en 1 clic
  </p>
 </section>
 )
}
