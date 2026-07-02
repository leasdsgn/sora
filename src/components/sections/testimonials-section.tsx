"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const TESTIMONIALS = [
  {
    quote: "J'étais en Europe pendant tout le projet, et tout a été géré sur place avec beaucoup de clarté et de sérieux.",
    image: "/villa-bedroom.webp",
  },
  {
    quote: "Ce qui m'a rassuré, c'est de ne pas avoir à gérer seul la complexité du projet. Tout était structuré et suivi.",
    image: "/villa-bathroom.webp",
  },
  {
    quote: "Sora nous a permis d'investir à Bali dans un cadre simple, accompagné et beaucoup plus lisible.",
    image: "/villa-living.webp",
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-item", { opacity: 0, y: 28, duration: 0.9, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-accent py-24 md:py-36 px-6">
      <div className="container-page">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <p className="tm-item eyebrow-dark mb-6">Témoignages</p>
          <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Ce que disent ceux qui ont investi.
          </h2>
          <p className="tm-item text-background/75 max-w-xl mx-auto mt-6 leading-relaxed">
            Des investisseurs français qui ont franchi le pas, avec Sora comme partenaire terrain.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="tm-item relative overflow-hidden rounded-sm min-h-[260px] md:min-h-[320px] flex items-end"
            >
              <Image
                src={t.image}
                alt=""
                fill
                quality={95}
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/55 backdrop-blur-[2px]" />
              <div className="relative p-8 md:p-10">
                <span className="font-serif text-5xl md:text-6xl leading-none text-accent block mb-4" aria-hidden="true">&ldquo;</span>
                <p className="font-serif italic text-background text-lg md:text-xl leading-snug">
                  {t.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
