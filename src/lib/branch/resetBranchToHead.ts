import { branch } from "./branch"

/**
 * Reset a branch to HEAD.
 *
 * @example
 * ```ts
 * await resetBranchToHead("feature/login")
 * ```
 *
 * @since 1.0.0
 */
export function resetBranchToHead(name: string): Promise<string> {
  return branch(name, {
    flags: ["--force"],
  })
}
