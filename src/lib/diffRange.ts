import type { Api } from "../types/api"

/**
 * Show changes for a commit range.
 *
 * @example
 * ```ts
 * await git.diffRange("main...dev")
 * await git.diffRange("v1.0.0...v1.1.0", ["src"])
 * ```
 *
 * @see {@link diffCommits}
 *
 * @since 0.2.0
 */
export function diffRange(
  this: Api,
  /**
   * Commit range in `A...B` format.
   */
  range: `${string}...${string}`,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff([range], paths)
}
