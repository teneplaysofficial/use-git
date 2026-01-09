import { diff } from "./diff"

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
  /**
   * Optional paths to limit the diff output.
   */
  paths?: readonly string[],
): Promise<string> {
  return diff(undefined, paths)
}
