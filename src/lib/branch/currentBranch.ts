import { branch } from "./branch"

/**
 * Get the current branch name.
 *
 * @example
 * ```ts
 * await currentBranch()
 * // main
 * ```
 *
 * @since 1.0.0
 */
export function currentBranch(): Promise<string> {
  return branch({
    flags: ["--show-current"],
  })
}
