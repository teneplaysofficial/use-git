import { diff } from "./diff"

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
export function diffStatStagedSummary(): Promise<string> {
  return diff(undefined, undefined, {
    flags: ["--shortstat", "--cached"],
  })
}
