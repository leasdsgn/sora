"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play } from "lucide-react"
import Image from "next/image"
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
  {
    src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4",
    poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.jpg",
    aspect: "aspect-[9/16]",
  },
  {
    src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4",
    poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.jpg",
    aspect: "aspect-video",
  },
  {
    src: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4",
    poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.jpg",
    aspect: "aspect-[9/16]",
  },
]

function VideoCard({ src, poster, aspect }: { src: string; poster: string; aspect: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
    setPlaying(true)
  }

  return (
    <div className={`relative rounded-sm overflow-hidden ${aspect}`}>
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <button onClick={handlePlay} className="absolute inset-0 w-full h-full cursor-pointer group">
          <Image
            src={poster}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 85vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg">
              <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
            </span>
            <span className="text-background text-sm font-medium tracking-wide uppercase">
              Écouter le témoignage
            </span>
          </div>
        </button>
      )}
    </div>
  )
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
    <section ref={ref} className="bg-accent py-12 md:py-16 px-6">
      <div className="container-page max-w-5xl">
        {/* Mobile : titre + carousel + quote */}
        <div className="md:hidden">
          <div className="text-center mb-6">
            <p className="tm-item eyebrow-dark mb-3">Témoignages</p>
            <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              Ce que disent ceux qui ont investi.
            </h2>
          </div>
          <Carousel opts={{ align: "center", loop: true }} className="tm-item w-full">
            <CarouselContent className="-ml-3" style={{ alignItems: "flex-start" }}>
              {VIDEOS.map((v, i) => (
                <CarouselItem key={i} className="pl-3 basis-[85%]">
                  <VideoCard src={v.src} poster={v.poster} aspect={v.aspect} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <blockquote className="tm-item text-center font-serif italic text-background text-lg leading-snug px-4 py-5">
            &laquo;&nbsp;Il y a 3 ans, j&apos;aurais jamais pensé pouvoir faire ça...&nbsp;&raquo;
          </blockquote>
        </div>

        {/* Desktop : bento 3 colonnes compact */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-3 items-stretch">
          <div className="tm-item">
            <VideoCard src={VIDEOS[0].src} poster={VIDEOS[0].poster} aspect="h-full" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center py-4">
              <p className="tm-item eyebrow-dark mb-3">Témoignages</p>
              <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(28px,3.5vw,52px)" }}>
                Ce que disent ceux qui ont investi.
              </h2>
            </div>
            <div className="tm-item">
              <VideoCard src={VIDEOS[1].src} poster={VIDEOS[1].poster} aspect="aspect-video" />
            </div>
            <blockquote className="tm-item text-center font-serif italic text-background text-base md:text-lg leading-snug px-4 py-3">
              &laquo;&nbsp;Il y a 3 ans, j&apos;aurais jamais pensé pouvoir faire ça...&nbsp;&raquo;
            </blockquote>
          </div>
          <div className="tm-item">
            <VideoCard src={VIDEOS[2].src} poster={VIDEOS[2].poster} aspect="h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
