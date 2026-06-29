import { defineArrayMember, defineType } from "sanity"

export const blockContent = defineType({
  title: "Contenu",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Liste à puces", value: "bullet" },
        { title: "Liste numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
          { title: "Code inline", value: "code" },
        ],
        annotations: [
          {
            title: "Lien",
            name: "link",
            type: "object",
            fields: [
              { title: "URL", name: "href", type: "url" },
              { title: "Nouvel onglet", name: "blank", type: "boolean", initialValue: false },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
    }),
  ],
})
