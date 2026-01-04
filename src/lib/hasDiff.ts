import type { Api } from "../types/api"

/**
 * Check whether the working tree contains unstaged changes.
 *
 * @returns `true` if unstaged changes exist, otherwise `false`
 *
 * @example
 * ```ts
 * if (await git.hasDiff()) {
 *   console.log("Working tree has changes")
 * }
 * ```
 *
 * @see {@link diffWorkingTree}
 * @see {@link hasStagedDiff}
 *
 * @since 0.2.0
 */
export async function hasDiff(this: Api): Promise<boolean> {
  try {
    await this.diff(undefined, undefined, {
      flags: ["--quiet"],
    })
    return false
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return true
    }

    throw err
  }
}
