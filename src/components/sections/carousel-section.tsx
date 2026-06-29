"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const REALISATIONS = [
	  { img: "/villa-pool.webp",              title: "Villa Lotus",      caption: "Co-investissement à Canggu" },
	  { img: "/villa-living.webp",            title: "Suite tropicale",  caption: "Salon principal du loft" },
	  { img: "/villa-bedroom.webp",           title: "Suite parentale",  caption: "Chambre maître" },
	  { img: "/villa-bathroom.webp",          title: "Spa privé",        caption: "Détail salle de bain" },
	  { img: "/villa-exterior.webp",          title: "Architecture",     caption: "Façade signature" },
	  { img: "/villa-kitchen.webp",           title: "Cuisine îlot",     caption: "Espace de vie premium" },
	  { img: "/villa-render-exterior.webp",   title: "Arches Canggu",    caption: "Concept architecte" },
	  { img: "/villa-render-bedroom.webp",    title: "Vue océan",        caption: "Suite signature" },
]

export default function CarouselSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current
        const section = sectionRef.current
        if (!track || !section) return

        const getDistance = () => track.scrollWidth - window.innerWidth + 96

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-bg overflow-hidden">
      <div className="h-auto md:h-screen flex flex-col pb-12 md:pb-0">
        {/* Heading */}
        <div className="pt-24 pb-10 px-8 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
	            <p className="tertiary text-ink-muted mb-4">Opérations et visuels de projet</p>
	            <h2 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
              Des villas suivies de la conception à l&apos;exploitation.
            </h2>
          </div>
        </div>

        {/* Carousel track, overflow scroll mobile, pin GSAP desktop */}
        <div className="scrollbar-hidden flex-1 overflow-x-auto md:overflow-hidden flex items-center pb-4 md:pb-20 snap-x snap-mandatory md:snap-none">
          <div ref={trackRef} className="flex gap-4 md:gap-6 pl-6 md:pl-12 pr-6 md:pr-0 will-change-transform">
            {REALISATIONS.map((r, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[82vw] sm:w-[60vw] md:w-[40vw] lg:w-[34vw] rounded-sm overflow-hidden snap-start md:snap-align-none"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  quality={82}
                  className="object-cover"
                  sizes="(max-width:768px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-ink">
                  <p className="font-serif text-2xl md:text-3xl mb-1">{r.title}</p>
                  <p className="text-sm text-ink/70">{r.caption}</p>
                </div>
                <span className="absolute top-4 right-4 metadata text-ink/65">
                  {String(i + 1).padStart(2, "0")} / {String(REALISATIONS.length).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
