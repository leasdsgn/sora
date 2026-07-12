import HeroSection from "@/components/sections/hero-section"
import StatsSection from "@/components/sections/stats-section"
import BrochureCta from "@/components/sections/brochure-cta"
import ProjectSection from "@/components/sections/project-section"
import CarouselSection, { type Realisation } from "@/components/sections/carousel-section"
import TestimonialsSection, { type Testimonial } from "@/components/sections/testimonials-section"
import EventsSection from "@/components/sections/events-section"
import PodcastSection from "@/components/sections/podcast-section"
import FounderSection from "@/components/sections/founder-section"
import FaqSection from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"
import { sanityFetch } from "../../sanity/lib/fetch"
import { ALL_REALISATIONS_QUERY, TESTIMONIALS_QUERY } from "../../sanity/lib/queries"
import { urlForImage } from "../../sanity/lib/image"

type RealisationRaw = {
  _id: string
  slug: string
  status?: string
  location?: string
  priceLabel?: string
  cardTitle?: string
  cardDescription?: string
  cardImage?: { asset?: { _ref: string }; alt?: string }
  tags?: string[]
}

type TestimonialRaw = {
  _id: string
  quote?: string
  author?: string
  role?: string
  image?: { asset?: { _ref: string }; alt?: string }
}

const STATUS_LABEL: Record<string, Realisation["status"]> = {
  "en-cours": "En cours",
  "prochainement": "Prochainement",
  "livre": "Livré",
}

export default async function Home() {
  const [realisationsRaw, testimonialsRaw] = await Promise.all([
    sanityFetch<RealisationRaw[]>({ query: ALL_REALISATIONS_QUERY, tags: ["realisation"] }),
    sanityFetch<TestimonialRaw[]>({ query: TESTIMONIALS_QUERY, tags: ["testimonial"] }),
  ])

  const SLUG_ORDER: Record<string, number> = { "seseh": 0, "canggu": 1, "canggu-residence-2024": 2, "uluwatu": 3 }
  const sorted = [...realisationsRaw].sort((a, b) => (SLUG_ORDER[a.slug] ?? 9) - (SLUG_ORDER[b.slug] ?? 9))

  const realisations: Realisation[] = sorted.map((r) => ({
    slug: r.slug,
    image: r.cardImage?.asset ? urlForImage(r.cardImage).width(1600).url() : "/villa-exterior.webp",
    imageAlt: r.cardImage?.alt || r.cardTitle || "",
    location: r.location || "",
    price: r.priceLabel || "",
    title: r.cardTitle || "",
    description: r.cardDescription || "",
    tags: r.tags || [],
    status: STATUS_LABEL[r.status || "en-cours"] || "En cours",
  }))

  const testimonials: Testimonial[] = testimonialsRaw
    .filter((t) => t.quote && t.image?.asset)
    .map((t) => ({
      quote: t.quote!,
      image: urlForImage(t.image!).width(1200).url(),
      imageAlt: t.image!.alt || "",
      author: t.author,
      role: t.role,
    }))

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <BrochureCta />
      <ProjectSection />
      <CarouselSection realisations={realisations} />
      <TestimonialsSection testimonials={testimonials} />
      <EventsSection />
      <PodcastSection />
      <FounderSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
