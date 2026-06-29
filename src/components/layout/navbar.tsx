"use client"
import { useState, useEffect } from "react"

const MOBILE_LINKS = [
 { href: "#projet", label: "Projet" },
 { href: "/seseh", label: "Seseh" },
 { href: "#fondateur", label: "Fondateur" },
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

 return (
 <>
 <nav className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10 py-5 transition-all duration-500 ${
  scrolled || menuOpen ? "bg-bg/85 backdrop-blur-md border-b border-line" : ""
 }`}>
  {/* Mobile hamburger / Desktop empty */}
  <div className="flex items-center">
   <button
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
    className="md:hidden flex flex-col gap-1.5 p-2 -ml-2 group"
   >
    <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
    <span className={`block w-6 h-px bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
    <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
   </button>
  </div>
  <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center text-ink">
  <div className="flex items-center gap-14 justify-end pr-14">
   <a href="#projet" className="font-serif font-semibold text-[11px] tracking-[0.22em] uppercase hover:text-accent transition-colors duration-300">Projet</a>
   <a href="/seseh" className="font-serif font-semibold text-[11px] tracking-[0.22em] uppercase hover:text-accent transition-colors duration-300">Seseh</a>
   <a href="#fondateur" className="font-serif font-semibold text-[11px] tracking-[0.22em] uppercase hover:text-accent transition-colors duration-300">Fondateur</a>
  </div>
  <div className="w-[140px] md:w-[180px]" aria-hidden="true" />
  <div className="flex items-center gap-14 justify-start pl-14">
   <a href="/masterclass" className="font-serif font-semibold text-[11px] tracking-[0.22em] uppercase hover:text-accent transition-colors duration-300">Masterclass</a>
   <a href="/seseh#dossier" className="font-serif font-semibold text-[11px] tracking-[0.22em] uppercase hover:text-accent transition-colors duration-300">Dossier</a>
  </div>
  </div>
   <div className="hidden md:flex justify-end">
    <a href="#contact" className={`font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-5 py-2.5 rounded-full transition-all duration-500 ${
     scrolled
     ? "bg-accent text-ink hover:bg-accent-soft"
     : "border border-ink/40 text-ink hover:bg-accent hover:border-accent hover:text-ink"
    }`}>Prendre RDV</a>
   </div>
 </nav>

 {/* Mobile menu overlay */}
 <div
  className={`md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-md transition-all duration-500 ease-out ${
   menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
 >
  <div className="h-full flex flex-col justify-between pt-28 pb-12 px-8">
   <nav className="flex flex-col gap-8">
    {MOBILE_LINKS.map((link, i) => (
     <a
      key={link.label + i}
      href={link.href}
      onClick={() => setMenuOpen(false)}
      className="font-serif font-semibold text-3xl text-ink hover:text-accent transition-colors duration-300"
      style={{
       transform: menuOpen ? "translateY(0)" : "translateY(20px)",
       opacity: menuOpen ? 1 : 0,
       transition: `opacity 500ms ease-out ${100 + i * 60}ms, transform 500ms ease-out ${100 + i * 60}ms`,
      }}
     >
      {link.label}
     </a>
    ))}
   </nav>
   <div className="flex flex-col gap-6">
    <a
     href="#contact"
     onClick={() => setMenuOpen(false)}
     className="inline-flex items-center justify-center bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full"
    >
     Prendre RDV
    </a>
    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 text-center">Canggu, Bali, Indonésie</p>
   </div>
  </div>
 </div>
 </>
 )
}
