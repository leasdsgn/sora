import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { sanityFetch } from "../../../../sanity/lib/fetch"
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "../../../../sanity/lib/queries"
import { urlForImage } from "../../../../sanity/lib/image"
import EventForm from "@/components/sections/event/event-form"
import type { Metadata } from "next"

type EventDetail = {
  _id: string
  title: string
  slug: string
  status?: string
  eventType?: string
  eyebrow?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  startsAt?: string
  endsAt?: string
  timezone?: string
  duration?: string
  location?: { type?: string; platform?: string; url?: string; address?: string }
  registration?: {
    ctaLabel?: string
    registrationUrl?: string
    seatsLimit?: number
    replayEnabled?: boolean
    finePrint?: string
  }
  speakers?: Array<{
    name: string
    role?: string
    bio?: string
    image?: { asset?: { _ref: string }; alt?: string }
  }>
  program?: Array<{ time?: string; title: string; description?: string }>
  body?: unknown
  crm?: { source?: string; freshsalesTag?: string; acTagId?: string }
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: { asset?: { _ref: string } } }
}

const STATUS_LABELS: Record<string, string> = {
  "en-cours": "En cours",
  prochainement: "Prochainement",
  termine: "Terminé",
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatEventDate(date?: string, timeZone?: string) {
  if (!date) return "Date à venir"
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timeZone || undefined,
  }).format(new Date(date))
  return capitalize(formatted)
}

function formatEventTime(date?: string, timeZone?: string) {
  if (!date) return null
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timeZone || undefined,
  }).format(new Date(date)).replace(":", "h")
}

function timezoneHint(timeZone?: string) {
  if (!timeZone) return null
  if (timeZone === "Europe/Paris") return "heure de Paris"
  const parts = timeZone.split("/")
  const city = parts[parts.length - 1]?.replace(/_/g, " ")
  return city ? `heure de ${city}` : null
}

