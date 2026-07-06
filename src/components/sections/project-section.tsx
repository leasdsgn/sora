"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

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
          Seseh Sunset Villas se situe à 300 m de la mer.
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

    </section>
  )
}
