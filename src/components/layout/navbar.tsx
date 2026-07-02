"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, type MouseEvent } from "react"
import { Button } from "@/components/ui/button"

const MOBILE_LINKS = [
  { href: "/seseh", label: "Seseh" },
  { href: "/#fondateur", label: "Fondateur", anchorId: "fondateur" },
  { href: "/masterclass", label: "Masterclass" },
  { href: "/seseh#dossier", label: "Dossier" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const goToHomeAnchor = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(false)

    const href = `/#${id}`
    if (window.location.pathname !== "/") {
      window.location.assign(href)
      return
    }

    window.history.pushState(null, "", href)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10 py-4 bg-primary transition-all duration-500 ${
        scrolled ? "border-b border-background/10" : "border-b border-transparent"
      }`}>
        {/* Mobile hamburger */}
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="md:hidden flex flex-col gap-1.5 p-2 -ml-2 group text-background"
          >
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center text-background">
          <div className="flex items-center gap-14 justify-end pr-14">
            <Link href="/seseh" className="nav-link">Seseh</Link>
            <Link href="/#fondateur" onClick={goToHomeAnchor("fondateur")} className="nav-link">Fondateur</Link>
          </div>
          <Link href="/" aria-label="SORA Immobilier" className="block">
            <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} priority className="no-outline block h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-14 justify-start pl-14">
            <Link href="/masterclass" className="nav-link">Masterclass</Link>
            <Link href="/seseh#dossier" className="nav-link">Dossier</Link>
          </div>
        </div>
        <Link href="/" aria-label="SORA Immobilier" className="md:hidden justify-self-center">
          <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} priority className="no-outline block h-5 w-auto" />
        </Link>
        <div className="hidden md:flex justify-end">
          <Button asChild variant="inverse" size="sm">
            <Link href="/#contact" onClick={goToHomeAnchor("contact")}>Prendre RDV</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-primary transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between pt-28 pb-12 px-8">
          <nav className="flex flex-col gap-8">
            {MOBILE_LINKS.map((link, i) => (
              <Link
                key={link.label + i}
                href={link.href}
                onClick={link.anchorId ? goToHomeAnchor(link.anchorId) : () => setMenuOpen(false)}
                className="font-serif font-semibold text-3xl text-background hover:text-accent transition-colors duration-300"
                style={{
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `opacity 500ms ease-out ${100 + i * 60}ms, transform 500ms ease-out ${100 + i * 60}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-6 items-center">
            <Button asChild variant="inverse">
              <Link href="/#contact" onClick={goToHomeAnchor("contact")}>
                Prendre RDV
              </Link>
            </Button>
            <p className="metadata text-background/40 text-center">Canggu, Bali, Indonésie</p>
          </div>
        </div>
      </div>
    </>
  )
}
