"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export type Testimonial = {
  quote: string
  image: string
  imageAlt?: string
  author?: string
  role?: string
}

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
        <div className="tm-item grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-3 md:gap-4 items-stretch">
          {/* Vertical gauche */}
          <div className="hidden md:block relative rounded-sm overflow-hidden aspect-[9/16] md:aspect-auto">
            <video
              src="https://res.cloudinary.com/dfpaw573r/video/upload/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4"
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Colonne centrale : titre + vidéo horizontale + quote */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="text-center py-4 md:py-6">
              <p className="tm-item eyebrow-dark mb-4">Témoignages</p>
              <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(32px,4.5vw,64px)" }}>
                Ce que disent ceux qui ont investi.
              </h2>
            </div>
            <div className="relative rounded-sm overflow-hidden aspect-video">
              <video
                src="https://res.cloudinary.com/dfpaw573r/video/upload/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4"
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
          {/* Vertical droite */}
          <div className="hidden md:block relative rounded-sm overflow-hidden aspect-[9/16] md:aspect-auto">
            <video
              src="https://res.cloudinary.com/dfpaw573r/video/upload/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4"
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
