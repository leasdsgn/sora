"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function StatsSection() {
 const ref = useRef<HTMLElement>(null)
 useEffect(() => {
 const ctx = gsap.context(() => {
  gsap.from(".st-item", { opacity: 0, y: 28, duration: 1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
 }, ref)
 return () => ctx.revert()
 }, [])

 return (
 <section ref={ref} className="relative bg-ink py-32 md:py-44 px-6 text-center overflow-hidden">
  <div className="relative z-10">
	  <p className="st-item eyebrow text-bg/60 mb-8">Lecture du marché</p>
		  <h2 className="st-item font-serif font-medium text-bg leading-[1.0] max-w-5xl mx-auto" style={{ fontSize: "clamp(38px,5.5vw,84px)" }}>
	   Investir à Bali demande plus qu&apos;un beau rendu de villa.
	  </h2>
	  <p className="st-item text-bg/65 max-w-xl mx-auto mt-8 leading-relaxed text-base">
	   La demande locative internationale crée une opportunité, mais la différence se joue dans la sélection du foncier, les autorisations, le suivi du chantier et l&apos;exploitation. À ce jour, l&apos;équipe revendique 28 villas construites et plus de 50 investisseurs accompagnés.
	  </p>
	  <a href="/seseh" className="st-item inline-block mt-12 bg-bg text-ink font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-accent transition-colors duration-500">
	   Comprendre le fonctionnement
	  </a>
  </div>
 </section>
 )
}
