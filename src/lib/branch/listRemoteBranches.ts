import { listAllBranches } from "./listAllBranches"

/**
 * List remote branches.
 *
 * @example
 * ```ts
 * await listRemoteBranches()
 * ```
 *
 * @since 1.0.0
 */
export async function listRemoteBranches(): Promise<string[]> {
  const res = await listAllBranches("json")

  return res.remote
}
