import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { sanityFetch } from "../../../../sanity/lib/fetch"
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "../../../../sanity/lib/queries"
import { urlForImage } from "../../../../sanity/lib/image"
import type { Metadata } from "next"

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  publishedAt: string
  body?: unknown
  author?: { name: string; image?: { asset?: { _ref: string } }; bio?: string }
  categories?: Array<{ title: string; slug: string }>
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: { asset?: { _ref: string } } }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: POST_SLUGS_QUERY })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: POST_BY_SLUG_QUERY, params: { slug } })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || `${post.title} | SORA Immobilier`,
    description: post.seo?.metaDescription || post.excerpt,
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: POST_BY_SLUG_QUERY, params: { slug }, tags: [`post:${slug}`] })
  if (!post) notFound()

  return (
    <main className="bg-bg pt-32 md:pt-44 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-block mb-12 metadata text-ink/55 hover:text-accent transition-colors">
          ← Tous les articles
        </Link>

        {post.categories && post.categories.length > 0 && (
          <p className="metadata text-ink/45 mb-6">
            {post.categories.map((c) => c.title).join(" / ")}
          </p>
        )}

        <h1 className="font-serif font-medium text-ink leading-[1.05] mb-8" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 text-ink/55 text-sm">
          {post.author?.name && <span>{post.author.name}</span>}
          {post.author?.name && <span className="text-ink/25">/</span>}
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>

        {post.mainImage?.asset && (
          <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-12 -mx-6 md:mx-0">
            <Image
              src={urlForImage(post.mainImage).width(1600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              priority
              sizes="(max-width:768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="font-serif text-xl md:text-2xl text-ink/80 leading-relaxed mb-12">
            {post.excerpt}
          </p>
        )}

        <div className="prose-content">
          {post.body ? <PortableText value={post.body as never} components={components} /> : null}
        </div>

        {post.author?.bio && (
          <aside className="mt-20 pt-10 border-t border-ink/15 flex gap-5">
            {post.author.image?.asset && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image src={urlForImage(post.author.image).width(160).height(160).url()} alt={post.author.name} fill sizes="64px" className="object-cover" />
              </div>
            )}
            <div>
              <p className="font-serif text-lg text-ink mb-1">{post.author.name}</p>
              <p className="text-sm text-ink/65 leading-relaxed">{post.author.bio}</p>
            </div>
          </aside>
        )}
      </article>
    </main>
  )
}
