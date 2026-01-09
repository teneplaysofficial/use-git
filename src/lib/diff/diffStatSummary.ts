import { diff } from "./diff"

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
export function diffStatSummary(): Promise<string> {
  return diff(undefined, undefined, {
    flags: ["--shortstat"],
  })
}
