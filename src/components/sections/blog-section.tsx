import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { LATEST_POSTS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  publishedAt: string
  author?: { name: string }
  categories?: Array<{ title: string; slug: string }>
}

export default async function BlogSection() {
  const posts = await sanityFetch<Post[]>({ query: LATEST_POSTS_QUERY, tags: ["post"] })

  return (
    <section className="bg-secondary py-24 md:py-36 px-6">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-4xl">
            <p className="eyebrow text-muted-foreground mb-6">Journal</p>
            <h2 className="font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
              Notes du terrain.
            </h2>
            <p className="text-foreground/65 max-w-2xl mt-6 leading-relaxed">
              Analyses chiffrées, retours d&apos;opérations et points de vigilance pour comprendre l&apos;immobilier balinais avant de se positionner.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">Lire le journal</Link>
          </Button>
        </div>

        {posts.length === 0 ? (
          <Card className="max-w-xl bg-card">
            <CardContent className="p-8 md:p-10">
              <p className="font-serif text-2xl text-foreground mb-3">Aucun article publié.</p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Les prochains articles seront affichés ici dès leur publication dans Sanity.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden mb-6 bg-secondary">
                  {post.mainImage?.asset ? (
                    <Image
                      src={urlForImage(post.mainImage).width(800).height(1000).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  ) : (
                    <Image
                      src="/villa-living.webp"
                      alt=""
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  )}
                </div>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <Badge key={category.slug} variant="outline" className="text-muted-foreground border-border/60">
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}
                <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300 mb-3">
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-sm text-foreground/65 leading-relaxed mb-5">{post.excerpt}</p>}
                <p className="mt-auto metadata text-foreground/40">
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  {post.author?.name ? ` / ${post.author.name}` : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
