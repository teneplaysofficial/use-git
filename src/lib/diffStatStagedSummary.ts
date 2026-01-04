import type { Api } from "../types/api"

/**
 * Get a short diff summary for staged changes.
 *
 * @returns Short stat summary string
 *
 * @example
 * ```ts
 * const summary = await git.diffStatStagedSummary()
 * ```
 *
 * @since 0.2.0
 */
export async function diffStatStagedSummary(this: Api): Promise<string> {
  return this.diff(undefined, undefined, {
    flags: ["--shortstat", "--cached"],
  })
}
