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
