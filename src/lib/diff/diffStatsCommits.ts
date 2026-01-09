import type { DiffStats } from "../types/DiffStats"
import { parseNumStat } from "../utils"
import { diff } from "./diff"

/**
 * Get diff statistics between two commits.
 *
 * @returns Aggregated diff statistics
 *
 * @example
 * ```ts
 * const stats = await git.diffStatsCommits("HEAD~1", "HEAD")
 * ```
 *
 * @see {@link diffStats}
 *
 * @since 0.2.0
 */
export async function diffStatsCommits(
  /**
   * Base commit.
   */
  from: string,
  /**
   * Target commit.
   */
  to: string,
): Promise<DiffStats> {
  const res = await diff([from, to], undefined, {
    flags: ["--numstat"],
  })

  return parseNumStat(res)
}
