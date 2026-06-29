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
	  <p className="cta-item tertiary text-ink-muted mb-8">Appel offert de 30 minutes</p>
		  <h2 className="cta-item font-serif font-medium text-ink leading-[1.0] max-w-5xl mx-auto" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
	  Validez si Bali a du sens pour votre profil.
	  </h2>
	  <p className="cta-item text-ink-muted max-w-xl mx-auto mt-8 leading-relaxed">
	  Pendant l&apos;appel, Gabriel vérifie votre situation, le montant envisagé, votre horizon de placement et les points juridiques à clarifier avant de vous envoyer le dossier.
	  </p>
	  <p className="cta-item text-ink/70 max-w-lg mx-auto mt-6 leading-relaxed text-sm md:text-base">
	   L&apos;objectif n&apos;est pas de vous vendre Bali à tout prix, mais de vérifier si le montage, le ticket d&apos;entrée et le calendrier correspondent réellement à votre situation.
	  </p>
	  <div className="cta-item mt-12 flex flex-col sm:flex-row gap-4 justify-center">
	  <a href="https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=homepage" className="inline-flex items-center justify-center bg-accent text-ink font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-bg hover:text-ink transition-colors duration-500">
	   Réserver mon appel
	  </a>
	  <a href="/seseh#dossier" className="inline-flex items-center justify-center border border-ink/30 text-ink font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-ink hover:border-ink hover:text-accent transition-all duration-500">
	   Recevoir le dossier
	  </a>
  </div>
  <p className="cta-item mt-6 metadata text-ink/45">
	   Appel gratuit avec réponse sous 24 h, vos informations restent confidentielles.
	  </p>
 </section>
 )
}
