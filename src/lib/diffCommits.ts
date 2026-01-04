import type { Api } from "../types/api"

/**
 * Show changes between two commits.
 *
 * @example
 * ```ts
 * await git.diffCommits("HEAD~1", "HEAD")
 * await git.diffCommits("main", "dev", ["src"])
 * ```
 *
 * @see {@link diffRange}
 *
 * @since 0.2.0
 */
export function diffCommits(
  this: Api,
  /**
   * Base commit.
   */
  from: string,
  /**
   * Target commit.
   */
  to: string,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff([from, to], paths)
}
