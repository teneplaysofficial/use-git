import type { Api } from "../types/api"

/**
 * Get a short diff summary.
 *
 * @returns Short stat summary string
 *
 * @example
 * ```ts
 * const summary = await git.diffStatSummary()
 * // "3 files changed, 24 insertions(+), 6 deletions(-)"
 * ```
 *
 * @since 0.2.0
 */
export async function diffStatSummary(this: Api): Promise<string> {
  return this.diff(undefined, undefined, {
    flags: ["--shortstat"],
  })
}
