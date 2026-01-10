import utils from "../../internal"
import type { BranchOptions } from "../types"

/**
 * List, create, rename, copy, or delete branches.
 *
 * @example
 * ```ts
 * // List local branches
 * await git.branch()
 *
 * // List all branches
 * await git.branch({ flags: ["--all"] })
 *
 * // Create a new branch
 * await git.branch("feature/login")
 *
 * // Delete a branch
 * await git.branch("feature/login", { flags: ["--delete"] })
 *
 * // Rename a branch
 * await git.branch(["old-name", "new-name"], { flags: ["--move"] })
 * ```
 *
 * @since 1.0.0
 */
export function branch(): Promise<string>
export function branch(opts: BranchOptions): Promise<string>
export function branch(name: string, opts?: BranchOptions): Promise<string>
export function branch(
  names: [string, string],
  opts?: BranchOptions,
): Promise<string>

export function branch(
  arg1?: string | [string, string] | BranchOptions,
  arg2: BranchOptions = {},
): Promise<string> {
  const names =
    typeof arg1 === "string" || Array.isArray(arg1) ? arg1 : undefined

  const opts =
    arg1 && typeof arg1 === "object" && !Array.isArray(arg1) ? arg1 : arg2

  return utils.runCmd("branch", [
    ...utils.buildArgs(opts),
    ...(names ? (Array.isArray(names) ? names : [names]) : []),
  ])
}
