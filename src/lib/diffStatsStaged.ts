import type { Api } from "../types/api"
import type { DiffStats } from "./types/DiffStats"
import { parseNumStat } from "./utils"

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
export async function diffStatsStaged(this: Api): Promise<DiffStats> {
  const res = await this.diff(undefined, undefined, {
    flags: ["--cached", "--numstat"],
  })

  return parseNumStat(res)
}
