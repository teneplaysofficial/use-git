import { listAllBranches } from "./listAllBranches"

/**
 * Get the repository default branch.
 *
 * @since 1.0.0
 */
export async function getDefaultBranch(): Promise<string | undefined> {
  const res = await listAllBranches("json")

  return res.head?.split("/")[1]
}
