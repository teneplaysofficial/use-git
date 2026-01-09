import { diff } from "./diff"

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
  /**
   * Commit range in `A...B` format.
   */
  range: `${string}...${string}`,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return diff([range], paths)
}
