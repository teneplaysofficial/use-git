import { listAllBranches } from "./listAllBranches"

/**
 * List local branches.
 *
 * @example
 * ```ts
 * await listBranches()
 * // [ 'main' ]
 * ```
 *
 * @since 1.0.0
 */
export async function listBranches(): Promise<string[]> {
  const res = await listAllBranches("json")

  return res.local
}
