"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".st-item", { opacity: 0, y: 28, duration: 1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative bg-primary py-32 md:py-44 px-6 text-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/pattern-fabric.webp)" }}
      />
      <div className="relative z-10">
        <p className="st-item eyebrow-dark mb-8">Lecture du marché</p>
        <h2 className="st-item font-serif font-medium text-background leading-[1.0] max-w-5xl mx-auto" style={{ fontSize: "clamp(38px,5.5vw,84px)" }}>
          Investir à Bali demande plus qu&apos;un beau rendu de villa.
        </h2>
        <p className="st-item text-background/65 max-w-xl mx-auto mt-8 leading-relaxed text-base">
          La demande locative internationale crée une opportunité, mais la différence se joue dans la sélection du foncier, les autorisations, le suivi du chantier et l&apos;exploitation. À ce jour, l&apos;équipe compte 28 villas construites et plus de 50 investisseurs accompagnés.
        </p>
        <div className="st-item mt-12 inline-block">
          <Button asChild variant="inverse">
            <Link href="/fonctionnement">Comprendre le fonctionnement</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
