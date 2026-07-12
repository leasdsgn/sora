"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

export type Realisation = {
  slug: string
  image: string
  imageAlt?: string
  location: string
  price: string
  title: string
  description: string
  tags: string[]
  status: "En cours" | "Livré" | "Prochainement"
}

const STATUS_STYLES: Record<Realisation["status"], string> = {
  "En cours": "bg-accent text-background border-transparent",
  "Livré": "bg-primary text-background border-transparent",
  "Prochainement": "bg-background text-foreground border-foreground/20",
}

export default function CarouselSection({ realisations }: { realisations: Realisation[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cr-item", { opacity: 0, y: 28, duration: 0.9, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  if (realisations.length === 0) return null

  return (
    <section ref={sectionRef} className="bg-secondary py-24 md:py-36 overflow-hidden">
      <div className="container-page px-6 md:px-12">
        <Carousel
          opts={{ align: "start", loop: false, dragFree: false }}
          className="cr-item w-full"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-3xl">
              <p className="cr-item eyebrow text-foreground mb-6">Portefeuille</p>
              <h2 className="cr-item font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
                Nos réalisations.
              </h2>
              <p className="cr-item text-foreground/65 max-w-xl mt-6 leading-relaxed">
                Villas livrées, projets en cours et futures opérations, à Canggu, Seseh et alentour.
              </p>
            </div>
            <div className="hidden md:flex gap-3 shrink-0">
              <CarouselPrevious className="relative left-auto top-auto translate-y-0 h-12 w-12 border-foreground/30 text-foreground bg-transparent hover:bg-foreground hover:text-background" />
              <CarouselNext className="relative right-auto top-auto translate-y-0 h-12 w-12 border-foreground/30 text-foreground bg-transparent hover:bg-foreground hover:text-background" />
            </div>
          </div>

          <CarouselContent className="-ml-4 md:-ml-6">
          {realisations.map((r) => {
            const isClickable = r.status === "Prochainement"
            const cardClass = "group flex h-full flex-col bg-background rounded-sm overflow-hidden"
            const cardChildren = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.imageAlt || r.title}
                    fill
                    quality={95}
                    className={`object-cover transition-transform duration-[1200ms] ease-out ${isClickable ? "group-hover:scale-[1.03]" : ""}`}
                    sizes="(max-width:768px) 90vw, 45vw"
                  />
                  <Badge className={`absolute top-5 left-5 ${r.status === "Livré" ? "px-6 py-2.5 text-sm" : "px-5 py-2 text-xs"} ${STATUS_STYLES[r.status]}`}>
                    {r.status}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span className="metadata text-foreground/55">{r.location}</span>
                    <span className="metadata text-foreground/55 text-right">{r.price}</span>
                  </div>
                  <h3 className="font-serif font-medium text-foreground leading-[1.1] mb-4" style={{ fontSize: "clamp(22px,2vw,30px)" }}>
                    {r.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                    {r.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {r.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-foreground border-foreground/25">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  {isClickable && (
                    <div className="mt-auto flex items-center justify-between">
                      <span className="metadata text-foreground/60 group-hover:text-accent transition-colors duration-300">
                        Voir le projet
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center border border-foreground/25 rounded-full group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  )}
                </div>
              </>
            )
            return (
              <CarouselItem
                key={r.slug}
                className="pl-4 md:pl-6 basis-[90%] sm:basis-[70%] md:basis-[52%] lg:basis-[42%]"
              >
                {isClickable ? (
                  <Link href={`/realisations/${r.slug}`} className={cardClass}>{cardChildren}</Link>
                ) : (
                  <div className={cardClass}>{cardChildren}</div>
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
