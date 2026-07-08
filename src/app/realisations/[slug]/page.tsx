import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "../../../../sanity/lib/fetch"
import { REALISATION_BY_SLUG_QUERY, REALISATION_SLUGS_QUERY } from "../../../../sanity/lib/queries"
import { urlForImage } from "../../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"
import DossierForm from "@/components/sections/realisation/dossier-form"

const AC_TAG_BY_SLUG: Record<string, string> = {
  "seseh": "61",
  "canggu": "62",
  "canggu-residence-2024": "63",
  "uluwatu": "64",
}

type SanityImage = { asset?: { _ref: string }; alt?: string }

type Realisation = {
  _id: string
  title: string
  slug: string
  status?: string
  location?: string
  priceLabel?: string
  cardTitle?: string
  cardDescription?: string
  cardImage?: SanityImage
  tags?: string[]
  heroEyebrow?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  heroCtas?: Array<{ label: string; href: string; variant?: "default" | "inverse" | "outline" | "outline-inverse" }>
  keyStats?: Array<{ value: string; label: string }>
  gammesEyebrow?: string
  gammesTitle?: string
  gammes?: Array<{
    name: string
    slug?: string
    price?: string
    surface?: string
    bedrooms?: string
    revenue?: string
    yield?: string
    pool?: string
    image?: SanityImage
  }>
  inclus?: string[]
  inclusImage?: SanityImage
  projectionsEyebrow?: string
  projectionsTitle?: string
  projectionsDescription?: string
  projections?: Array<{ label: string; rendement?: string; ratio?: string; highlight?: boolean }>
  projectionStats?: Array<{ value: string; label: string }>
  localisationEyebrow?: string
  localisationTitle?: string
  distances?: Array<{ value: string; label: string }>
  garantiesEyebrow?: string
  garantiesTitle?: string
  garanties?: Array<{ value: string; label?: string; description?: string }>
  dossierEyebrow?: string
  dossierTitle?: string
  dossierDescription?: string
  dossierBullets?: string[]
  dossierImage?: SanityImage
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: REALISATION_SLUGS_QUERY })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = await sanityFetch<Realisation | null>({ query: REALISATION_BY_SLUG_QUERY, params: { slug } })
  if (!r) return {}

  const ogImage = r.seo?.ogImage?.asset
    ? urlForImage(r.seo.ogImage).width(1200).height(630).url()
    : r.heroImage?.asset
      ? urlForImage(r.heroImage).width(1200).height(630).url()
      : r.cardImage?.asset
        ? urlForImage(r.cardImage).width(1200).height(630).url()
        : undefined

  return {
    title: r.seo?.metaTitle || `${r.title} | SORA Immobilier`,
    description: r.seo?.metaDescription || r.cardDescription,
    openGraph: ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: r.title }] } : undefined,
  }
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = await sanityFetch<Realisation | null>({
    query: REALISATION_BY_SLUG_QUERY,
    params: { slug },
    tags: [`realisation:${slug}`],
  })
  if (!r) notFound()

  const heroImageUrl = r.heroImage?.asset
    ? urlForImage(r.heroImage).width(2400).url()
    : r.cardImage?.asset
      ? urlForImage(r.cardImage).width(2400).url()
      : null

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-background">
        {heroImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={heroImageUrl}
              alt={r.heroImage?.alt || r.title}
              fill
              quality={95}
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
        )}
        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-4xl">
          {r.heroEyebrow && <p className="eyebrow text-foreground mb-6">{r.heroEyebrow}</p>}
          <h1
            className="font-serif font-medium text-foreground leading-[0.92]"
            style={{ fontSize: "clamp(40px,6vw,96px)" }}
          >
            {r.heroTitle || r.title}
          </h1>
          {r.heroSubtitle && (
            <p className="text-foreground/80 mt-6 text-lg md:text-xl leading-relaxed max-w-2xl">
              {r.heroSubtitle}
            </p>
          )}
          {r.heroCtas && r.heroCtas.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {r.heroCtas.map((cta) => (
                <Button key={cta.label} asChild variant={cta.variant || "default"}>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats clés */}
      {r.keyStats && r.keyStats.length > 0 && (
        <section className="bg-primary py-24 md:py-36 px-6">
          <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {r.keyStats.map((s) => (
              <div key={s.label}>
                <p className="font-serif font-medium text-background text-3xl md:text-5xl">{s.value}</p>
                <p className="metadata text-background/55 mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gammes */}
      {r.gammes && r.gammes.length > 0 && (
        <section id="gammes" className="bg-card py-24 md:py-36 px-6">
          <div className="container-page">
            <div className="text-center mb-16 md:mb-24">
              {r.gammesEyebrow && <p className="eyebrow mx-auto mb-6">{r.gammesEyebrow}</p>}
              {r.gammesTitle && (
                <h2
                  className="font-serif font-medium text-foreground leading-[1.0]"
                  style={{ fontSize: "clamp(36px,5vw,72px)" }}
                >
                  {r.gammesTitle}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {r.gammes.map((g) => {
                const gammeImage = g.image?.asset ? urlForImage(g.image).width(1200).url() : null
                const cardBody = (
                  <>
                    {gammeImage && (
                      <Image
                        src={gammeImage}
                        alt={g.image?.alt || `Villa ${g.name}`}
                        fill
                        quality={95}
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="tertiary text-background/70 mb-2">{g.name}</p>
                          {g.price && (
                            <p className="font-serif text-background text-2xl md:text-3xl font-medium">{g.price}</p>
                          )}
                        </div>
                        <div className="text-right">
                          {(g.surface || g.bedrooms) && (
                            <p className="metadata text-background/65">
                              {[g.surface, g.bedrooms].filter(Boolean).join(" / ")}
                            </p>
                          )}
                          {g.revenue && <p className="metadata text-accent mt-1">{g.revenue}</p>}
                        </div>
                      </div>
                      {(g.pool || g.yield) && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {g.pool && (
                            <span className="metadata text-background/70 bg-background/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              {g.pool}
                            </span>
                          )}
                          {g.yield && (
                            <span className="metadata text-background/70 bg-background/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              {g.yield}
                            </span>
                          )}
                        </div>
                      )}
                      {g.slug && (
                        <div className="mt-5 pt-4 border-t border-background/20 flex items-center justify-between">
                          <span className="metadata text-background/70 group-hover:text-accent transition-colors">
                            Explorer la villa
                          </span>
                          <span className="text-background/70 group-hover:text-accent transition-colors">→</span>
                        </div>
                      )}
                    </div>
                  </>
                )
                const cardClass = "group relative rounded-sm overflow-hidden block"
                return g.slug ? (
                  <Link
                    key={g.name}
                    href={`/realisations/${slug}/${g.slug}`}
                    className={cardClass}
                    style={{ aspectRatio: "4/3" }}
                  >
                    {cardBody}
                  </Link>
                ) : (
                  <div key={g.name} className={cardClass} style={{ aspectRatio: "4/3" }}>
                    {cardBody}
                  </div>
                )
              })}
            </div>

            {r.inclus && r.inclus.length > 0 && (
              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="eyebrow mb-6">Inclus dans chaque villa</p>
                  <ul className="space-y-4">
                    {r.inclus.map((item) => (
                      <li key={item} className="flex gap-3 text-foreground/75 text-base">
                        <span className="text-accent mt-0.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {r.inclusImage?.asset && (
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                    <Image
                      src={urlForImage(r.inclusImage).width(1200).url()}
                      alt={r.inclusImage.alt || "Intérieur villa"}
                      fill
                      quality={95}
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projections */}
      {r.projections && r.projections.length > 0 && (
        <section className="bg-background py-24 md:py-36 px-6">
          <div className="container-page max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {r.projectionsEyebrow && <p className="eyebrow mx-auto mb-6">{r.projectionsEyebrow}</p>}
              {r.projectionsTitle && (
                <h2
                  className="font-serif font-medium text-foreground leading-[1.0]"
                  style={{ fontSize: "clamp(32px,4vw,60px)" }}
                >
                  {r.projectionsTitle}
                </h2>
              )}
              {r.projectionsDescription && (
                <p className="text-foreground/60 mt-6 max-w-xl mx-auto">{r.projectionsDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {r.projections.map((p) => (
                <div
                  key={p.label}
                  className={`rounded-sm p-6 md:p-8 text-center ${
                    p.highlight
                      ? "bg-accent/15 border border-accent/30"
                      : "bg-card border border-border"
                  }`}
                >
                  {p.rendement && (
                    <p className="font-serif font-medium text-foreground text-2xl md:text-3xl">{p.rendement}</p>
                  )}
                  {p.ratio && <p className="metadata text-foreground/50 mt-2">{p.ratio}</p>}
                  <p
                    className={`metadata mt-4 ${
                      p.highlight ? "text-accent font-semibold" : "text-foreground/60"
                    }`}
                  >
                    {p.label}
                  </p>
                </div>
              ))}
            </div>

            {r.projectionStats && r.projectionStats.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {r.projectionStats.map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-sm p-6">
                    <p className="font-serif font-medium text-foreground text-xl">{s.value}</p>
                    <p className="metadata text-foreground/50 mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Localisation */}
      {r.distances && r.distances.length > 0 && (
        <section className="bg-primary py-24 md:py-36 px-6">
          <div className="container-page max-w-4xl mx-auto text-center">
            {r.localisationEyebrow && (
              <p className="eyebrow-dark mx-auto mb-6">{r.localisationEyebrow}</p>
            )}
            {r.localisationTitle && (
              <h2
                className="font-serif font-medium text-background leading-[1.0]"
                style={{ fontSize: "clamp(32px,4vw,60px)" }}
              >
                {r.localisationTitle}
              </h2>
            )}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {r.distances.map((d) => (
                <div key={d.label}>
                  <p className="font-serif font-medium text-background text-2xl md:text-3xl">{d.value}</p>
                  <p className="metadata text-background/45 mt-2">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Garanties */}
      {r.garanties && r.garanties.length > 0 && (
        <section className="bg-card py-24 md:py-36 px-6">
          <div className="container-page max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {r.garantiesEyebrow && <p className="eyebrow mx-auto mb-6">{r.garantiesEyebrow}</p>}
              {r.garantiesTitle && (
                <h2
                  className="font-serif font-medium text-foreground leading-[1.0]"
                  style={{ fontSize: "clamp(32px,4vw,60px)" }}
                >
                  {r.garantiesTitle}
                </h2>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {r.garanties.map((g) => (
                <div key={g.value} className="bg-background border border-border rounded-sm p-8">
                  <p className="font-serif font-medium text-accent text-2xl mb-2">{g.value}</p>
                  {g.label && (
                    <p className="font-serif font-medium text-foreground text-base mb-3">{g.label}</p>
                  )}
                  {g.description && (
                    <p className="text-xs text-foreground/50 leading-relaxed">{g.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dossier form — visible uniquement pour les projets prochainement */}
      {r.status === "prochainement" && (
        <section id="dossier" className="bg-background py-24 md:py-36 px-6">
          <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              {r.dossierEyebrow && <p className="eyebrow mb-6">{r.dossierEyebrow}</p>}
              {r.dossierTitle && (
                <h2
                  className="font-serif font-medium text-foreground leading-[1.0]"
                  style={{ fontSize: "clamp(32px,4vw,60px)" }}
                >
                  {r.dossierTitle}
                </h2>
              )}
              {r.dossierDescription && (
                <p className="text-foreground/65 mt-6 leading-relaxed">{r.dossierDescription}</p>
              )}
              {r.dossierBullets && r.dossierBullets.length > 0 && (
                <ul className="mt-8 space-y-3 text-foreground/70 text-[15px]">
                  {r.dossierBullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-accent mt-0.5">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {r.dossierImage?.asset && (
                <div className="hidden md:block mt-12 relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src={urlForImage(r.dossierImage).width(1200).url()}
                    alt={r.dossierImage.alt || r.title}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="500px"
                  />
                </div>
              )}
            </div>

            <DossierForm slug={r.slug} acTagId={AC_TAG_BY_SLUG[r.slug]} />
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
