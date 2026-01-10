import type { BranchOptions } from "../types"
import { branch } from "./branch"
import { branchExists } from "./branchExists"

/**
 * Create a new branch.
 *
 * @example
 * ```ts
 * await createBranch("feature/login")
 * ```
 *
 * @since 1.0.0
 */
export async function createBranch(
  name: string,
  opts: BranchOptions = {},
): Promise<string> {
  if (await branchExists(name)) {
    throw new Error(
      `Cannot create branch "${name}": branch already exists. Use a different name or delete the existing branch first.`,
    )
  }

  return branch(name, opts)
}
