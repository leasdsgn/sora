import HeroSection from "@/components/sections/hero-section"
import BatikBanner from "@/components/sections/batik-banner"
import StatsSection from "@/components/sections/stats-section"
import ProjectSection from "@/components/sections/project-section"
import CarouselSection from "@/components/sections/carousel-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import EventsSection from "@/components/sections/events-section"
import BlogSection from "@/components/sections/blog-section"
import FounderSection from "@/components/sections/founder-section"
import FaqSection from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BatikBanner />
      <StatsSection />
      <ProjectSection />
      <CarouselSection />
      <TestimonialsSection />
      <EventsSection />
      <BlogSection />
      <FounderSection />
      <FaqSection />
      <CtaSection />
      <BatikBanner />
      <Footer />
    </main>
  )
}
