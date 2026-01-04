import type { Api } from "../types/api"

/**
 * Check whether the working tree contains untracked files.
 *
 * @summary
 * - This method detects files that are present in the working tree but are not yet tracked by Git.
 * - To get files use {@link getUntrackedFiles}.
 *
 *
 * @example
 * ```ts
 * if (await git.hasUntrackedFiles()) {
 *   console.log("There are untracked files in the working tree")
 * }
 * ```
 *
 * @since 0.2.0
 */
export async function hasUntrackedFiles(this: Api): Promise<boolean> {
  return (await this.getUntrackedFiles()).length > 0
}
