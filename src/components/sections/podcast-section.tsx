import Link from "next/link"
import { Button } from "@/components/ui/button"

const PODCASTS = [
  {
    id: "v6SjHj_l9So",
    title: "Investir à Bali : Mythes, Réalités et Vrais Chiffres",
    guest: "Thomas Cornu (LyBox)",
    label: "Podcast",
  },
  {
    id: "74iWwUpNcKE",
    title: "Biarritz VS Bali : le meilleur et le pire de l'investissement immobilier",
    guest: "Crazy Home Pays Basque",
    label: "Podcast",
  },
  {
    id: "5k5wR73n8Zg",
    title: "Investissement Bali : Mythes, Réalités & Vrais Chiffres",
    guest: "Crazy Home Pays Basque",
    label: "Podcast",
  },
  {
    id: "VuB8wuBHfL4",
    title: "Soirée d'investisseurs à Biarritz",
    guest: "SORA x Crazy Home",
    label: "Évènement",
  },
]

export default function PodcastSection() {
  return (
    <section className="bg-secondary py-24 md:py-36 px-6">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-4xl">
            <p className="eyebrow text-muted-foreground mb-6">Podcasts & vidéos</p>
            <h2
              className="font-serif font-medium text-foreground leading-[1.0]"
              style={{ fontSize: "clamp(36px,5vw,72px)" }}
            >
              Sur le terrain.
            </h2>
            <p className="text-foreground/65 max-w-2xl mt-6 leading-relaxed">
              Gabriel partage son expérience et ses analyses dans des podcasts et évènements avec
              d&apos;autres experts de l&apos;investissement.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link
              href="https://www.youtube.com/@GABRIEL_LAPIERRE"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chaîne YouTube
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PODCASTS.map((p) => (
            <Link
              key={p.id}
              href={`https://www.youtube.com/watch?v=${p.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-sm overflow-hidden bg-foreground/5">
                <img
                  src={`https://img.youtube.com/vi/${p.id}/hqdefault.jpg`}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="metadata text-muted-foreground mb-2">{p.label} / {p.guest}</p>
                <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
