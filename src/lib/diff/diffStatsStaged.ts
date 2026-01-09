import type { DiffStats } from "../types"
import { parseNumStat } from "../utils"
import { diff } from "./diff"

/**
 * Get diff statistics for staged changes.
 *
 * @returns Aggregated diff statistics
 *
 * @example
 * ```ts
 * const stats = await git.diffStatsStaged()
 * ```
 *
 * @see {@link diffStats}
 *
 * @since 0.2.0
 */
export async function diffStatsStaged(): Promise<DiffStats> {
  const res = await diff(undefined, undefined, {
    flags: ["--cached", "--numstat"],
  })

  return parseNumStat(res)
}
