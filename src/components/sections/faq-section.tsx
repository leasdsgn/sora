"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = [
  {
    q: "Une présence physique à Bali est-elle nécessaire ?",
    a: "Non. Sora assure le pilotage opérationnel et technique sur place, avec un suivi régulier pour les investisseurs basés en Europe.",
  },
  {
    q: "Comment se déroule le flux de capital ?",
    a: "Le processus se fait par étapes : réservation, acquisition ou construction, puis livraison. Les paiements sont liés à l'avancement réel du projet et aux validations prévues.",
  },
  {
    q: "Comment fonctionnent fiscalité et revenus ?",
    a: "Chaque montage dépend de votre situation, de la structure retenue et de vos objectifs patrimoniaux. Le sujet est analysé avant toute décision d'investissement.",
  },
  {
    q: "Que se passe-t-il si je veux sortir de l'investissement ?",
    a: "Vous restez propriétaire selon les modalités prévues dans la structure choisie. En cas d'arbitrage ou de cession, Sora peut accompagner les prochaines étapes.",
  },
  {
    q: "Co-investissement ou villa en pleine propriété ?",
    a: "Le co-investissement permet d'accéder à un projet avec un ticket plus bas. L'acquisition en pleine propriété convient à ceux qui veulent contrôler l'actif et son usage.",
  },
  {
    q: "Comment savoir si Bali correspond à mon profil ?",
    a: "Le plus simple est d'échanger sur votre situation, votre horizon de placement et vos contraintes. L'appel de 30 minutes sert précisément à clarifier ce point.",
  },
]

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", { opacity: 0, y: 18, duration: 0.7, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-background py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="faq-item eyebrow text-muted-foreground mb-6">Questions fréquentes</p>
          <h2 className="faq-item font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Ce que vous voulez savoir avant d&apos;investir.
          </h2>
        </div>
        <Accordion type="single" collapsible className="faq-item w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="py-6 font-serif text-lg md:text-xl text-foreground font-medium hover:no-underline hover:text-muted-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 text-base font-sans text-foreground/70 leading-relaxed max-w-2xl">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="faq-item mt-12 text-center text-foreground/55 text-sm">
          Une autre question ? <a href="#contact" className="text-accent hover:opacity-70 underline underline-offset-4">Posez-la dans la masterclass</a>.
        </p>
      </div>
    </section>
  )
}
