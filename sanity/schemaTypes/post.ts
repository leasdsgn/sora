import { defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
      description: "150–200 caractères. Visible sur la liste et en SEO description par défaut.",
      validation: (r) => r.max(220),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: "body", title: "Contenu", type: "blockContent" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string", validation: (r) => r.max(70) },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 2, validation: (r) => r.max(170) },
        { name: "ogImage", title: "Image Open Graph", type: "image" },
      ],
    }),
  ],
  orderings: [
    { title: "Date (récent → ancien)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", media: "mainImage", author: "author.name", date: "publishedAt" },
    prepare({ title, media, author, date }) {
      return {
        title,
        media,
        subtitle: [author, date ? new Date(date).toLocaleDateString("fr-FR") : null].filter(Boolean).join(" · "),
      }
    },
  },
})
