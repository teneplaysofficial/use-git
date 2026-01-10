import { listAllBranches } from "./listAllBranches"

/**
 * Get the repository default branch.
 *
 * @since 1.0.0
 */
export async function getDefaultBranch(): Promise<string | undefined> {
  const res = await listAllBranches("json")
  if (!res.head) return undefined

  const parts = res.head.split("/")

  return parts.length > 1 ? parts.slice(1).join("/") : undefined
}
