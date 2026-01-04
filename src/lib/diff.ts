import utils from "../internal"
import type { Api } from "../types/api"
import type { DiffOptions } from "./types/DiffOptions"

/**
 * Show changes between commits, commit and working tree, etc.
 *
 * @example
 * ```ts
 * await git.diff()
 * await git.diff({ flags: ["--stat"] })
 * await git.diff(["HEAD~1", "HEAD"])
 * await git.diff(undefined, ["src"])
 * ```
 *
 * @see {@link diffWorkingTree}
 * @see {@link diffStaged}
 * @see {@link diffCommits}
 *
 * @since 0.2.0
 */
export function diff(
  this: Api,
  /**
   * Optional commit refs or ranges.
   *
   * @example
   * - "HEAD"
   * - "HEAD~1"
   * - "main..dev"
   */
  refs?: readonly string[],
  /**
   * Optional file or directory paths to limit the diff scope.
   */
  paths?: readonly string[],
  /**
   * Diff options and flags.
   */
  opts: DiffOptions = {},
): Promise<string> {
  return utils.runCmd("diff", [
    ...utils.buildArgs(opts),
    ...(refs ?? []),
    ...(paths ? ["--", ...paths] : []),
  ])
}
