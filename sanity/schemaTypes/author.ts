import { defineField, defineType } from "sanity"

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", title: "Portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "name", media: "image" } },
})
