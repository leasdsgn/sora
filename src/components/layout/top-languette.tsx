"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function TopLanguette() {
  const ref = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tab-banner", { yPercent: -100, duration: 1, ease: "expo.out", delay: 0.1 })
    }, ref)
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      ctx.revert()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <>
      {/* Pendant, slides up at scroll */}
      <div
        ref={ref}
        className={`fixed top-0 left-1/2 z-[60] pointer-events-none transition-transform duration-500 ease-out ${
          scrolled ? "-translate-x-1/2 -translate-y-full" : "-translate-x-1/2 translate-y-0"
        }`}
      >
        <div className="tab-banner bg-ink rounded-b-[14px] shadow-xl pointer-events-auto w-[82px] md:w-[96px] h-[78px] md:h-[88px] flex items-center justify-center px-2.5">
          <Image
            src="/sora-logo-dark.svg"
            alt="SORA"
            width={1751}
            height={548}
            priority
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* Wordmark, emerges at scroll and takes the pendant's center spot */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-[55] pointer-events-none flex items-center justify-center transition-opacity duration-500 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "76px" }}
      >
        <a
          href="#"
          aria-label="SORA Immobilier"
          className="block pointer-events-auto"
          style={{
            width: "108px",
            aspectRatio: "1751 / 548",
            backgroundColor: "#262626",
            WebkitMaskImage: "url(/sora-logo.svg)",
            maskImage: "url(/sora-logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
    </>
  )
}
