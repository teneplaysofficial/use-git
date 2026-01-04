import type { Api } from "../types/api"
import type { DiffStats } from "./types/DiffStats"
import { parseNumStat } from "./utils"

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
  this: Api,
  /**
   * Base commit.
   */
  from: string,
  /**
   * Target commit.
   */
  to: string,
): Promise<DiffStats> {
  const res = await this.diff([from, to], undefined, {
    flags: ["--numstat"],
  })

  return parseNumStat(res)
}
