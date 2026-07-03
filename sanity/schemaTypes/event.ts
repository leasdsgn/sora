import { defineArrayMember, defineField, defineType } from "sanity"

export const event = defineType({
  name: "event",
  title: "Évènement",
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
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "En cours", value: "en-cours" },
          { title: "Prochainement", value: "prochainement" },
          { title: "Terminé", value: "termine" },
        ],
        layout: "radio",
      },
      initialValue: "prochainement",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventType",
      title: "Type d'évènement",
      type: "string",
      options: {
        list: [
          { title: "Webinaire", value: "webinar" },
          { title: "Masterclass", value: "masterclass" },
          { title: "Atelier", value: "workshop" },
          { title: "Live", value: "live" },
          { title: "Présentiel", value: "presentiel" },
          { title: "Autre", value: "other" },
        ],
      },
      initialValue: "webinar",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Exemple : Webinaire / Lybox x Sora / 50 min",
    }),
    defineField({
      name: "summary",
      title: "Résumé",
      type: "text",
      rows: 3,
      description: "Texte court visible sur les listes et utilisé en SEO par défaut.",
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
    }),
    defineField({
      name: "startsAt",
      title: "Date et heure de début",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endsAt",
      title: "Date et heure de fin",
      type: "datetime",
    }),
    defineField({
      name: "timezone",
      title: "Fuseau horaire",
      type: "string",
      initialValue: "Europe/Paris",
    }),
    defineField({
      name: "duration",
      title: "Durée affichée",
      type: "string",
      description: "Exemple : 50 min",
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "En ligne", value: "online" },
              { title: "Présentiel", value: "physical" },
              { title: "Hybride", value: "hybrid" },
            ],
          },
          initialValue: "online",
        }),
        defineField({ name: "platform", title: "Plateforme ou lieu", type: "string" }),
        defineField({ name: "url", title: "Lien de l'évènement", type: "url" }),
        defineField({ name: "address", title: "Adresse", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "registration",
      title: "Inscription",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "ctaLabel", title: "Label du CTA", type: "string", initialValue: "Réserver ma place" }),
        defineField({ name: "registrationUrl", title: "Lien d'inscription", type: "url" }),
        defineField({ name: "seatsLimit", title: "Nombre de places", type: "number", validation: (r) => r.integer().positive() }),
        defineField({ name: "replayEnabled", title: "Replay prévu", type: "boolean", initialValue: true }),
        defineField({ name: "finePrint", title: "Mention sous formulaire", type: "string" }),
      ],
    }),
    defineField({
      name: "speakers",
      title: "Intervenants",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", title: "Rôle", type: "string" }),
            defineField({ name: "bio", title: "Bio courte", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "Portrait",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "program",
      title: "Programme",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "time", title: "Repère temps", type: "string", description: "Exemple : 0:05" }),
            defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "time" },
          },
        }),
      ],
    }),
    defineField({ name: "body", title: "Contenu", type: "blockContent" }),
    defineField({
      name: "featured",
      title: "Mis en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "crm",
      title: "CRM & tagging",
      type: "object",
      options: { collapsible: true, collapsed: true },
      description: "Configure les tags qui seront appliqués aux inscrits dans Freshsales et ActiveCampaign.",
      fields: [
        {
          name: "source",
          title: "Source",
          type: "string",
          description: "Valeur écrite dans cf_source (Freshsales). Ex : lybox-event",
        },
        {
          name: "freshsalesTag",
          title: "Tag Freshsales",
          type: "string",
          description: "Ex : EVENT-LYBOX-INVITE-2026",
        },
        {
          name: "acTagId",
          title: "Tag ID ActiveCampaign",
          type: "string",
          description: "ID numérique du tag AC (visible dans l'URL du tag). Ex : 59",
        },
      ],
    }),
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
    { title: "Date (prochain → ancien)", name: "startsAtAsc", by: [{ field: "startsAt", direction: "asc" }] },
    { title: "Date (récent → ancien)", name: "startsAtDesc", by: [{ field: "startsAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", status: "status", date: "startsAt", media: "mainImage" },
    prepare({ title, status, date, media }) {
      const formattedDate = date ? new Date(date).toLocaleDateString("fr-FR") : null
      return {
        title,
        media,
        subtitle: [status, formattedDate].filter(Boolean).join(" / "),
      }
    },
  },
})
