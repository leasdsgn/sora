import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { ALL_EVENTS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Évènements | SORA Immobilier",
  description: "Webinaires, masterclass et rendez-vous SORA autour de l'investissement immobilier à Bali.",
}

type EventItem = {
  _id: string
  title: string
  slug: string
  status?: string
  eventType?: string
  eyebrow?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  startsAt?: string
  duration?: string
  location?: { type?: string; platform?: string }
}

const STATUS_LABELS: Record<string, string> = {
  "en-cours": "En cours",
  prochainement: "Prochainement",
  termine: "Terminé",
}

function formatEventDate(date?: string) {
  if (!date) return "Date à venir"

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export default async function EventsIndexPage() {
  const events = await sanityFetch<EventItem[]>({ query: ALL_EVENTS_QUERY, tags: ["event"] })

  return (
    <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6 md:px-12">
      <div className="container-page">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <p className="eyebrow mx-auto text-ink-muted mb-6">Évènements</p>
          <h1 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
            Webinaires et rendez-vous terrain.
          </h1>
          <p className="text-ink/60 mt-8 leading-relaxed text-base max-w-2xl mx-auto">
            Sessions en ligne, masterclass et échanges autour du cadre juridique, des chiffres et des opérations suivies à Bali.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="max-w-xl mx-auto border border-line bg-bg-soft rounded-sm p-8 text-center">
            <p className="font-serif text-2xl text-ink mb-3">Aucun évènement publié.</p>
            <p className="text-sm text-ink/60 leading-relaxed">
              Les prochaines sessions seront ajoutées ici dès leur publication.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug}`}
                className="group flex flex-col rounded-sm overflow-hidden bg-bg-soft border border-line"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-mid">
                  {event.mainImage?.asset ? (
                    <Image
                      src={urlForImage(event.mainImage).width(900).height(675).url()}
                      alt={event.mainImage.alt || event.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  ) : (
                    <Image
                      src="/villa-render-exterior.webp"
                      alt=""
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/10 to-transparent" />
                  {event.status && (
                    <span className="absolute top-4 left-4 eyebrow text-ink">
                      {STATUS_LABELS[event.status] || event.status}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="metadata text-ink/45 mb-4">
                    {formatEventDate(event.startsAt)}
                    {event.duration ? ` / ${event.duration}` : ""}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors duration-300 mb-4">
                    {event.title}
                  </h2>
                  {event.summary && <p className="text-sm text-ink/65 leading-relaxed mb-8">{event.summary}</p>}
                  <p className="mt-auto metadata text-accent">
                    Voir l&apos;évènement
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
