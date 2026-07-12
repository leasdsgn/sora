"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export type Testimonial = {
  quote: string
  image: string
  imageAlt?: string
  author?: string
  role?: string
}

const VIDEOS = [
  { src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4", aspect: "aspect-[9/16]" },
  { src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4", aspect: "aspect-video" },
  { src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4", aspect: "aspect-[9/16]" },
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
        {/* Mobile : titre + carousel + quote */}
        <div className="md:hidden">
          <div className="text-center mb-6">
            <p className="tm-item eyebrow-dark mb-4">Témoignages</p>
            <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(32px,4.5vw,64px)" }}>
              Ce que disent ceux qui ont investi.
            </h2>
          </div>
          <Carousel opts={{ align: "center", loop: true }} className="tm-item w-full">
            <CarouselContent className="-ml-3">
              {VIDEOS.map((v, i) => (
                <CarouselItem key={i} className="pl-3 basis-[85%]">
                  <div className={`relative rounded-sm overflow-hidden ${v.aspect}`}>
                    <video
                      src={v.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <blockquote className="tm-item text-center font-serif italic text-background text-lg leading-snug px-4 py-6">
            &laquo;&nbsp;Il y a 3 ans, j&apos;aurais jamais pensé pouvoir faire ça...&nbsp;&raquo;
          </blockquote>
        </div>

        {/* Desktop : bento 3 colonnes */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-4 items-stretch">
          <div className="tm-item relative rounded-sm overflow-hidden">
            <video
              src={VIDEOS[0].src}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-center py-6">
              <p className="tm-item eyebrow-dark mb-4">Témoignages</p>
              <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(32px,4.5vw,64px)" }}>
                Ce que disent ceux qui ont investi.
              </h2>
            </div>
            <div className="tm-item relative rounded-sm overflow-hidden aspect-video">
              <video
                src={VIDEOS[1].src}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <blockquote className="tm-item text-center font-serif italic text-background text-lg md:text-xl leading-snug px-4 py-4">
              &laquo;&nbsp;Il y a 3 ans, j&apos;aurais jamais pensé pouvoir faire ça...&nbsp;&raquo;
            </blockquote>
          </div>
          <div className="tm-item relative rounded-sm overflow-hidden">
            <video
              src={VIDEOS[2].src}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
