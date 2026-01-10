import { branch } from "./branch"

/**
 * Set upstream for a branch.
 *
 * @example
 * ```ts
 * await setBranchUpstream("feature/login", "origin/feature/login")
 * ```
 *
 * @since 1.0.0
 */
export function setBranchUpstream(
  branchName: string,
  upstream: string,
): Promise<string> {
  return branch(branchName, {
    "--set-upstream-to": upstream,
  })
}
