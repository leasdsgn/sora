"use client"
import { usePathname } from "next/navigation"
import Navbar, { type NavRealisation } from "./navbar"
import SmoothScroll from "@/components/smooth-scroll"

export function useIsStudio() {
  const pathname = usePathname()
  return !!pathname?.startsWith("/studio")
}

export function SiteChrome({ realisations }: { realisations: NavRealisation[] }) {
  const isStudio = useIsStudio()
  const pathname = usePathname()
  // Pas de navbar sur la VSL : funnel fermé, un seul CTA
  if (isStudio || pathname === "/vsl" || pathname === "/merci") return null
  return <Navbar realisations={realisations} />
}

export function ConditionalSmoothScroll({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio()
  if (isStudio) return <>{children}</>
  return <SmoothScroll>{children}</SmoothScroll>
}

export function DevAgentation({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio()
  if (isStudio) return null
  return <>{children}</>
}
