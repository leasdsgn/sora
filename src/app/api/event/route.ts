import { NextRequest, NextResponse } from "next/server"
import { client } from "../../../../sanity/lib/client"

const FS_DOMAIN = "sora-team.myfreshworks.com"
const FS_TOKEN = process.env.FRESHSALES_API_KEY!
const AC_URL = process.env.AC_API_URL!
const AC_KEY = process.env.AC_API_KEY!

type EventCrm = {
  source?: string
  freshsalesTag?: string
  acTagId?: string
  acListId?: string
}

async function getEventCrm(eventSlug?: string): Promise<EventCrm> {
  if (!eventSlug) return {}
  try {
    const result = await client.fetch<EventCrm | null>(
      `*[_type == "event" && slug.current == $slug][0]{ "source": crm.source, "freshsalesTag": crm.freshsalesTag, "acTagId": crm.acTagId, "acListId": crm.acListId }`,
      { slug: eventSlug },
    )
    return result || {}
  } catch {
    return {}
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    firstName,
    lastName,
    email,
    phone,
    investExperience,
    eventSlug,
    crmSource,
    freshsalesTag: freshsalesTagFromClient,
    acTagId: acTagIdFromClient,
  } = body

  if (!email || !firstName) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
  }

  const needsLookup = !crmSource && !freshsalesTagFromClient && !acTagIdFromClient
  const crmFallback = needsLookup ? await getEventCrm(eventSlug) : {}
  const crm: EventCrm = {
    source: crmSource || crmFallback.source,
    freshsalesTag: freshsalesTagFromClient || crmFallback.freshsalesTag,
    acTagId: acTagIdFromClient || crmFallback.acTagId,
  }
  const results: { freshsales?: string; activecampaign?: string } = {}

  try {
    const fsRes = await fetch(
      `https://${FS_DOMAIN}/crm/sales/api/contacts/upsert`,
      {
        method: "POST",
        headers: {
          Authorization: `Token token=${FS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            first_name: firstName,
            last_name: lastName || "",
            email,
            mobile_number: phone || "",
            custom_field: {
              cf_invest_experience: investExperience || "",
              cf_source: crm.source || eventSlug || "",
            },
          },
          unique_identifier: { emails: email },
        }),
      }
    )

    if (fsRes.ok) {
      const fsData = await fsRes.json()
      const contactId = fsData.contact?.id

      if (contactId && crm.freshsalesTag) {
        await fetch(
          `https://${FS_DOMAIN}/crm/sales/api/contacts/${contactId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token token=${FS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact: { tags: [crm.freshsalesTag] },
            }),
          }
        )
      }
      results.freshsales = "ok"
    } else {
      results.freshsales = "error"
    }
  } catch {
    results.freshsales = "error"
  }

  try {
    const acRes = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: "POST",
      headers: {
        "Api-Token": AC_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName: lastName || "",
          phone: phone || "",
        },
      }),
    })

    if (acRes.ok) {
      const acData = await acRes.json()
      const contactId = acData.contact?.id

      if (contactId && crm.acListId) {
        await fetch(`${AC_URL}/api/3/contactLists`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactList: { list: crm.acListId, contact: contactId, status: 1 },
          }),
        })
      }

      if (contactId && crm.acTagId) {
        await fetch(`${AC_URL}/api/3/contactTags`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: crm.acTagId },
          }),
        })
      }
      results.activecampaign = "ok"
    } else {
      results.activecampaign = "error"
    }
  } catch {
    results.activecampaign = "error"
  }

  return NextResponse.json({ success: true, results })
}
