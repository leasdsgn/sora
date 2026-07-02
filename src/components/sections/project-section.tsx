"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const CARDS = [
  { label: "Seseh Sunset", img: "/villa-pool.webp", price: "25 villas", metric: "Bord d'océan" },
  { label: "Villas privées", img: "/villa-render-exterior.webp", price: "Dès 129 000 €", metric: "300 m de la mer" },
  { label: "Co-investissement", img: "/villa-living.webp", price: "Dès 20 000 €", metric: "Accès prioritaire" },
  { label: "Gestion locative", img: "/villa-kitchen.webp", price: "100% déléguée", metric: "Suivi sur place" },
]

export default function ProjectSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pj-item", { opacity: 0, y: 32, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projet" className="bg-card py-24 md:py-36 px-6">
      <div className="text-center max-w-5xl mx-auto mb-20">
        <p className="pj-item eyebrow text-muted-foreground mb-8">Seseh, projet actuellement ouvert aux investisseurs</p>
        <h2 className="pj-item font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,76px)" }}>
          Seseh Beachfront se situe à 300 m de la mer.
        </h2>
        <p className="pj-item text-foreground/60 max-w-2xl mx-auto mt-8 leading-relaxed text-base">
          Le projet réunit 25 villas en bord d&apos;océan, dans une zone portée par les usages touristiques et résidentiels. Le format permet d&apos;envisager un usage personnel, une mise en location ou une détention patrimoniale.
        </p>
      </div>

      {/* Photo collage */}
      <div className="pj-item container-page grid grid-cols-12 gap-3 mb-24">
        <div className="col-span-7 relative rounded-sm overflow-hidden" style={{ aspectRatio: "5/3" }}>
          <Image src="/villa-exterior.webp" alt="Villa à Seseh, Bali" fill quality={95} className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1504px) 60vw, 880px" />
        </div>
        <div className="col-span-5 grid grid-rows-2 gap-3">
          <div className="relative rounded-sm overflow-hidden">
            <Image src="/villa-living.webp" alt="Salon villa" fill quality={95} className="object-cover" sizes="(max-width:768px) 50vw, (max-width:1504px) 40vw, 620px" />
          </div>
          <div className="relative rounded-sm overflow-hidden">
            <Image src="/villa-bathroom.webp" alt="Salle de bain villa" fill quality={95} className="object-cover" sizes="(max-width:768px) 50vw, (max-width:1504px) 40vw, 620px" />
          </div>
        </div>
      </div>

      {/* Tall cards row with badge overlay */}
      <div className="-mx-6 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
        {CARDS.map((c) => (
          <div key={c.label} className="pj-item relative group cursor-pointer overflow-hidden" style={{ aspectRatio: "9/16" }}>
            <Image
              src={c.img}
              alt={c.label}
              fill
              quality={95}
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              sizes="(max-width:768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-background/10 group-hover:bg-background/20 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="bg-primary/95 backdrop-blur-sm px-5 py-3.5 rounded-2xl whitespace-nowrap min-w-44">
                <p className="tertiary text-background/70 mb-1.5">{c.label}</p>
                <p className="font-serif text-background text-base font-semibold leading-tight">{c.price}</p>
                <p className="metadata text-background/55 mt-1.5">{c.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
