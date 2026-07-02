import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { FEATURED_EVENTS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type EventItem = {
  _id: string
  title: string
  slug: string
  status?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  startsAt?: string
  duration?: string
}

const STATUS_LABELS: Record<string, string> = {
  open: "Ouvert",
  full: "Complet",
  past: "Terminé",
  replay: "Replay",
}

function formatEventDate(date?: string) {
  if (!date) return "Date à venir"

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export default async function EventsSection() {
  const events = await sanityFetch<EventItem[]>({ query: FEATURED_EVENTS_QUERY, tags: ["event"] })

  return (
    <section className="bg-card py-24 md:py-36 px-6 overflow-hidden">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-4xl">
            <p className="eyebrow text-muted-foreground mb-6">Évènements</p>
            <h2 className="font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
              Les prochaines sessions.
            </h2>
            <p className="text-foreground/65 max-w-2xl mt-6 leading-relaxed">
              Webinaires, masterclass et rendez-vous en ligne pour lire le marché, poser les bonnes questions et vérifier les montages avant d&apos;investir.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/events">Voir tous les évènements</Link>
          </Button>
        </div>

        {events.length === 0 ? (
          <Card className="max-w-xl">
            <CardContent className="p-8 md:p-10">
              <p className="font-serif text-2xl text-foreground mb-3">Aucune session publiée.</p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Les prochains évènements seront affichés ici dès leur publication dans Sanity.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="scrollbar-hidden -mx-6 overflow-x-auto snap-x snap-mandatory">
            <div className="flex gap-4 md:gap-6 px-6 min-w-full">
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug}`}
                  className="group snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[420px]"
                >
                  <Card className="overflow-hidden flex flex-col h-full">
                    <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                      {event.mainImage?.asset ? (
                        <Image
                          src={urlForImage(event.mainImage).width(840).height(630).url()}
                          alt={event.mainImage.alt || event.title}
                          fill
                          sizes="(max-width:768px) 82vw, 420px"
                          className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                        />
                      ) : (
                        <Image
                          src="/villa-render-exterior.webp"
                          alt=""
                          fill
                          sizes="(max-width:768px) 82vw, 420px"
                          className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                      {event.status && (
                        <Badge variant="outline" className="absolute top-4 left-4 bg-background/85 backdrop-blur-sm border-border">
                          {STATUS_LABELS[event.status] || event.status}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6 md:p-7 flex flex-1 flex-col">
                      <p className="metadata text-foreground/45 mb-4">
                        {formatEventDate(event.startsAt)}
                        {event.duration ? ` / ${event.duration}` : ""}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300 mb-4">
                        {event.title}
                      </h3>
                      {event.summary && <p className="text-sm text-foreground/65 leading-relaxed mb-8">{event.summary}</p>}
                      <p className="metadata text-accent mt-auto">Voir la session</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
