import type { Api } from "../types/api"

/**
 * Check whether the index contains staged changes.
 *
 * @returns `true` if staged changes exist, otherwise `false`
 *
 * @example
 * ```ts
 * if (await git.hasStagedDiff()) {
 *   console.log("There are staged changes")
 * }
 * ```
 *
 * @see {@link hasDiff}
 * @see {@link getStagedFiles}
 *
 * @since 0.2.0
 */
export async function hasStagedDiff(this: Api): Promise<boolean> {
  try {
    await this.diff(undefined, undefined, {
      flags: ["--cached", "--quiet"],
    })
    return false
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return true
    }

    throw err
  }
}
