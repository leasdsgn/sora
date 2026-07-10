import { NextRequest, NextResponse } from "next/server"

const FS_DOMAIN = "sora-team.myfreshworks.com"
const FS_TOKEN = process.env.FRESHSALES_API_KEY!
const AC_URL = process.env.AC_API_URL!
const AC_KEY = process.env.AC_API_KEY!

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, phone, source, acTagId, acListId, freshsalesTag } = body

  if (!email || !firstName) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
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
            lead_source_id: 202001095886,
            custom_field: {
              cf_nom_du_projet_en_cours: "SESEH SUNSET VILLA",
            },
          },
          unique_identifier: { emails: email },
        }),
      }
    )

    if (fsRes.ok) {
      const fsData = await fsRes.json()
      const contactId = fsData.contact?.id

      if (contactId && freshsalesTag) {
        await fetch(
          `https://${FS_DOMAIN}/crm/sales/api/contacts/${contactId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token token=${FS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact: { tags: [freshsalesTag] },
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

      if (contactId && acListId) {
        await fetch(`${AC_URL}/api/3/contactLists`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactList: { list: acListId, contact: contactId, status: 1 },
          }),
        })
      }

      if (contactId && acTagId) {
        await fetch(`${AC_URL}/api/3/contactTags`, {
          method: "POST",
          headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: acTagId },
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
