import { client } from "./client"
import type { QueryParams } from "next-sanity"

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    })
  } catch {
    return [] as unknown as T
  }
}