function isInternalHref(href: string) {
  return href.startsWith("/")
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: EVENT_SLUGS_QUERY })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await sanityFetch<EventDetail | null>({ query: EVENT_BY_SLUG_QUERY, params: { slug } })
  if (!event) return {}

  const ogImage = event.seo?.ogImage?.asset
    ? urlForImage(event.seo.ogImage).width(1200).height(630).url()
    : event.mainImage?.asset
      ? urlForImage(event.mainImage).width(1200).height(630).url()
      : undefined

  return {
    title: event.seo?.metaTitle || `${event.title} | SORA Immobilier`,
    description: event.seo?.metaDescription || event.summary,
    openGraph: ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: event.title }] } : undefined,
  }
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="font-serif font-medium text-ink mt-16 mb-6 text-3xl md:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif font-medium text-ink mt-12 mb-4 text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="font-serif font-medium text-ink mt-8 mb-3 text-xl">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-accent pl-6 my-8 italic text-ink/75">{children}</blockquote>,
    normal: ({ children }) => <p className="text-ink/80 leading-relaxed mb-5">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel="noopener" className="text-accent underline underline-offset-4 hover:text-accent-soft">
        {children}
      </a>
    ),
    code: ({ children }) => <code className="font-mono text-sm bg-bg-mid px-1.5 py-0.5 rounded-sm">{children}</code>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-5 text-ink/80 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-5 text-ink/80 space-y-2">{children}</ol>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10 -mx-6 md:mx-0">
          <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || ""}
              fill
              sizes="(max-width:768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {value.alt && <figcaption className="mt-3 text-center metadata text-ink/45">{value.alt}</figcaption>}
        </figure>
      )
    },
  },
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await sanityFetch<EventDetail | null>({ query: EVENT_BY_SLUG_QUERY, params: { slug }, tags: [`event:${slug}`] })
  if (!event) notFound()

  const externalRegistration = event.registration?.registrationUrl
  const registrationHref = externalRegistration || "#inscription"
  const registrationLabel = event.registration?.ctaLabel || "Réserver ma place"
  const showEmbeddedForm = !externalRegistration

  return (
    <main className="bg-bg pt-32 md:pt-44 pb-24 px-6">
      <article className="container-page">
        <Link href="/events" className="inline-block mb-12 metadata text-ink/55 hover:text-accent transition-colors">
          ← Tous les évènements
        </Link>

        <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-muted mb-6">
              {event.eyebrow || event.eventType || "Évènement"}
            </p>
            <h1 className="font-serif font-medium text-ink leading-[1.0] mb-8" style={{ fontSize: "clamp(38px,5vw,82px)" }}>
              {event.title}
            </h1>
            {event.summary && <p className="text-lg md:text-xl text-ink/75 leading-relaxed max-w-2xl">{event.summary}</p>}
          </div>
          <aside className="md:col-span-5 bg-bg-soft border border-line rounded-sm p-6 md:p-8">
            <dl className="space-y-5">
              <div>
                <dt className="metadata text-ink/45 mb-1">Date</dt>
                <dd className="text-ink leading-relaxed">{formatEventDate(event.startsAt, event.timezone)}</dd>
              </div>
              {formatEventTime(event.startsAt, event.timezone) && (
                <div>
                  <dt className="metadata text-ink/45 mb-1">Heure</dt>
                  <dd className="text-ink">
                    {formatEventTime(event.startsAt, event.timezone)}
                    {timezoneHint(event.timezone) && (
                      <span className="text-ink/50 text-sm ml-2">
                        ({timezoneHint(event.timezone)})
                      </span>
                    )}
                  </dd>
                </div>
              )}
              {event.duration && (
                <div>
                  <dt className="metadata text-ink/45 mb-1">Durée</dt>
                  <dd className="text-ink">{event.duration}</dd>
                </div>
              )}
              {event.location?.platform && (
                <div>
                  <dt className="metadata text-ink/45 mb-1">Lieu</dt>
                  <dd className="text-ink">{event.location.platform}</dd>
                </div>
              )}
              {event.status && (
                <div>
                  <dt className="metadata text-ink/45 mb-1">Statut</dt>
                  <dd className="text-accent">{STATUS_LABELS[event.status] || event.status}</dd>
                </div>
              )}
            </dl>
            <div className="mt-8">
              {isInternalHref(registrationHref) ? (
                <Link href={registrationHref} className="cta-primary w-full font-serif font-semibold">
                  {registrationLabel}
                </Link>
              ) : (
                <a href={registrationHref} className="cta-primary w-full font-serif font-semibold">
                  {registrationLabel}
                </a>
              )}
              {event.registration?.finePrint && (
                <p className="metadata text-ink/40 text-center mt-4">{event.registration.finePrint}</p>
              )}
            </div>
          </aside>
        </header>

        <div className="relative w-full h-[420px] md:h-[560px] rounded-sm overflow-hidden mb-16 bg-bg-mid">
          {event.mainImage?.asset ? (
            <Image
              src={urlForImage(event.mainImage).width(1800).url()}
              alt={event.mainImage.alt || event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <Image
              src="/villa-render-exterior.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
        </div>

        {event.body ? (
          <div className="max-w-3xl mb-16">
            <PortableText value={event.body as never} components={components} />
          </div>
        ) : null}

        {(event.program?.length || event.speakers?.length) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {event.program && event.program.length > 0 && (
              <section className="bg-bg-soft border border-line rounded-sm p-6 md:p-8">
                <p className="eyebrow text-ink-muted mb-6">Programme</p>
                <div className="space-y-5">
                  {event.program.map((item, index) => (
                    <div key={`${item.time || index}-${item.title}`} className="flex gap-4">
                      <span className="metadata text-accent w-12 shrink-0 pt-0.5">{item.time || String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-serif text-lg text-ink leading-snug">{item.title}</p>
                        {item.description && <p className="text-sm text-ink/60 leading-relaxed mt-2">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <section className="bg-bg-soft border border-line rounded-sm p-6 md:p-8">
                <p className="eyebrow text-ink-muted mb-6">Intervenants</p>
                <div className="space-y-6">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.name} className="flex gap-4">
                      {speaker.image?.asset && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={urlForImage(speaker.image).width(160).height(160).url()}
                            alt={speaker.image.alt || speaker.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-serif text-lg text-ink">{speaker.name}</p>
                        {speaker.role && <p className="metadata text-ink/45 mt-1">{speaker.role}</p>}
                        {speaker.bio && <p className="text-sm text-ink/60 leading-relaxed mt-3">{speaker.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {showEmbeddedForm && (
          <section id="inscription" className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start bg-bg-soft border border-line rounded-sm p-8 md:p-12">
            <div className="max-w-md">
              <p className="eyebrow text-ink-muted mb-6">Inscription</p>
              <h2 className="font-serif font-medium text-ink leading-[1.05] text-3xl md:text-5xl">
                {registrationLabel}.
              </h2>
              <p className="text-ink/65 leading-relaxed mt-6">
                Renseignez vos coordonnées, vous recevez immédiatement les détails de connexion et un rappel la veille.
              </p>
              {event.duration && (
                <p className="metadata text-ink/45 mt-6">Durée · {event.duration}</p>
              )}
              {event.location?.platform && (
                <p className="metadata text-ink/45 mt-2">Lieu · {event.location.platform}</p>
              )}
            </div>
            <EventForm
              slug={event.slug}
              eventTitle={event.title}
              ctaLabel={event.registration?.ctaLabel}
              finePrint={event.registration?.finePrint}
              crmSource={event.crm?.source}
              freshsalesTag={event.crm?.freshsalesTag}
              acTagId={event.crm?.acTagId}
            />
          </section>
        )}
      </article>
    </main>
  )
}
