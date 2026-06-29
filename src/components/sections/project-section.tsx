"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const CARDS = [
	 { label: "Villas privées",      img: "/villa-pool.webp",                price: "Dès 180 000 €",   metric: "11–13% net projeté" },
	 { label: "Lofts Canggu",        img: "/villa-render-exterior.webp",     price: "Dès 45 000 €",    metric: "12–13% net projeté" },
	 { label: "Co-investissement",   img: "/villa-living.webp",              price: "Dès 10 000 €",    metric: "~13% net projeté" },
	 { label: "Gestion locative",    img: "/villa-kitchen.webp",             price: "Commission 18%",  metric: "Locatif géré · 7j/7" },
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
 <section ref={ref} id="projet" className="bg-bg-soft py-24 md:py-36 px-6">
  <div className="text-center max-w-3xl mx-auto mb-20">
  <p className="pj-item font-mono text-[10px] tracking-[0.3em] text-ink-muted mb-8">Le projet phare · Canggu, Bali</p>
	  <h2 className="pj-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,76px)" }}>
   Canggu Oasis,<br /><span className="">en plein cœur de l&apos;île.</span>
  </h2>
  <p className="pj-item text-ink/60 max-w-xl mx-auto mt-8 leading-relaxed text-base">
   Quatre typologies, un seul emplacement. Villas privées, lofts en co-investissement, gestion locative intégrée. Rendement projeté ~13% net par an.
  </p>
  </div>

  {/* Photo collage */}
	  <div className="pj-item container-page grid grid-cols-12 gap-3 mb-24">
	  <div className="col-span-7 relative rounded-sm overflow-hidden" style={{ aspectRatio: "5/3" }}>
	   <Image src="/villa-exterior.webp" alt="Vue extérieure Canggu Oasis" fill quality={82} className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1504px) 60vw, 880px" />
	  </div>
	  <div className="col-span-5 grid grid-rows-2 gap-3">
	   <div className="relative rounded-sm overflow-hidden">
	   <Image src="/villa-living.webp" alt="Salon villa" fill quality={82} className="object-cover" sizes="(max-width:768px) 50vw, (max-width:1504px) 40vw, 620px" />
	   </div>
	   <div className="relative rounded-sm overflow-hidden">
	   <Image src="/villa-bathroom.webp" alt="Salle de bain villa" fill quality={82} className="object-cover" sizes="(max-width:768px) 50vw, (max-width:1504px) 40vw, 620px" />
	   </div>
	  </div>
	  </div>

	  {/* Tall cards row with badge overlay, edge-to-edge light gap */}
  <div className="-mx-6 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
  {CARDS.map((c) => (
   <div key={c.label} className="pj-item relative group cursor-pointer overflow-hidden" style={{ aspectRatio: "9/16" }}>
   <Image
    src={c.img}
    alt={c.label}
    fill
	    quality={82}
	    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
    sizes="(max-width:768px) 50vw, 25vw"
   />
   <div className="absolute inset-0 bg-bg/10 group-hover:bg-bg/20 transition-colors duration-500 pointer-events-none" />
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
	    <div className="bg-ink/95 backdrop-blur-sm px-5 py-3.5 rounded-2xl whitespace-nowrap min-w-44">
	    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-bg/70 mb-1.5">{c.label}</p>
	    <p className="font-serif text-bg text-base font-semibold leading-tight">{c.price}</p>
    <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-bg/55 mt-1.5">{c.metric}</p>
    </div>
   </div>
   </div>
  ))}
  </div>
 </section>
 )
}
