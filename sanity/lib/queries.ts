import { defineQuery } from "next-sanity"

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{ name, "slug": slug.current, image },
    "categories": categories[]->{ title, "slug": slug.current }
  }
`)

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{ name, "slug": slug.current, image },
    "categories": categories[]->{ title, "slug": slug.current }
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{ name, "slug": slug.current, image, bio },
    "categories": categories[]->{ title, "slug": slug.current },
    seo
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`)

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)] | order(startsAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    eventType,
    eyebrow,
    summary,
    mainImage,
    startsAt,
    endsAt,
    timezone,
    duration,
    location,
    registration,
    featured
  }
`)

export const FEATURED_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)] | order(featured desc, startsAt asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    status,
    eventType,
    eyebrow,
    summary,
    mainImage,
    startsAt,
    endsAt,
    timezone,
    duration,
    location,
    registration,
    featured
  }
`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    eventType,
    eyebrow,
    summary,
    mainImage,
    startsAt,
    endsAt,
    timezone,
    duration,
    location,
    registration,
    speakers,
    program,
    body,
    featured,
    crm,
    seo
  }
`)

export const EVENT_SLUGS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)]{ "slug": slug.current }
`)

export const ALL_REALISATIONS_QUERY = defineQuery(`
  *[_type == "realisation" && defined(slug.current)] | order(order asc, cardTitle asc) {
    _id,
    "slug": slug.current,
    status,
    location,
    priceLabel,
    cardTitle,
    cardDescription,
    cardImage,
    tags
  }
`)

export const REALISATION_BY_SLUG_QUERY = defineQuery(`
  *[_type == "realisation" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    location,
    priceLabel,
    cardTitle,
    cardDescription,
    cardImage,
    tags,
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroCtas,
    keyStats,
    gammesEyebrow,
    gammesTitle,
    gammes[]{
      _key,
      name,
      "slug": slug.current,
      price,
      surface,
      bedrooms,
      bathrooms,
      revenue,
      "yield": yield,
      pool,
      image
    },
    inclus,
    inclusImage,
    projectionsEyebrow,
    projectionsTitle,
    projectionsDescription,
    projections,
    projectionStats,
    localisationEyebrow,
    localisationTitle,
    distances,
    garantiesEyebrow,
    garantiesTitle,
    garanties,
    dossierEyebrow,
    dossierTitle,
    dossierDescription,
    dossierBullets,
    dossierImage,
    seo
  }
`)

export const REALISATION_SLUGS_QUERY = defineQuery(`
  *[_type == "realisation" && defined(slug.current)]{ "slug": slug.current }
`)

export const GAMME_BY_SLUG_QUERY = defineQuery(`
  *[_type == "realisation" && slug.current == $realisationSlug][0] {
    "realisationSlug": slug.current,
    "realisationTitle": cardTitle,
    "realisationLocation": location,
    status,
    "gamme": gammes[slug.current == $gammeSlug][0] {
      name,
      "slug": slug.current,
      price,
      surface,
      bedrooms,
      bathrooms,
      revenue,
      "yield": yield,
      pool,
      image,
      description,
      planKey,
      roomsRdc,
      roomsEtage,
      features,
      gallery,
      vrUrl,
      preReserveUrl
    }
  }
`)

export const GAMME_SLUGS_QUERY = defineQuery(`
  *[_type == "realisation" && defined(slug.current)]{
    "realisationSlug": slug.current,
    "gammes": gammes[defined(slug.current)]{ "slug": slug.current }
  }
`)

export const NAV_REALISATIONS_QUERY = defineQuery(`
  *[_type == "realisation" && defined(slug.current)] | order(order asc, cardTitle asc) {
    "slug": slug.current,
    status,
    location,
    cardTitle,
    heroTitle
  }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured != false] | order(order asc, _createdAt asc) {
    _id,
    quote,
    author,
    role,
    image
  }
`)
