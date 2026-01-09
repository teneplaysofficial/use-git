import { listBranches } from "./listBranches"

/**
 * Check if a local branch exists.
 *
 * @example
 * ```ts
 * await branchExists("main")
 * ```
 *
 * @since 1.0.0
 */
export async function branchExists(name: string): Promise<boolean> {
  const res = await listBranches()

  return res.includes(name)
}
