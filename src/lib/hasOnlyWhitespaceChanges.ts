import type { Api } from "../types/api"

/**
 * Check whether all working tree changes are whitespace-only.
 *
 * @returns `true` if all changes are whitespace-only
 *
 * @example
 * ```ts
 * if (await git.hasOnlyWhitespaceChanges()) {
 *   console.log("Only formatting changes detected")
 * }
 * ```
 *
 * @see {@link hasOnlyEOLChanges}
 *
 * @since 0.2.0
 */
export async function hasOnlyWhitespaceChanges(this: Api): Promise<boolean> {
  const hasChanges = await this.hasDiff()
  if (!hasChanges) return false

  try {
    await this.diff(undefined, undefined, {
      flags: ["--ignore-all-space", "--quiet"],
    })

    return true
  } catch (err) {
    if (err instanceof Error && "exitCode" in err && err.exitCode === 1) {
      return false
    }

    throw err
  }
}
