"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-item", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="bg-background py-24 md:py-44 px-6 text-center">
      <div className="cta-item max-w-md mx-auto relative aspect-square rounded-full overflow-hidden mb-12">
        <Image src="/villa-render-bedroom.webp" alt="Vue sur l'océan depuis une villa Canggu" fill quality={95} className="object-cover" sizes="(max-width:768px) 80vw, 500px" />
      </div>
      <p className="cta-item eyebrow text-muted-foreground mb-8">Appel offert de 30 minutes</p>
      <h2 className="cta-item font-serif font-medium text-foreground leading-[1.0] max-w-5xl mx-auto" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
        Validez si Bali a du sens pour votre profil.
      </h2>
      <p className="cta-item text-muted-foreground max-w-xl mx-auto mt-8 leading-relaxed">
        Pendant l&apos;appel, Gabriel vérifie votre situation, le montant envisagé, votre horizon de placement et les points juridiques à clarifier avant de vous envoyer le dossier.
      </p>
      <p className="cta-item text-foreground/70 max-w-lg mx-auto mt-6 leading-relaxed text-sm md:text-base">
        L&apos;objectif n&apos;est pas de vous vendre Bali à tout prix, mais de vérifier si le montage, le ticket d&apos;entrée et le calendrier correspondent réellement à votre situation.
      </p>
      <div className="cta-item mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="accent">
          <a href="https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=homepage">
            Réserver mon appel
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/seseh#dossier">Recevoir le dossier</Link>
        </Button>
      </div>
      <p className="cta-item mt-6 metadata text-foreground/45">
        Appel gratuit avec réponse sous 24 h, vos informations restent confidentielles.
      </p>
    </section>
  )
}
