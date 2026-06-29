import { NextRequest, NextResponse } from "next/server"

const FS_DOMAIN = "sora-team.myfreshworks.com"
const FS_TOKEN = process.env.FRESHSALES_API_KEY!
const AC_URL = process.env.AC_API_URL!
const AC_KEY = process.env.AC_API_KEY!

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, phone, investExperience } = body

  if (!email || !firstName) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
  }

  const results: { freshsales?: string; activecampaign?: string } = {}

  // Freshsales: upsert contact + tag EVENT-LYBOX-INVITE-2026
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
              cf_source: "lybox-event",
            },
          },
          unique_identifier: { emails: email },
        }),
      }
    )

    if (fsRes.ok) {
      const fsData = await fsRes.json()
      const contactId = fsData.contact?.id

      // Add tag EVENT-LYBOX-INVITE-2026
      if (contactId) {
        await fetch(
          `https://${FS_DOMAIN}/crm/sales/api/contacts/${contactId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token token=${FS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact: { tags: ["EVENT-LYBOX-INVITE-2026"] },
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

  // ActiveCampaign: sync contact (for reminder sequences J-1, H-1)
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

      if (contactId) {
        // Find tag EVENT-LYBOX
        const tagsRes = await fetch(
          `${AC_URL}/api/3/tags?search=EVENT-LYBOX`,
          { headers: { "Api-Token": AC_KEY } }
        )
        const tagsData = await tagsRes.json()
        const tagId = tagsData.tags?.[0]?.id

        if (tagId) {
          await fetch(`${AC_URL}/api/3/contactTags`, {
            method: "POST",
            headers: {
              "Api-Token": AC_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contactTag: { contact: contactId, tag: tagId },
            }),
          })
        }
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
