"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, type MouseEvent } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type NavRealisation = {
  slug: string
  status: "En cours" | "Livré" | "Prochainement"
  location: string
  title: string
}

const STATUS_DOT: Record<NavRealisation["status"], string> = {
  "En cours": "bg-accent",
  "Prochainement": "bg-background",
  "Livré": "bg-background/40",
}

export default function Navbar({ realisations }: { realisations: NavRealisation[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileRealisationsOpen, setMobileRealisationsOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const openDropdown = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdownOpen(true)
  }

  const closeDropdown = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
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

        {/* Desktop navigation */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center text-background">
          <div className="flex items-center gap-14 justify-end pr-14">
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                className="nav-link inline-flex items-center gap-1.5"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Réalisations
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link href="/#fondateur" onClick={goToHomeAnchor("fondateur")} className="nav-link">Fondateur</Link>
          </div>
          <Link href="/" aria-label="SORA Immobilier" className="block">
            <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} priority className="no-outline block h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-14 justify-start pl-14">
            <Link href="/masterclass" className="nav-link">Replay</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>

        {/* Mobile logo */}
        <Link href="/" aria-label="SORA Immobilier" className="md:hidden justify-self-center">
          <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} priority className="no-outline block h-5 w-auto" />
        </Link>

        {/* Desktop CTA */}
        <div className="hidden md:flex justify-end">
          <Button asChild variant="inverse" size="sm">
            <Link href="/contact">Prendre RDV</Link>
          </Button>
        </div>
      </nav>

      {/* Desktop dropdown panel */}
      {realisations.length > 0 && (
        <div
          className={`hidden md:block fixed left-0 right-0 top-[64px] z-40 transition-all duration-300 ${
            dropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="bg-primary border-b border-background/10 py-8 px-10">
            <div className="container-page grid grid-cols-2 lg:grid-cols-4 gap-3">
              {realisations.map((r) => (
                <Link
                  key={r.slug}
                  href={`/realisations/${r.slug}`}
                  onClick={() => setDropdownOpen(false)}
                  className="group flex flex-col gap-3 p-5 rounded-sm border border-background/10 hover:border-background/30 hover:bg-background/5 transition-all duration-300"
                >
                  <span className="inline-flex items-center gap-2 metadata text-background/55 group-hover:text-background/80 transition-colors">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[r.status]}`} />
                    {r.status}
                  </span>
                  <span className="font-serif text-background text-lg leading-[1.2]">{r.title}</span>
                  {r.location && (
                    <span className="metadata text-background/45">{r.location}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-primary transition-all duration-500 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between pt-28 pb-12 px-8 overflow-y-auto">
          <nav className="flex flex-col gap-8">
            <div>
              <button
                type="button"
                onClick={() => setMobileRealisationsOpen((v) => !v)}
                className="font-serif font-semibold text-3xl text-background hover:text-accent transition-colors duration-300 inline-flex items-center gap-3"
              >
                Réalisations
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileRealisationsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileRealisationsOpen && realisations.length > 0 && (
                <div className="mt-6 flex flex-col gap-4 pl-4 border-l border-background/15">
                  {realisations.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/realisations/${r.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex flex-col gap-1"
                    >
                      <span className="inline-flex items-center gap-2 metadata text-background/55">
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[r.status]}`} />
                        {r.status}
                      </span>
                      <span className="font-serif text-background text-xl leading-tight">{r.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/#fondateur"
              onClick={goToHomeAnchor("fondateur")}
              className="font-serif font-semibold text-3xl text-background hover:text-accent transition-colors duration-300"
            >
              Fondateur
            </Link>
            <Link
              href="/masterclass"
              onClick={() => setMenuOpen(false)}
              className="font-serif font-semibold text-3xl text-background hover:text-accent transition-colors duration-300"
            >
              Replay
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-serif font-semibold text-3xl text-background hover:text-accent transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>
          <div className="flex flex-col gap-6 items-center">
            <Button asChild variant="inverse">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
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
