import type { Api } from "../types/api"

/**
 * Show changes in the working tree compared to the index.
 *
 * @example
 * ```ts
 * await git.diffWorkingTree()
 * await git.diffWorkingTree(["src"])
 * ```
 *
 * @see {@link diff}
 * @see {@link hasDiff}
 *
 * @since 0.2.0
 */
export function diffWorkingTree(
  this: Api,
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return this.diff(undefined, paths)
}
